import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'

interface InfiniteWrapperProps {
  isLoading: boolean
  isFetchingNextPage: boolean
  ref: (node?: Element | null) => void
  children: React.ReactNode
  inView: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
}

const InfiniteWrapper = ({
  ref,
  isLoading,
  isFetchingNextPage,
  children,
  inView,
  hasNextPage,
  fetchNextPage,
}: InfiniteWrapperProps) => {
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView, hasNextPage])

  return (
    <>
      {isLoading ? (
        <Loader2 className="h-20 w-20 mx-auto mt-6 animate-spin text-purple-1" />
      ) : (
        <>
          {children}
          <div ref={ref}>
            {isFetchingNextPage && (
              <Loader2 className="h-20 w-20 mx-auto mt-6 animate-spin text-purple-1" />
            )}
          </div>
        </>
      )}
    </>
  )
}

export default InfiniteWrapper
