export function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex h-7 w-fit items-center justify-center whitespace-nowrap rounded-full px-3 text-xs font-medium"
      style={{
        backgroundColor: `${color}20`,
        color,
      }}
    >
      {label}
    </span>
  )
}