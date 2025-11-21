import './Spinner.css';

export interface SpinnerProps {
  className?: string;
}

export function Spinner({ className = '' }: SpinnerProps) {
  return (
    <div
      className={`spinner ${className}`.trim()}
      role="status"
      aria-label="Loading"
    >
      <span className="spinner__visually-hidden">Loading...</span>
    </div>
  );
}
