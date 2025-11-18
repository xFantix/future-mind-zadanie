import routes from '@routes/routes'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import ProvidersWrapper from './utils/ProvidersWrapper'

createRoot(document.getElementById('root')!).render(
  <ProvidersWrapper>
    <RouterProvider router={routes} />
  </ProvidersWrapper>
)
