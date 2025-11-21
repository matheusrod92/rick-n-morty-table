'use client';

import { useState } from 'react';
import { Dashboard } from '@/components/pages/Dashboard/Dashboard';
import { useCharacters } from '@/hooks/useCharacters';
import { useDebounce } from '@/hooks/useDebounce';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 300);

  const { characters, loading, error, loadMore, locationData, totalCount } =
    useCharacters({ searchTerm: debouncedSearch });

  return (
    <Dashboard
      characters={characters}
      totalCount={totalCount}
      locationData={locationData}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      loading={loading}
      error={error}
      onLoadMore={loadMore}
    />
  );
}
