import type { Film } from '@/types/films'
import { Calendar, Film as FilmIcon, Tv } from 'lucide-react'
import { Link } from 'react-router'
interface FilmCardProps {
  film: Film
}

const FilmCard = ({
  film: { Title, Year, Type, Poster, imdbID },
}: FilmCardProps) => {
  return (
    <Link to={`/film/${imdbID}`}>
      <div className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
          {Poster ? (
            <img
              src={Poster}
              alt={Title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FilmIcon className="size-16 text-muted-foreground/40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="p-4">
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {Title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              <span>{Year}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Tv className="size-4" />
              <span className="capitalize">{Type}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default FilmCard
