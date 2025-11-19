import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import type { ReactNode } from 'react'

interface LoadingWrapperProps {
  className?: string
  isLoading: boolean
  children: ReactNode
}

const LoadingWrapper = ({
  className,
  isLoading,
  children,
}: LoadingWrapperProps) => {
  return (
    <>
      {isLoading ? (
        <Loader2
          role="status"
          aria-label="Content is loading"
          className={cn(
            'h-20 w-20 animate-spin text-purple-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            className
          )}
        />
      ) : (
        children
      )}
    </>
  )
}

export default LoadingWrapper
