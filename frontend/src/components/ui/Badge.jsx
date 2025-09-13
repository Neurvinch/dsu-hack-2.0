const variants = {
  default: 'bg-white/5 text-textPrimary border-white/10',
  success: 'bg-success/15 text-success border-success/30',
  warning: 'bg-warning/15 text-warning border-warning/30',
  danger: 'bg-danger/15 text-danger border-danger/30',
  info: 'bg-secondary/15 text-secondary border-secondary/30',
};

export default function Badge({ children, variant = 'default', className = '', ...props }) {
  return (
    <span className={`chip border ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  )
}


