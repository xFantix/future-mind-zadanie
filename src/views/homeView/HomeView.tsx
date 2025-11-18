import { QueryKeys } from '@/config/queryKeys'
import { MoviesService } from '@/services/movies.service'
import { useQuery } from '@tanstack/react-query'

const HomeView = () => {
  const { data: movies } = useQuery({
    queryKey: [QueryKeys.MOVIES],
    queryFn: async () =>
      await MoviesService.getMovies({ page: 1, s: 'batman' }),
  })

  return (
    <section>
      {movies?.Search?.map(el => (
        <div key={el.imdbID}>{el.Title}</div>
      ))}
    </section>
  )
}

export default HomeView
