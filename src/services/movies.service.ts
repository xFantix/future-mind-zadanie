import { get } from '@/config/api'
import { endpoints } from '@/config/endpoints'
import type { FilmsResponse } from '@/types/films'
import type { SearchParamsOption } from 'ky'
export const MoviesService = {
  getMovies: (searchParams: SearchParamsOption) =>
    get(endpoints.films, { searchParams }).json<FilmsResponse>(),
}
