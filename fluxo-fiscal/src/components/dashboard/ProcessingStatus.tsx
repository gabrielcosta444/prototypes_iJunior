const statuses = [
  ['Concluído', '1.067', 83, 'success'],
  ['Processando', '52', 40, 'info'],
  ['Pendente', '43', 32, 'warning'],
  ['Duplicado', '32', 24, 'duplicate'],
  ['Erro', '8', 8, 'danger'],
] as const;

export function ProcessingStatus() {
  return (
    <div className="processing-list">
      {statuses.map(([label, value, width, tone]) => (
        <div className="processing-list__item" key={label}>
          <div><span><i className={`tone-dot tone-dot--${tone}`} />{label}</span><strong>{value}</strong></div>
          <span className="processing-list__track"><i className={`processing-list__bar processing-list__bar--${tone}`} style={{ width: `${width}%` }} /></span>
        </div>
      ))}
    </div>
  );
}
