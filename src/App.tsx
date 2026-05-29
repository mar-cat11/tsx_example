import { useEffect, useRef, useState } from 'react';
import claudeIcon from '../claude.png';
import './App.css';
import './animations.css';

const roleGroups = [
  {
    id: 'automation',
    title: '1. 既存業務の自動化',
    x: 35,
    fill: '#fdecc8',
    summary: '定型業務を終わらせる仕組みやミニアプリを、その場で作る領域。',
    items: [
      '規程を動くQ&A案内アプリ化',
      'CSV変換・集計マクロ作成',
      '長文ドキュメントの要約・構造化',
      '市場・競合分析レポートの自動生成',
    ],
  },
  {
    id: 'knowledge',
    title: '2. ナレッジ・基準の標準化',
    x: 325,
    fill: '#ead8ff',
    summary: '属人化しがちな専門知識や自社ルールを、誰でも使える品質基準にする領域。',
    items: [
      '採用基準に沿った面接評価コメント',
      'ターゲットに刺さる求人票テキスト生成',
      'ブランドガイドライン準拠チェック',
      'NG表現の検知と修正案提示',
    ],
  },
  {
    id: 'creative',
    title: '3. クリエイティブ・新規価値',
    x: 615,
    fill: '#ffc5d8',
    summary: '新しい企画、見せ方、提案、プロトタイプを短時間で形にする領域。',
    items: [
      '新サービス・新機能案の具体化',
      'LP、資料、UIプロトタイプ作成',
      '顧客別の提案ストーリー設計',
      '広告・記事・動画構成案の量産',
    ],
  },
];

function SupplyPattern() {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const activeEdge = (from: string, to: string) => hoverId === from || hoverId === to;
  const dimEdge = (from: string, to: string) => hoverId !== null && !activeEdge(from, to);
  const related = (id: string, links: string[]) => hoverId === null || hoverId === id || links.includes(hoverId);
  const nodeClass = (id: string, links: string[]) => (related(id, links) ? 'supply-node' : 'supply-node dimmed');
  const edgeClass = (from: string, to: string) => (dimEdge(from, to) ? 'supply-edge dimmed' : 'supply-edge');
  const pathClass = (from: string, to: string) => (activeEdge(from, to) ? 'supply-path active' : 'supply-path');

  return (
    <div className="graph-container">
      <header className="app-header">
        <h1>サプライチェーン可視化</h1>
        <p>ノードにカーソルを合わせると、関連する取引先がハイライトされます</p>
      </header>
      <svg className="supply-diagram" viewBox="0 0 950 620" role="img" aria-label="サプライチェーン可視化">
        <text className="supply-column" x="130" y="40" textAnchor="middle" fill="#3b82f6">SUPPLIERS</text>
        <text className="supply-column" x="430" y="40" textAnchor="middle" fill="#f97316">OUR FACTORY</text>
        <text className="supply-column" x="640" y="40" textAnchor="middle" fill="#10b981">LOGISTICS</text>
        <text className="supply-column" x="820" y="40" textAnchor="middle" fill="#8b5cf6">CUSTOMERS</text>
        <line x1="280" y1="70" x2="280" y2="590" stroke="#e5e7eb" strokeDasharray="2 6" />
        <line x1="535" y1="70" x2="535" y2="590" stroke="#e5e7eb" strokeDasharray="2 6" />
        <line x1="730" y1="70" x2="730" y2="590" stroke="#e5e7eb" strokeDasharray="2 6" />

        <g className={edgeClass('sup-servo', 'factory')}><path className={pathClass('sup-servo', 'factory')} d="M 130 115 C 295 115, 265 320, 430 320" /><text className="supply-edge-label" x="280" y="202" textAnchor="middle">週3便</text></g>
        <g className={edgeClass('sup-gear', 'factory')}><path className={pathClass('sup-gear', 'factory')} d="M 130 260 C 295 260, 265 320, 430 320" /><text className="supply-edge-label" x="280" y="282" textAnchor="middle">週2便</text></g>
        <g className={edgeClass('sup-alu', 'factory')}><path className={pathClass('sup-alu', 'factory')} d="M 130 380 C 295 380, 265 320, 430 320" /><text className="supply-edge-label" x="280" y="354" textAnchor="middle">週2便</text></g>
        <g className={edgeClass('sup-pcb', 'factory')}><path className={pathClass('sup-pcb', 'factory')} d="M 130 500 C 295 500, 265 320, 430 320" /><text className="supply-edge-label" x="280" y="426" textAnchor="middle">週2便（空輸）</text></g>
        <g className={edgeClass('factory', 'log-yard')}><path className={pathClass('factory', 'log-yard')} d="M 430 320 C 546 320, 524 185, 640 185" /></g>
        <g className={edgeClass('factory', 'log-service')}><path className={pathClass('factory', 'log-service')} d="M 430 320 C 546 320, 524 420, 640 420" /></g>
        <g className={edgeClass('log-yard', 'cus-auto')}><path className={pathClass('log-yard', 'cus-auto')} d="M 640 185 C 739 185, 721 145, 820 145" /></g>
        <g className={edgeClass('log-yard', 'cus-elec')}><path className={pathClass('log-yard', 'cus-elec')} d="M 640 185 C 739 185, 721 320, 820 320" /></g>
        <g className={edgeClass('log-yard', 'cus-gen')}><path className={pathClass('log-yard', 'cus-gen')} d="M 640 185 C 739 185, 721 460, 820 460" /></g>
        <g className={edgeClass('log-service', 'cus-auto')}><path className={pathClass('log-service', 'cus-auto')} d="M 640 420 C 739 420, 721 145, 820 145" /></g>
        <g className={edgeClass('log-service', 'cus-gen')}><path className={pathClass('log-service', 'cus-gen')} d="M 640 420 C 739 420, 721 460, 820 460" /></g>

        <g className={nodeClass('sup-servo', ['factory'])} onMouseEnter={() => setHoverId('sup-servo')} onMouseLeave={() => setHoverId(null)} transform="translate(130, 115)"><circle r="30" fill="#ffffff" stroke="#3b82f6" strokeWidth={hoverId === 'sup-servo' ? 4 : 2.5} /><foreignObject x="-18" y="-18" width="36" height="36"><span className="material-symbols-outlined supply-icon-html" style={{ color: '#3b82f6' }}>widgets</span></foreignObject><text className="supply-label" y="54" textAnchor="middle">サーボモーター</text><text className="supply-sublabel" y="72" textAnchor="middle">京都</text></g>
        <g className={nodeClass('sup-gear', ['factory'])} onMouseEnter={() => setHoverId('sup-gear')} onMouseLeave={() => setHoverId(null)} transform="translate(130, 260)"><circle r="30" fill="#ffffff" stroke="#3b82f6" strokeWidth={hoverId === 'sup-gear' ? 4 : 2.5} /><foreignObject x="-18" y="-18" width="36" height="36"><span className="material-symbols-outlined supply-icon-html" style={{ color: '#3b82f6' }}>widgets</span></foreignObject><text className="supply-label" y="54" textAnchor="middle">波動歯車減速機</text><text className="supply-sublabel" y="72" textAnchor="middle">長野・諏訪</text></g>
        <g className={nodeClass('sup-alu', ['factory'])} onMouseEnter={() => setHoverId('sup-alu')} onMouseLeave={() => setHoverId(null)} transform="translate(130, 380)"><circle r="30" fill="#ffffff" stroke="#3b82f6" strokeWidth={hoverId === 'sup-alu' ? 4 : 2.5} /><foreignObject x="-18" y="-18" width="36" height="36"><span className="material-symbols-outlined supply-icon-html" style={{ color: '#3b82f6' }}>widgets</span></foreignObject><text className="supply-label" y="54" textAnchor="middle">アルミ鋳物</text><text className="supply-sublabel" y="72" textAnchor="middle">三重・四日市</text></g>
        <g className={nodeClass('sup-pcb', ['factory'])} onMouseEnter={() => setHoverId('sup-pcb')} onMouseLeave={() => setHoverId(null)} transform="translate(130, 500)"><circle r="30" fill="#ffffff" stroke="#3b82f6" strokeWidth={hoverId === 'sup-pcb' ? 4 : 2.5} /><foreignObject x="-18" y="-18" width="36" height="36"><span className="material-symbols-outlined supply-icon-html" style={{ color: '#3b82f6' }}>widgets</span></foreignObject><text className="supply-label" y="54" textAnchor="middle">制御基板</text><text className="supply-sublabel" y="72" textAnchor="middle">台湾・新竹</text></g>
        <g className={nodeClass('factory', ['sup-servo', 'sup-gear', 'sup-alu', 'sup-pcb', 'log-yard', 'log-service'])} onMouseEnter={() => setHoverId('factory')} onMouseLeave={() => setHoverId(null)} transform="translate(430, 320)"><circle r="30" fill="#ffffff" stroke="#f97316" strokeWidth={hoverId === 'factory' ? 4 : 2.5} /><foreignObject x="-18" y="-18" width="36" height="36"><span className="material-symbols-outlined supply-icon-html" style={{ color: '#f97316' }}>home_work</span></foreignObject><text className="supply-label" y="54" textAnchor="middle">本社工場</text><text className="supply-sublabel" y="72" textAnchor="middle">栃木・宇都宮</text></g>
        <g className={nodeClass('log-yard', ['factory', 'cus-auto', 'cus-elec', 'cus-gen'])} onMouseEnter={() => setHoverId('log-yard')} onMouseLeave={() => setHoverId(null)} transform="translate(640, 185)"><circle r="30" fill="#ffffff" stroke="#10b981" strokeWidth={hoverId === 'log-yard' ? 4 : 2.5} /><foreignObject x="-18" y="-18" width="36" height="36"><span className="material-symbols-outlined supply-icon-html" style={{ color: '#10b981' }}>local_shipping</span></foreignObject><text className="supply-label" y="54" textAnchor="middle">出荷ヤード</text><text className="supply-sublabel" y="72" textAnchor="middle">栃木・宇都宮</text></g>
        <g className={nodeClass('log-service', ['factory', 'cus-auto', 'cus-gen'])} onMouseEnter={() => setHoverId('log-service')} onMouseLeave={() => setHoverId(null)} transform="translate(640, 420)"><circle r="30" fill="#ffffff" stroke="#10b981" strokeWidth={hoverId === 'log-service' ? 4 : 2.5} /><foreignObject x="-18" y="-18" width="36" height="36"><span className="material-symbols-outlined supply-icon-html" style={{ color: '#10b981' }}>local_shipping</span></foreignObject><text className="supply-label" y="54" textAnchor="middle">サービスセンター</text><text className="supply-sublabel" y="72" textAnchor="middle">全国 12拠点</text></g>
        <g className={nodeClass('cus-auto', ['log-yard', 'log-service'])} onMouseEnter={() => setHoverId('cus-auto')} onMouseLeave={() => setHoverId(null)} transform="translate(820, 145)"><circle r="30" fill="#ffffff" stroke="#8b5cf6" strokeWidth={hoverId === 'cus-auto' ? 4 : 2.5} /><foreignObject x="-18" y="-18" width="36" height="36"><span className="material-symbols-outlined supply-icon-html" style={{ color: '#8b5cf6' }}>person</span></foreignObject><text className="supply-label" y="54" textAnchor="middle">自動車メーカー</text><text className="supply-sublabel" y="72" textAnchor="middle">国内・海外</text></g>
        <g className={nodeClass('cus-elec', ['log-yard'])} onMouseEnter={() => setHoverId('cus-elec')} onMouseLeave={() => setHoverId(null)} transform="translate(820, 320)"><circle r="30" fill="#ffffff" stroke="#8b5cf6" strokeWidth={hoverId === 'cus-elec' ? 4 : 2.5} /><foreignObject x="-18" y="-18" width="36" height="36"><span className="material-symbols-outlined supply-icon-html" style={{ color: '#8b5cf6' }}>person</span></foreignObject><text className="supply-label" y="54" textAnchor="middle">電機・電子</text><text className="supply-sublabel" y="72" textAnchor="middle">国内・アジア</text></g>
        <g className={nodeClass('cus-gen', ['log-yard', 'log-service'])} onMouseEnter={() => setHoverId('cus-gen')} onMouseLeave={() => setHoverId(null)} transform="translate(820, 460)"><circle r="30" fill="#ffffff" stroke="#8b5cf6" strokeWidth={hoverId === 'cus-gen' ? 4 : 2.5} /><foreignObject x="-18" y="-18" width="36" height="36"><span className="material-symbols-outlined supply-icon-html" style={{ color: '#8b5cf6' }}>person</span></foreignObject><text className="supply-label" y="54" textAnchor="middle">一般産業</text><text className="supply-sublabel" y="72" textAnchor="middle">国内中心</text></g>
      </svg>
    </div>
  );
}

function OrgPattern() {
  const [hoverTarget, setHoverTarget] = useState<string | null>(null);
  const [dotTarget, setDotTarget] = useState<string | null>(null);
  const fadeTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (fadeTimer.current !== null) window.clearTimeout(fadeTimer.current);
    };
  }, []);

  const handleEnter = (target: string) => {
    if (fadeTimer.current !== null) window.clearTimeout(fadeTimer.current);
    setHoverTarget(target);
    setDotTarget(target);
  };

  const handleLeave = () => {
    setHoverTarget(null);
    fadeTimer.current = window.setTimeout(() => setDotTarget(null), 360);
  };

  const dotsExiting = hoverTarget === null && dotTarget !== null;

  return (
    <section className="org-pattern" aria-label="AI組織図">
      <svg className="org-diagram" viewBox="0 0 900 560" role="img" aria-label="An entire org working for you">
        <text className="org-title" x="450" y="62" textAnchor="middle">claudeに頼みたいこと</text>

        <path id="you-pancake-line" className={`solid-line ${hoverTarget === 'you' ? 'active' : ''}`} d="M 385 152 C 425 128, 475 128, 515 152" />
        <path id="automation-line" className={`dot-line ${hoverTarget === 'pancake' || hoverTarget === 'automation' ? 'active' : ''}`} d="M 535 178 C 390 205, 270 205, 160 250" />
        <path id="knowledge-line" className={`dot-line ${hoverTarget === 'pancake' || hoverTarget === 'knowledge' ? 'active' : ''}`} d="M 535 178 C 510 205, 475 222, 450 250" />
        <path id="creative-line" className={`dot-line ${hoverTarget === 'pancake' || hoverTarget === 'creative' ? 'active' : ''}`} d="M 535 178 C 600 204, 680 218, 740 250" />

        {[
          { id: 'you-pancake-line', active: dotTarget === 'you', r: 5 },
          { id: 'automation-line', active: dotTarget === 'pancake' || dotTarget === 'automation', r: 5 },
          { id: 'knowledge-line', active: dotTarget === 'pancake' || dotTarget === 'knowledge', r: 5 },
          { id: 'creative-line', active: dotTarget === 'pancake' || dotTarget === 'creative', r: 5 },
        ].filter((dot) => dot.active).flatMap((dot) =>
          [0, -0.73, -1.46].map((delay, index) => (
            <circle className={`line-dot active ${dotsExiting ? 'exiting' : ''}`} r={dot.r} key={`${dot.id}-${index}`}>
              <animateMotion dur="2.2s" begin={`${delay}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath href={`#${dot.id}`} />
              </animateMotion>
            </circle>
          )),
        )}

        <circle className={`svg-node you ${hoverTarget === 'you' ? 'active' : ''}`} cx="365" cy="155" r="36" />
        <circle className={`svg-node pancake ${hoverTarget === 'pancake' ? 'active' : ''}`} cx="535" cy="155" r="36" />
        <text className="node-label" x="365" y="106" textAnchor="middle">you</text>
        <text className="node-label" x="535" y="106" textAnchor="middle">claude</text>
        <circle className="svg-hit" cx="365" cy="155" r="44" onMouseEnter={() => handleEnter('you')} onMouseLeave={handleLeave} />
        <circle className="svg-hit" cx="535" cy="155" r="44" onMouseEnter={() => handleEnter('pancake')} onMouseLeave={handleLeave} />
        <foreignObject x="341" y="131" width="48" height="48" onMouseEnter={() => handleEnter('you')} onMouseLeave={handleLeave}>
          <span className="material-symbols-outlined svg-icon">person</span>
        </foreignObject>
        <foreignObject x="511" y="131" width="48" height="48" onMouseEnter={() => handleEnter('pancake')} onMouseLeave={handleLeave}>
          <img className="claude-image" src={claudeIcon} alt="" />
        </foreignObject>
        {roleGroups.map((group) => {
          const cardW = 250;
          return (
            <g key={group.id} onMouseEnter={() => handleEnter(group.id)} onMouseLeave={handleLeave}>
              <rect className={`svg-card ${hoverTarget === group.id ? 'active' : ''}`} x={group.x} y="250" width={cardW} height="250" rx="22" fill={group.fill} />
              <foreignObject x={group.x + 18} y="274" width="214" height="206">
                <div className="card-content">
                  <h2>{group.title}</h2>
                  <p>{group.summary}</p>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </foreignObject>
            </g>
          );
        })}

        <defs>
          <linearGradient id="youGradient" x1="365" y1="119" x2="365" y2="191" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e9ccff" />
            <stop offset="1" stopColor="#b96bff" />
          </linearGradient>
          <linearGradient id="pancakeGradient" x1="535" y1="119" x2="535" y2="191" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffd891" />
            <stop offset="0.58" stopColor="#f79b61" />
            <stop offset="1" stopColor="#f5c9ff" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}

function App() {
  const [pattern, setPattern] = useState<'supply' | 'org'>('supply');

  return (
    <main className="app">
      <nav className="pattern-tabs" aria-label="表示パターン">
        <button className={pattern === 'supply' ? 'active' : ''} onClick={() => setPattern('supply')}>
          パターン1
        </button>
        <button className={pattern === 'org' ? 'active' : ''} onClick={() => setPattern('org')}>
          パターン2
        </button>
      </nav>

      <section className={pattern === 'supply' ? 'pattern-panel active' : 'pattern-panel'} aria-hidden={pattern !== 'supply'}>
        <SupplyPattern />
      </section>
      <section className={pattern === 'org' ? 'pattern-panel active' : 'pattern-panel'} aria-hidden={pattern !== 'org'}>
        <OrgPattern />
      </section>
    </main>
  );
}

export default App;
