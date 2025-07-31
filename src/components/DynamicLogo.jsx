import { useTheme } from '../contexts/ThemeContext';

const DynamicLogo = ({ width = 64, height = 64, className = '' }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height}
      className={className}
      viewBox="0 0 64 64"
    >
      <rect 
        width="100%" 
        height="100%" 
        fill={isDarkMode ? "#000" : "#ffffff"}
      />
      <text 
        x="50%" 
        y="55%" 
        textAnchor="middle" 
        dominantBaseline="middle"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="48" 
        fill={isDarkMode ? "#39FF14" : "#000000"}
        fontWeight="bold"
      >
        Z
      </text>
    </svg>
  );
};

export default DynamicLogo;
