import { StarIcon } from 'lucide-react'
import { Link } from 'react-router'
const MainLayoutHeader = () => {
  return (
    <header className="w-full bg-card border-b border-border shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            Future Mind Films
          </h1>
        </Link>
        <Link to="/favourites">
          <StarIcon size={24} color="red" />
        </Link>
      </div>
    </header>
  )
}

export default MainLayoutHeader
