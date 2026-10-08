const ICONS = { ok: 'fa-check-circle', err: 'fa-exclamation-circle', info: 'fa-info-circle' };

export default function Toasts({ toasts }) {
  return (
    <div id="twrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type} show`}>
          <i className={`fas ${ICONS[t.type] || ICONS.info}`}></i>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
