import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import './SearchInput.css';
import { Search, X } from 'lucide-react';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  className = '',
}: SearchInputProps) {
  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <div className={`search-input ${className}`.trim()}>
      <div className="search-input__icon">
        <Search size={20} />
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input__field"
      />
      {value && (
        <Button
          onClick={handleClear}
          className="search-input__clear"
        >
          <X size={20}/>
        </Button>
      )}
    </div>
  );
}
