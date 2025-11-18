import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../main.css'

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ProvidersWrapper
