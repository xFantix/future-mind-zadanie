import { Label } from '@/components/ui/label'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  Select as SelectPrimitive,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface SelectProps {
  label: string
  options: { label: string; value: string }[]
  id: string
  className?: string
}

export function Select({ label, options, id, className }: SelectProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Label htmlFor={id}>{label}</Label>
      <SelectPrimitive>
        <SelectTrigger className={cn('w-[180px]', className)}>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectPrimitive>
    </div>
  )
}
