export type NodeKind = 'supplier' | 'factory' | 'logistics' | 'customer';

export interface LogisticsNode {
  id: string;
  label: string;
  sublabel: string;
  kind: NodeKind;
  icon: string;
  x: number;
  y: number;
}

export interface LogisticsEdge {
  from: string;
  to: string;
  label?: string;
}
