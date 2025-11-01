import './Logo.css';

function Logo({ size = 'medium', showText = true, variant = 'full' }) {
  const sizeMap = {
    small: { icon: 32, text: '1.25rem' },
    medium: { icon: 48, text: '2rem' },
    large: { icon: 64, text: '2.5rem' },
  };

  const dimensions = sizeMap[size] || sizeMap.medium;

  // SVG Icon - Stylized Poll/Vote checkmark design
  const PollIcon = () => (
    <svg
      width={dimensions.icon}
      height={dimensions.icon}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logo-icon-svg"
    >
      <defs>
        <linearGradient id="pollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#EC4899', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Outer rounded square */}
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="10"
        fill="url(#pollGradient)"
        opacity="0.15"
      />
      
      {/* Poll bars - ascending */}
      <rect x="12" y="28" width="6" height="12" rx="2" fill="url(#pollGradient)" />
      <rect x="21" y="22" width="6" height="18" rx="2" fill="url(#pollGradient)" />
      <rect x="30" y="16" width="6" height="24" rx="2" fill="url(#pollGradient)" />
      
      {/* Checkmark accent */}
      <path
        d="M32 12 L35 15 L42 8"
        stroke="url(#pollGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  // Stylized Wordmark
  const Wordmark = () => (
    <div className="logo-wordmark" style={{ fontSize: dimensions.text }}>
      <span className="logo-text">Pollify</span>
    </div>
  );

  if (variant === 'icon') {
    return (
      <div className="logo-container">
        <PollIcon />
      </div>
    );
  }

  if (variant === 'wordmark') {
    return (
      <div className="logo-container">
        <Wordmark />
      </div>
    );
  }

  // Full logo with icon and text
  return (
    <div className="logo-container logo-full">
      <PollIcon />
      {showText && <Wordmark />}
    </div>
  );
}

export default Logo;

