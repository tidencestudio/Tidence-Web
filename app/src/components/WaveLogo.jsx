export default function WaveLogo({ color = '#2E8B93', width = 34, height = 16 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 220 100" aria-hidden="true">
      <path
        d="M10,60 C 45,20 75,100 110,60 C 145,20 175,100 210,60"
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
