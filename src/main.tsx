import routes from '@routes/routes'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={routes} />
)
