import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../main.css'

const queryClient = new QueryClient()

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ProvidersWrapper
