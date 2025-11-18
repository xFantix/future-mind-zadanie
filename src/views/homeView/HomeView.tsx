import FilmCard from '@/components/FilmCard'
import InfiniteWrapper from '@/components/InfiniteWrapper'
import { QueryKeys } from '@/config/queryKeys'
import { MoviesService } from '@/services/movies.service'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import Filters from './components/filters/Filters'
const HomeView = () => {
  const { ref, inView } = useInView()
  const moviesQuery = useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) =>
      await MoviesService.getMovies({ page: pageParam, s: 'batman' }),
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
    queryKey: [QueryKeys.MOVIES],
  })

  const films = useMemo(() => {
    return moviesQuery.data?.pages.flatMap(({ Search }) => Search) ?? []
  }, [moviesQuery.data?.pages])

  return (
    <>
      <Filters />
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
