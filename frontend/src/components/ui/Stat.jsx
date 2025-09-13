export default function Stat({ label, value, hint, className = '' }) {
  return (
    <div className={`glass rounded-2xl p-4 ${className}`}>
      <div className="text-xs text-textMuted">{label}</div>
      <div className="text-2xl font-semibold heading mt-1">{value}</div>
      {hint && <div className="text-xs text-textMuted mt-1">{hint}</div>}
    </div>
  )
}


