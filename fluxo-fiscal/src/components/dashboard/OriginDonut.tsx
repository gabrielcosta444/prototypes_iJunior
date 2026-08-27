import { originData } from '../../data/mockData';

export function OriginDonut() {
  return (
    <div className="origin-donut">
      <div className="origin-donut__chart" role="img" aria-label="Distribuição dos documentos por origem">
        <div><strong>1.284</strong><span>documentos</span></div>
      </div>
      <div className="origin-donut__legend">
        {originData.map((item) => (
          <div key={item.name}>
            <span className="legend-dot" style={{ background: item.color }} />
            <span>{item.name}</span><strong>{item.value}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
