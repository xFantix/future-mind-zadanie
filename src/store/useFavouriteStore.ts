// useFavoritesStore.ts
import type { Film } from '@/types/films'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface FavoritesState {
  favorites: Film[]
  addFavorite: (film: Film) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (film: Film) =>
        set({ favorites: [...get().favorites, film] }),

      removeFavorite: (id: string) =>
        set({ favorites: get().favorites.filter(f => f.imdbID !== id) }),

      isFavorite: (id: string) => get().favorites.some(f => f.imdbID === id),
    }),
    {
      name: 'favourites-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useFavoritesStore
