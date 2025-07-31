const DynamicLogoCSS = ({ width = 64, height = 64, className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height}
      className={`dynamic-logo ${className}`}
      viewBox="0 0 64 64"
    >
      <rect 
        width="100%" 
        height="100%" 
        className="logo-bg"
      />
      <text 
        x="50%" 
        y="55%" 
        textAnchor="middle" 
        dominantBaseline="middle"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="48" 
        className="logo-text"
        fontWeight="bold"
      >
        Z
      </text>
    </svg>
  );
};

export default DynamicLogoCSS;
