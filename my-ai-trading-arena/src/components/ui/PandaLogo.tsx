/**
 * PandaLogo — SVG panda mascot for the Alpha Arena platform
 */

import { cn } from '../../lib/utils';

interface PandaLogoProps {
  size?: number;
  className?: string;
}

export function PandaLogo({ size = 32, className }: PandaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
    >
      {/* Head - white circle */}
      <circle cx="32" cy="34" r="24" fill="white" />

      {/* Left ear */}
      <circle cx="14" cy="14" r="10" fill="#1a1a2e" />
      <circle cx="14" cy="14" r="6" fill="#2d2d44" />

      {/* Right ear */}
      <circle cx="50" cy="14" r="10" fill="#1a1a2e" />
      <circle cx="50" cy="14" r="6" fill="#2d2d44" />

      {/* Left eye patch */}
      <ellipse cx="22" cy="32" rx="9" ry="10" fill="#1a1a2e" transform="rotate(-10 22 32)" />

      {/* Right eye patch */}
      <ellipse cx="42" cy="32" rx="9" ry="10" fill="#1a1a2e" transform="rotate(10 42 32)" />

      {/* Left eye */}
      <ellipse cx="22" cy="31" rx="4" ry="4.5" fill="white" />
      <circle cx="23" cy="30.5" r="2.5" fill="#1a1a2e" />
      <circle cx="24" cy="29.5" r="1" fill="white" />

      {/* Right eye */}
      <ellipse cx="42" cy="31" rx="4" ry="4.5" fill="white" />
      <circle cx="41" cy="30.5" r="2.5" fill="#1a1a2e" />
      <circle cx="42" cy="29.5" r="1" fill="white" />

      {/* Nose */}
      <ellipse cx="32" cy="39" rx="3" ry="2" fill="#1a1a2e" />

      {/* Mouth */}
      <path
        d="M29 42 Q32 45 35 42"
        stroke="#1a1a2e"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Subtle cheek blush */}
      <circle cx="16" cy="38" r="3" fill="#f0a0b0" opacity="0.3" />
      <circle cx="48" cy="38" r="3" fill="#f0a0b0" opacity="0.3" />

      {/* Lightning bolt accent (trading theme) */}
      <path
        d="M48 6 L44 14 L48 13 L42 22 L46 14 L42 15 Z"
        fill="#eab308"
        stroke="#eab308"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
