import './TableRow.css';

export interface TableRowProps {
  children: React.ReactNode;
  isHeader?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function TableRow({
  children,
  isHeader = false,
  className = '',
  style,
}: TableRowProps) {
  return (
    <tr
      className={`table-row ${isHeader ? 'table-row--header' : ''} ${className}`.trim()}
      style={style}
    >
      {children}
    </tr>
  );
}
