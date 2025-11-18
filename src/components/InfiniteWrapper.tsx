import { Loader2 } from 'lucide-react'

interface InfiniteWrapperProps {
  isLoading: boolean
  isFetchingNextPage: boolean
  ref: (node?: Element | null) => void
  children: React.ReactNode
}

const InfiniteWrapper = ({
  ref,
  isLoading,
  isFetchingNextPage,
  children,
}: InfiniteWrapperProps) => {
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
