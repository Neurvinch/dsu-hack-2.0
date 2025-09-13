export default function Card({ className = '', children, ...props }) {
  return (
    <div className={`card-cyber ${className}`} {...props}>
      {children}
    </div>
  )
}


