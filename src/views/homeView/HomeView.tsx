import FilmCard from '@/components/FilmCard'
import InfiniteWrapper from '@/components/InfiniteWrapper'
import { QueryKeys } from '@/config/queryKeys'
import { filtersSchema } from '@/schemas/filtersSchema'
import { MoviesService } from '@/services/movies.service'
import type { FiltersFormValues } from '@/types/films'
import { zodResolver } from '@hookform/resolvers/zod'
import { useInfiniteQuery } from '@tanstack/react-query'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useInView } from 'react-intersection-observer'
import Filters from './components/filters/Filters'
const HomeView = () => {
  const { ref, inView } = useInView()

  const form = useForm<FiltersFormValues>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      s: '',
      y: undefined,
      type: 'all',
    },
  })

  const { s, y, type } = form.watch()

  const moviesQuery = useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) =>
      await MoviesService.getMovies({
        page: pageParam,
        s,
        y: y ? y : undefined,
        type: type === 'all' ? undefined : type,
      }),
    retryDelay: 6e4,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalResults = Number(lastPage.totalResults)
      const resultsPerPage = lastPage.Search.length
      const fetchedResults = allPages.length * resultsPerPage
      if (fetchedResults < totalResults) {
        return allPages.length + 1
      }
      return undefined
    },
    enabled: false,
    queryKey: [QueryKeys.MOVIES],
    retry: false,
  })

  const films = useMemo(() => {
    return moviesQuery.data?.pages.flatMap(({ Search }) => Search) ?? []
  }, [moviesQuery.data?.pages])

  return (
    <>
      <Filters form={form} moviesQuery={moviesQuery} />
      <InfiniteWrapper
        inView={inView}
        hasNextPage={moviesQuery.hasNextPage}
        fetchNextPage={moviesQuery.fetchNextPage}
        ref={ref}
        isLoading={moviesQuery.isLoading}
        isFetchingNextPage={moviesQuery.isFetchingNextPage}
      >
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {films?.map((film, index) => (
            <FilmCard key={index} film={film} />
          ))}
        </section>
      </InfiniteWrapper>
    </>
  )
}

export default HomeView
