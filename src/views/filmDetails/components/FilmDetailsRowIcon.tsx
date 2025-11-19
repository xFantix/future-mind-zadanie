interface FilmDetailsRowIconProps {
  label: string
  value: string | undefined
  icon: React.ReactNode
}

const FilmDetailsRowIcon = ({
  label,
  value,
  icon,
}: FilmDetailsRowIconProps) => {
  return (
    <div key={label} className="flex items-start gap-3">
      {icon}
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-base font-semibold text-card-foreground">{value}</p>
      </div>
    </div>
  )
}

export default FilmDetailsRowIcon
