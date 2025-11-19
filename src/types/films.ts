import type { filtersSchema } from '@/schemas/filtersSchema'
import type z from 'zod'

export type FilmType = 'movie' | 'series' | 'episode'
export type ResponseType = 'True' | 'False'

export interface Film {
  Title: string
  Year: string
  imdbID: string
  Type: FilmType
  Poster: string
}

export interface FilmsResponse {
  Search: Film[]
  totalResults: string
  Response: ResponseType
}

export type FiltersFormValues = z.infer<typeof filtersSchema>

export type FilmDetailsResponse = Record<
  | 'Title'
  | 'Year'
  | 'Rated'
  | 'Released'
  | 'Runtime'
  | 'Genre'
  | 'Director'
  | 'Writer'
  | 'Actors'
  | 'Plot'
  | 'Language'
  | 'Country'
  | 'Awards'
  | 'Poster'
  | 'Ratings'
  | 'Metascore'
  | 'imdbRating'
  | 'imdbVotes'
  | 'imdbID'
  | 'Type'
  | 'DVD'
  | 'BoxOffice'
  | 'Production'
  | 'Website'
  | 'Response',
  string
> & {
  Ratings?: Rating[]
}

export type Rating = Record<'Source' | 'Value', string>
