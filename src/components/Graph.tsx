import { useMemo, useState } from 'react';
import { nodes, edges } from '../data';
import { NodeView } from './NodeView';
import { EdgeView } from './EdgeView';

const COLUMNS = [
  { x: 130, label: 'SUPPLIERS',   color: '#3b82f6' },
  { x: 430, label: 'OUR FACTORY', color: '#f97316' },
  { x: 640, label: 'LOGISTICS',   color: '#10b981' },
  { x: 820, label: 'CUSTOMERS',   color: '#8b5cf6' },
];

const VIEW_W = 950;
const VIEW_H = 620;

export function Graph() {
  const [hoverId, setHoverId] = useState<string | null>(null);

  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), []);

  const relatedNodeIds = useMemo(() => {
    if (!hoverId) return new Set<string>();
    const set = new Set<string>([hoverId]);
    for (const e of edges) {
      if (e.from === hoverId) set.add(e.to);
      if (e.to === hoverId) set.add(e.from);
    }
    return set;
  }, [hoverId]);

  const isEdgeHighlighted = (from: string, to: string) =>
    hoverId !== null && (from === hoverId || to === hoverId);

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      width="100%"
      style={{ maxWidth: 1000, background: '#ffffff', borderRadius: 12 }}
    >
      {COLUMNS.map((c, i) => (
        <g key={`col-${i}`}>
          <text
            x={c.x}
            y={40}
            textAnchor="middle"
            fontSize={12}
            fontWeight={700}
            fill={c.color}
            style={{ letterSpacing: '0.2em', userSelect: 'none' }}
          >
            {c.label}
          </text>
        </g>
      ))}

      {[
        (COLUMNS[0].x + COLUMNS[1].x) / 2,
        (COLUMNS[1].x + COLUMNS[2].x) / 2,
        (COLUMNS[2].x + COLUMNS[3].x) / 2,
      ].map((x, i) => (
        <line
          key={`div-${i}`}
          x1={x}
          y1={70}
          x2={x}
          y2={VIEW_H - 30}
          stroke="#e5e7eb"
          strokeDasharray="2 6"
          strokeWidth={1}
        />
      ))}

      {edges.map((e) => {
        const from = nodeMap.get(e.from)!;
        const to = nodeMap.get(e.to)!;
        const highlighted = isEdgeHighlighted(e.from, e.to);
        const dimmed = hoverId !== null && !highlighted;
        return (
          <EdgeView
            key={`${e.from}-${e.to}`}
            id={`${e.from}-${e.to}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            label={e.label}
            highlighted={highlighted}
            dimmed={dimmed}
          />
        );
      })}

      {nodes.map((n) => {
        const highlighted = hoverId === n.id;
        const related = relatedNodeIds.has(n.id);
        const dimmed = hoverId !== null && !related;
        return (
          <NodeView
            key={n.id}
            node={n}
            highlighted={highlighted}
            dimmed={dimmed}
            onHover={setHoverId}
          />
        );
      })}
    </svg>
  );
}
