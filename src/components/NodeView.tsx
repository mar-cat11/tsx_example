import type { LogisticsNode, NodeKind } from '../types';

const KIND_COLORS: Record<NodeKind, string> = {
  supplier:  '#3b82f6',
  factory:   '#f97316',
  logistics: '#10b981',
  customer:  '#8b5cf6',
};

interface Props {
  node: LogisticsNode;
  highlighted: boolean;
  dimmed: boolean;
  onHover: (id: string | null) => void;
}

export function NodeView({ node, highlighted, dimmed, onHover }: Props) {
  const color = KIND_COLORS[node.kind];
  const opacity = dimmed ? 0.28 : 1;
  const radius = 30;
  const strokeWidth = highlighted ? 3.5 : 2;

  return (
    <g
      className="node"
      transform={`translate(${node.x}, ${node.y})`}
      style={{ opacity, cursor: 'pointer', transition: 'opacity 0.3s ease' }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
    >
      {highlighted && (
        <circle
          r={radius + 8}
          fill={color}
          opacity={0.12}
        />
      )}
      <circle
        r={radius}
        fill="#ffffff"
        stroke={color}
        strokeWidth={strokeWidth}
        style={{ transition: 'stroke-width 0.25s ease' }}
      />
      <foreignObject
        x={-18}
        y={-18}
        width={36}
        height={36}
        style={{ pointerEvents: 'none' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ color, fontSize: 26, lineHeight: 1 }}
          >
            {node.icon}
          </span>
        </div>
      </foreignObject>
      <text
        textAnchor="middle"
        y={radius + 22}
        fontSize={13}
        fontWeight={700}
        fill="#1f2937"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.label}
      </text>
      <text
        textAnchor="middle"
        y={radius + 40}
        fontSize={11}
        fill="#9ca3af"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.sublabel}
      </text>
    </g>
  );
}
