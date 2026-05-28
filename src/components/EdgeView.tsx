interface Props {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  highlighted: boolean;
  dimmed: boolean;
}

export function EdgeView({ id, x1, y1, x2, y2, label, highlighted, dimmed }: Props) {
  const dx = x2 - x1;
  const cx1 = x1 + dx * 0.55;
  const cx2 = x1 + dx * 0.45;
  const d = `M ${x1} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}`;

  const stroke = highlighted ? '#475569' : '#cbd5e1';
  const strokeWidth = highlighted ? 2.2 : 1.4;
  const opacity = dimmed ? 0.15 : 1;
  const pathId = `edge-path-${id}`;

  return (
    <g style={{ opacity, transition: 'opacity 0.3s ease' }}>
      <path
        id={pathId}
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        style={{
          transition: 'stroke 0.25s ease, stroke-width 0.25s ease',
          strokeDasharray: highlighted ? '6 5' : 'none',
          animation: highlighted ? 'flow 0.9s linear infinite' : 'none',
        }}
      />
      {label && (
        <text
          fontSize={10}
          fill={highlighted ? '#1f2937' : '#94a3b8'}
          style={{ pointerEvents: 'none', userSelect: 'none', transition: 'fill 0.25s ease' }}
        >
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            {label}
          </textPath>
        </text>
      )}
    </g>
  );
}
