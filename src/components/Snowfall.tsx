import React, { useMemo } from 'react';
import { Box } from '@mui/material';

interface SnowfallProps {
  count?: number;
}

const Snowfall: React.FC<SnowfallProps> = ({ count = 50 }) => {
  const flakes = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100; // percent from left edge
      const size = 6 + Math.random() * 18; // px
      const delay = Math.random() * -20; // s
      const fallDuration = 8 + Math.random() * 18; // s
      const sway = (5 + Math.random() * 40) * (Math.random() > 0.5 ? 1 : -1); // px, left or right
      const swayDuration = 3 + Math.random() * 6; // s
      const spinDuration = 4 + Math.random() * 8; // s
      const opacity = 0.45 + Math.random() * 0.55;
      return {
        id: i,
        left,
        size,
        delay,
        fallDuration,
        sway,
        swayDuration,
        spinDuration,
        opacity,
      };
    });
  }, [count]);

  return (
    <Box
      component="div"
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-15vh); }
          100% { transform: translateY(110vh); }
        }

        @keyframes sway {
          0% { transform: translateX(0); }
          50% { transform: translateX(var(--sway)); }
          100% { transform: translateX(0); }
        }

        .flake {
          position: absolute;
          top: -15vh;
          will-change: transform, opacity;
          pointer-events: none;
        }

        .flake .flake-svg {
          display: block;
          width: var(--size);
          height: var(--size);
          opacity: var(--opacity);
        }
      `}</style>

      {flakes.map((f) => (
        <Box
          key={f.id}
          component="span"
          className="flake"
          sx={{
            left: `${f.left}%`,
            '--sway': `${f.sway}px`,
            '--fall-duration': `${f.fallDuration}s`,
            '--delay': `${f.delay}s`,
            '--sway-duration': `${f.swayDuration}s`,
            '--size': `${f.size}px`,
            '--opacity': f.opacity,
            animation: `fall var(--fall-duration) linear var(--delay) infinite`,
            userSelect: 'none',
            display: 'block',
          }}
        >
          <Box
            component="span"
            className="flake-svg"
            sx={{
              display: 'inline-block',
              width: 'var(--size)',
              height: 'var(--size)',
              animation: `sway var(--sway-duration) ease-in-out var(--delay) infinite`,
              transformOrigin: 'center',
            }}
          >
            {/* Simple snowflake SVG - scales with --size */}
            <svg viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-hidden>
              <g fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4" />
                <path d="M12 18v4" />
                <path d="M4.2 4.2l2.8 2.8" />
                <path d="M17 17l2.8 2.8" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
                <path d="M4.2 19.8l2.8-2.8" />
                <path d="M17 7l2.8-2.8" />
                <circle cx="12" cy="12" r="1.6" fill="white" stroke="none" />
              </g>
            </svg>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Snowfall;
