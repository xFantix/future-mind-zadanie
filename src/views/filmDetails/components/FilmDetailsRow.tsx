interface FilmDetailsRowProps {
  label: string
  value: string
}
const FilmDetailsRow = ({ label, value }: FilmDetailsRowProps) => {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-base font-medium text-card-foreground">{value}</p>
    </div>
  )
}

export default FilmDetailsRow
