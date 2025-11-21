import './TableCell.css';

export interface TableCellProps {
  children: React.ReactNode;
  isHeader?: boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function TableCell({
  children,
  isHeader = false,
  align = 'left',
  className = '',
}: TableCellProps) {
  const Tag = isHeader ? 'th' : 'td';

  return (
    <Tag className={`table-cell table-cell--${align} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
