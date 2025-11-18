import { DatePicker } from '@/components/DatePicker'
import Input from '@/components/Input'
import { Select } from '@/components/Select'
import { Form } from '@/components/ui/form'
import { filtersSchema } from '@/schemas/filtersSchema'
import type { FiltersFormValues } from '@/types/films'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
const Filters = () => {
  const form = useForm<FiltersFormValues>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      s: '',
      y: undefined,
      type: undefined,
    },
  })
  const onSubmit = (data: FiltersFormValues) => {
    console.log(data)
  }

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
        <div className="flex  w-full md:flex-row flex-col gap-4">
          <Controller
            control={form.control}
            name="y"
            render={({ field }) => (
              <DatePicker className="w-full md:w-1/2" {...field} label="Year" />
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
                  { label: 'Movie', value: 'movie' },
                  { label: 'Series', value: 'series' },
                  { label: 'Episode', value: 'episode' },
                ]}
              />
            )}
          />
        </div>
      </form>
    </Form>
  )
}

export default Filters
