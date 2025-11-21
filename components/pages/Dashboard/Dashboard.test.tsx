import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dashboard } from './Dashboard';
import { mockCharacters } from './__mocks__/characters';
import { mockLocationData } from './__mocks__/locations';

vi.mock('recharts', async () => {
  const actual = await vi.importActual('recharts');
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: 400, height: 400 }}>{children}</div>
    ),
  };
});

const defaultProps = {
  characters: mockCharacters,
  totalCount: 2,
  locationData: mockLocationData,
  searchValue: '',
  onSearchChange: vi.fn(),
  loading: false,
  error: null,
  onLoadMore: vi.fn(),
};

describe('Dashboard', () => {
  it('renders the dashboard with title', () => {
    render(<Dashboard {...defaultProps} />);
    expect(screen.getByText('Rick & Morty Characters')).toBeInTheDocument();
  });

  it('renders the table with column headers', () => {
    render(<Dashboard {...defaultProps} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Species')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
  });

  it('renders search input with placeholder', () => {
    render(<Dashboard {...defaultProps} />);
    expect(screen.getByPlaceholderText('Search characters by name...')).toBeInTheDocument();
  });

  it('calls onSearchChange when typing in search', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    render(<Dashboard {...defaultProps} onSearchChange={onSearchChange} />);

    const input = screen.getByPlaceholderText('Search characters by name...');
    await user.type(input, 'Rick');

    expect(onSearchChange).toHaveBeenCalled();
  });

  it('displays search value in input', () => {
    render(<Dashboard {...defaultProps} searchValue="Morty" />);
    const input = screen.getByPlaceholderText('Search characters by name...');
    expect(input).toHaveValue('Morty');
  });

  it('renders location chart section', () => {
    render(<Dashboard {...defaultProps} />);
    expect(screen.getByText('Characters by Location')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Dashboard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
