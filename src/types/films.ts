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
