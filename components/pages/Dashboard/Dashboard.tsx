'use client';

import { type Character, type LocationData } from '@/hooks/useCharacters';
import { SearchInput } from '../../molecules/SearchInput/SearchInput';
import {
  CharacterTable,
} from '../../organisms/CharacterTable/CharacterTable';
import {
  LocationChart,
} from '../../organisms/LocationChart/LocationChart';
import './Dashboard.css';

export interface DashboardProps {
  characters: Character[];
  totalCount: number;
  locationData: LocationData[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  loading?: boolean;
  error?: string | null;
  onLoadMore?: () => void;
}

export function Dashboard({
  characters,
  totalCount,
  locationData,
  searchValue,
  onSearchChange,
  loading = false,
  error = null,
  onLoadMore,
}: DashboardProps) {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Rick & Morty Characters</h1>
        <p className="dashboard__subtitle">
          Dashboard created to the Takehome assignment from Alternative Payments
        </p>
      </header>

      <div className="dashboard__controls">
        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search characters by name..."
        />
      </div>

      <div className="dashboard__content">
        <section className="dashboard__table-section">
          <CharacterTable
            characters={characters}
            totalCount={totalCount}
            loading={loading}
            error={error}
            onLoadMore={onLoadMore}
          />
        </section>

        <aside className="dashboard__sidebar">
          <LocationChart data={locationData} />
        </aside>
      </div>
    </div>
  );
}
