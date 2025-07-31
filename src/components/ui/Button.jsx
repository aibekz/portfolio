import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  to, 
  href, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium font-mono transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl';
  
  const variants = {
    primary: 'bg-gradient-to-r from-matrix-green to-matrix-green/80 text-bg-dark hover:shadow-lg hover:shadow-matrix-green/25 focus:ring-matrix-green/50 transform hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-gray-200 text-primary hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border border-fg-light text-fg-light hover:border-matrix-green hover:text-matrix-green focus:ring-matrix-green/50',
    ghost: 'text-white hover:bg-white/10'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (to) {
    return (
      <Link 
        to={to} 
        className={`${classes} focus:ring-accent focus:ring-offset-2 rounded`}
        {...props}
      >
        {children}
      </Link>
    );
  }
  
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
