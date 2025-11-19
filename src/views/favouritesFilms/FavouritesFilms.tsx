import FilmCard from '@/components/FilmCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import useFavoritesStore from '@/store/useFavouriteStore'
import { Star, StarOff } from 'lucide-react'
import { Link } from 'react-router'

const pluralizeFilmLabel = (count: number) => (count === 1 ? 'movie' : 'movies')

const FavouritesFilms = () => {
  const favorites = useFavoritesStore(state => state.favorites)
  const favoritesCount = favorites.length
  const hasFavorites = favoritesCount > 0

  return (
    <section
      aria-labelledby="favourites-movies-heading"
      aria-describedby="favourites-movies-description"
      className="mx-auto w-full max-w-7xl space-y-6"
    >
      <header className="space-y-4 rounded-xl border border-border bg-card/50 p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <Star aria-hidden="true" className="size-6 text-primary" />
          <h1
            id="favourites-movies-heading"
            className="text-2xl font-semibold text-card-foreground"
          >
            Your favourite movies
          </h1>
        </div>
        <p
          id="favourites-movies-description"
          className="text-base text-muted-foreground"
        >
          This list keeps every title marked as favourite. Each card highlights
          the title, production year and type. Navigate with Tab, then use the
          star button to remove the movie from your collection.
        </p>
        <p
          role="status"
          aria-live="polite"
          className="text-sm font-medium text-muted-foreground"
        >
          {hasFavorites
            ? `The list currently contains ${favoritesCount} ${pluralizeFilmLabel(favoritesCount)}.`
            : 'There are no saved items yet.'}
        </p>
      </header>

      {hasFavorites ? (
        <ScrollArea
          aria-labelledby="favourites-movies-heading"
          aria-describedby="favourites-movies-description"
          className="rounded-xl border border-border bg-background/40 p-4"
        >
          <ul
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            aria-label="Favourite movies list"
          >
            {favorites.map(film => (
              <li key={film.imdbID} className="list-none">
                <FilmCard film={film} />
              </li>
            ))}
          </ul>
        </ScrollArea>
      ) : (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-muted/30 p-10 text-center"
        >
          <StarOff
            aria-hidden="true"
            className="size-10 text-muted-foreground"
          />
          <div className="space-y-2">
            <p className="text-lg font-semibold text-card-foreground">
              No favourite movies yet
            </p>
            <p className="text-sm text-muted-foreground">
              Head back to the search view and use the star button to mark a
              movie as favourite. Everything is stored locally and remains
              available after restarting the app.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Open movie search
          </Link>
        </div>
      )}
    </section>
  )
}

export default FavouritesFilms
