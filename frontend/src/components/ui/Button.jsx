import { motion } from 'framer-motion'

const base = 'inline-flex items-center justify-center rounded-xl font-medium transition focus-neon disabled:opacity-60 disabled:cursor-not-allowed';
const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};
const variants = {
  primary: 'bg-accent-gradient text-deepNavy shadow-soft-xl hover:brightness-110 hover:scale-[1.01] border border-white/10',
  secondary: 'bg-white/5 text-textPrimary hover:bg-white/10 border border-white/10',
  ghost: 'bg-transparent text-textPrimary hover:bg-white/5',
  danger: 'bg-danger/20 text-danger hover:bg-danger/30 border border-danger/40',
};

export default function Button({ as = motion.button, size = 'md', variant = 'primary', className = '', children, ...props }) {
  const Comp = as;
  return (
    <Comp
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
}


