# Future Mind – zadanie rekrutacyjne

Aplikacja webowa pozwalająca wyszukiwać filmy w bazie OMDb, sprawdzać szczegóły oraz zapisywać ulubione pozycje po stronie klienta.

## Konfiguracja środowiska

1. Sklonuj repozytorium i przejdź do katalogu projektu:
   ```bash
   git clone <repo-url>
   cd future-mind-zadanie
   ```
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Utwórz plik `.env` w katalogu głównym i dodaj klucz do API OMDb:
   ```bash
   VITE_OMDB_API_KEY=<twój_klucz_omdb>
   ```

## Uruchomienie aplikacji

- tryb developerski z HMR: `npm run dev` (domyślnie http://localhost:5173)
- build produkcyjny: `npm run build`
- podgląd builda: `npm run preview`

## Testy i jakość kodu

- testy jednostkowe i komponentowe (Vitest + Testing Library): `npm run test`
- testy z pokryciem: `npm run test:coverage`
- lintowanie kodu: `npm run lint`
- formatowanie Prettierem: `npm run format`

## Technologie i biblioteki

- React 19 z TypeScriptem oraz Vite 7 (React Compiler, HMR)
- React Router 7 do zarządzania trasami i widokami
- TanStack Query do pracy z danymi asynchronicznymi i cache
- Zustand do zarządzania stanem ulubionych filmów
- React Hook Form + Zod do walidacji filtrów wyszukiwania
- Tailwind CSS 4 + shadcn/ui + Radix UI do warstwy UI
- Ky jako klient HTTP oraz Sonner do obsługi powiadomień
- Vitest, Testing Library, Jest DOM do testów i asercji

## Struktura projektu (skrót)

- `src/views` – widoki główne (lista filmów, szczegóły, ulubione)
- `src/components` – komponenty współdzielone (formularze, listy, wrappery)
- `src/services` – warstwa komunikacji z API OMDb
- `src/store` – magazyn stanu (Zustand)
- `src/schemas` – definicje schematów walidacyjnych Zod
- `src/config` – konfiguracja klienta HTTP i endpointów

## Przydatne informacje

- Logika komunikacji z API bazuje na `import.meta.env.VITE_OMDB_API_KEY`, dlatego bez poprawnie ustawionego klucza wyszukiwanie nie zwróci wyników.
- Ulubione filmy przechowywane są lokalnie w Zustand/Local Storage, dzięki czemu działają offline.
- W katalogu `src/views/**/__tests__` znajdują się testy komponentów widoków, a `src/components/__tests__` obejmuje testy mniejszych elementów UI.
