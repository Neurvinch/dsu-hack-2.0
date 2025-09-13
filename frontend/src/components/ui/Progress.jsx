export default function Progress({ value = 0, className = '' }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={`w-full h-3 rounded-full bg-white/10 overflow-hidden ${className}`}>
      <div
        className="h-full bg-accent-gradient"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}


