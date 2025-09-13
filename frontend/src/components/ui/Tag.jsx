export default function Tag({ children, className = '', ...props }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-white/5 border border-white/10 ${className}`} {...props}>
      {children}
    </span>
  )
}


