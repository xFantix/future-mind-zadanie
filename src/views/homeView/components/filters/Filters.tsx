import { Combobox } from '@/components/Combobox'
import Input from '@/components/Input'
import { Select } from '@/components/Select'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { QueryKeys } from '@/config/queryKeys'
import type { FilmsResponse, FiltersFormValues } from '@/types/films'
import {
  useQueryClient,
  type InfiniteData,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query'
import { useMemo } from 'react'
import { Controller, useWatch, type UseFormReturn } from 'react-hook-form'

interface FiltersProps {
  form: UseFormReturn<FiltersFormValues>
  moviesQuery: UseInfiniteQueryResult<
    InfiniteData<FilmsResponse, unknown>,
    Error
  >
}

const Filters = ({ form, moviesQuery }: FiltersProps) => {
  const queryClient = useQueryClient()
  const moviesData = queryClient.getQueryData<
    InfiniteData<FilmsResponse, unknown>
  >([QueryKeys.MOVIES])

  const [s, y, type] = useWatch({
    control: form.control,
    name: ['s', 'y', 'type'],
  })

  const onSubmit = () => {
    moviesQuery.refetch()
  }

  const handleReset = () => {
    form.reset()
    queryClient.resetQueries({ queryKey: [QueryKeys.MOVIES] })
  }

  const enableReset = useMemo(() => {
    return (
      s !== '' || y !== undefined || type !== 'all' || moviesData !== undefined
    )
  }, [s, y, type, moviesData])

  const enableSubmit = useMemo(() => {
    return s !== ''
  }, [s])

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 pb-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Controller
          control={form.control}
          name="s"
          render={({ field }) => <Input {...field} label="Search" />}
        />
        <div className="flex items-end w-full md:flex-row flex-col gap-4">
          <Controller
            control={form.control}
            name="y"
            render={({ field }) => (
              <Combobox
                value={field.value}
                setValue={field.onChange}
                label="Year"
                placeholder="Select year"
                className="w-full md:w-1/2"
                options={[...Array(100).keys()].map(year => ({
                  label: (new Date().getFullYear() - year).toString(),
                  value: (new Date().getFullYear() - year).toString(),
                }))}
              />
            )}
          />
          <Controller
            control={form.control}
            name="type"
            render={({ field }) => (
              <Select
                {...field}
                id="type"
                label="Type"
                className="w-full md:w-1/2"
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'Movie', value: 'movie' },
                  { label: 'Series', value: 'series' },
                  { label: 'Episode', value: 'episode' },
                ]}
              />
            )}
          />
          <Button disabled={!enableSubmit} type="submit">
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={!enableReset}
          >
            Clear
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default Filters
