export function LoadingState({ label = "Loading data..." }) {
  return (
    <div className="state-panel">
      <div className="css-loader" />
      <p>{label}</p>
    </div>
  );
}

export function EmptyState({ title, message }) {
  return (
    <div className="state-panel">
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-panel error-state">
      <strong>Something broke</strong>
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  );
}
