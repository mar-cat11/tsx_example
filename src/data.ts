import type { LogisticsNode, LogisticsEdge } from './types';

const COL_X = {
  supplier: 130,
  factory: 430,
  logistics: 640,
  customer: 820,
} as const;

export const nodes: LogisticsNode[] = [
  { id: 'sup-servo',    label: 'サーボモーター',   sublabel: '京都',           kind: 'supplier', icon: 'widgets',        x: COL_X.supplier,  y: 140 },
  { id: 'sup-gear',     label: '波動歯車減速機',   sublabel: '長野・諏訪',     kind: 'supplier', icon: 'widgets',        x: COL_X.supplier,  y: 260 },
  { id: 'sup-alu',      label: 'アルミ鋳物',       sublabel: '三重・四日市',   kind: 'supplier', icon: 'widgets',        x: COL_X.supplier,  y: 380 },
  { id: 'sup-pcb',      label: '制御基板',         sublabel: '台湾・新竹',     kind: 'supplier', icon: 'widgets',        x: COL_X.supplier,  y: 500 },

  { id: 'factory',      label: '本社工場',         sublabel: '栃木・宇都宮',   kind: 'factory',  icon: 'home_work',      x: COL_X.factory,   y: 320 },

  { id: 'log-yard',     label: '出荷ヤード',       sublabel: '栃木・宇都宮',   kind: 'logistics', icon: 'local_shipping', x: COL_X.logistics, y: 220 },
  { id: 'log-service',  label: 'サービスセンター', sublabel: '全国 12拠点',    kind: 'logistics', icon: 'local_shipping', x: COL_X.logistics, y: 420 },

  { id: 'cus-auto',     label: '自動車メーカー',   sublabel: '国内・海外',     kind: 'customer', icon: 'person',         x: COL_X.customer,  y: 180 },
  { id: 'cus-elec',     label: '電機・電子',       sublabel: '国内・アジア',   kind: 'customer', icon: 'person',         x: COL_X.customer,  y: 320 },
  { id: 'cus-gen',      label: '一般産業',         sublabel: '国内中心',       kind: 'customer', icon: 'person',         x: COL_X.customer,  y: 460 },
];

export const edges: LogisticsEdge[] = [
  { from: 'sup-servo', to: 'factory',     label: '週3便'        },
  { from: 'sup-gear',  to: 'factory',     label: '週2便'        },
  { from: 'sup-alu',   to: 'factory',     label: '週2便'        },
  { from: 'sup-pcb',   to: 'factory',     label: '週2便（空輸）' },

  { from: 'factory',   to: 'log-yard'    },
  { from: 'factory',   to: 'log-service' },

  { from: 'log-yard',    to: 'cus-auto' },
  { from: 'log-yard',    to: 'cus-elec' },
  { from: 'log-yard',    to: 'cus-gen'  },
  { from: 'log-service', to: 'cus-auto' },
  { from: 'log-service', to: 'cus-gen'  },
];
