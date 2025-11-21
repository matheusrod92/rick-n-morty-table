import './Input.css';

export function Input({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  disabled = false,
  className = '',
  id,
  name,
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`input ${className}`.trim()}
      type={type}
      value={value}
      onChange={(e) => onChange?.(e)}
      placeholder={placeholder}
      disabled={disabled}
      id={id}
      name={name}
    />
  );
}
