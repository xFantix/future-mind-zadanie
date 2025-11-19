import LoadingWrapper from '@/components/LoadingWrapper'
import { QueryKeys } from '@/config/queryKeys'
import { MoviesService } from '@/services/movies.service'
import type { Rating } from '@/types/films'
import { useQuery } from '@tanstack/react-query'
import {
  Award,
  CalendarDays,
  Clock3,
  Film as FilmIcon,
  Globe2,
  Star,
  Users,
} from 'lucide-react'
import { useMemo } from 'react'
import { useParams } from 'react-router'
import FilmDetailsRow from './components/FilmDetailsRow'
import FilmDetailsRowIcon from './components/FilmDetailsRowIcon'

const FilmDetails = () => {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.FILM_DETAILS, id],
    queryFn: () => MoviesService.getMovieDetails({ i: id }),
    enabled: Boolean(id),
    retry: false,
  })

  const ratings = useMemo(() => {
    if (!data) return []
    return Array.isArray(data.Ratings) ? (data.Ratings as Rating[]) : []
  }, [data])

  const infoItems = [
    {
      label: 'Release year',
      value: data?.Year,
      Icon: CalendarDays,
    },
    {
      label: 'Runtime',
      value: data?.Runtime,
      Icon: Clock3,
    },
    {
      label: 'Genre',
      value: data?.Genre,
      Icon: FilmIcon,
    },
    {
      label: 'Country',
      value: data?.Country,
      Icon: Globe2,
    },
    {
      label: 'Language',
      value: data?.Language,
      Icon: Globe2,
    },
    {
      label: 'IMDb rating',
      value: data?.imdbRating ? `${data?.imdbRating}/10` : data?.imdbRating,
      Icon: Star,
    },
  ]

  return (
    <LoadingWrapper isLoading={isLoading}>
      <article
        aria-labelledby="film-title"
        className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row"
      >
        <section className="w-full max-w-[420px] self-start">
          <div className="relative overflow-hidden rounded-xl border bg-muted">
            {data?.Poster ? (
              <img
                src={data?.Poster}
                alt={`Plakat filmu ${data?.Title}`}
                className="block w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center bg-muted-foreground/10">
                <FilmIcon
                  className="size-16 text-muted-foreground/40"
                  aria-hidden="true"
                />
                <span className="sr-only">No poster for this movie</span>
              </div>
            )}
          </div>
          {data?.Awards && (
            <p className="mt-4 flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm text-primary">
              <Award className="size-4" aria-hidden="true" />
              {data?.Awards}
            </p>
          )}
        </section>

        <section className="flex-1 space-y-8">
          <header>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              Movie details
            </p>
            <h1
              id="film-title"
              className="mt-2 text-3xl font-bold text-card-foreground"
            >
              {data?.Title}
            </h1>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              {data?.Plot}
            </p>
          </header>

          {infoItems.length > 0 && (
            <section
              aria-label="Podstawowe informacje o filmie"
              className="rounded-xl border bg-card shadow-sm"
            >
              <div className="grid gap-4 p-6 sm:grid-cols-2">
                {infoItems.map(({ label, value, Icon }) => (
                  <FilmDetailsRowIcon
                    key={label}
                    label={label}
                    value={value}
                    icon={
                      <Icon
                        className="size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                    }
                  />
                ))}
              </div>
            </section>
          )}

          <section
            aria-label="Twórcy i obsada"
            className="rounded-xl border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
              <Users
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
              Crew
            </div>
            <dl className="mt-4 space-y-4">
              {data?.Director && (
                <FilmDetailsRow label="Directed by" value={data.Director} />
              )}
              {data?.Writer && (
                <FilmDetailsRow label="Screenplay" value={data.Writer} />
              )}
              {data?.Actors && (
                <FilmDetailsRow label="Cast" value={data.Actors} />
              )}
            </dl>
          </section>

          {ratings.length > 0 && (
            <section
              aria-label="Oceny krytyków"
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
                <Star
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                Ratings
              </div>
              <ul className="mt-4 flex flex-wrap gap-3">
                {ratings.map(rating => (
                  <li
                    key={`${rating.Source}-${rating.Value}`}
                    className="rounded-full border border-border px-4 py-2 text-sm text-card-foreground"
                    aria-label={`${rating.Source} ocenia na ${rating.Value}`}
                  >
                    <span className="font-semibold">{rating.Value}</span>
                    <span className="ml-2 text-muted-foreground">
                      {rating.Source}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {data?.BoxOffice && (
            <section
              className="rounded-xl border bg-card p-6 shadow-sm"
              aria-label="Additional info"
            >
              <div className="space-y-3">
                {data?.BoxOffice && (
                  <FilmDetailsRow label="Box office" value={data.BoxOffice} />
                )}
              </div>
            </section>
          )}
        </section>
      </article>
    </LoadingWrapper>
  )
}

export default FilmDetails
