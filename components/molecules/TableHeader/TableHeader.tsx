import { TableRow } from '../TableRow/TableRow';
import { TableCell } from '../../atoms/TableCell/TableCell';
import './TableHeader.css';

export interface Column {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableHeaderProps {
  columns: Column[];
  className?: string;
}

export function TableHeader({ columns, className = '' }: TableHeaderProps) {
  return (
    <thead className={`table-header ${className}`.trim()}>
      <TableRow isHeader>
        {columns.map((column) => (
          <TableCell key={column.key} isHeader align={column.align}>
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </thead>
  );
}
