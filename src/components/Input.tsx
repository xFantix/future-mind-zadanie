import { Input as InputPrimitive } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type InputProps = React.ComponentProps<typeof InputPrimitive> & {
  label: string
  className?: string
}

const Input = ({ className, ...props }: InputProps) => {
  return (
    <div className={cn('flex flex-col gap-3 w-full', className)}>
      <Label htmlFor={props.id}>{props.label}</Label>
      <InputPrimitive className={'w-full'} {...props} />
    </div>
  )
}

export default Input
