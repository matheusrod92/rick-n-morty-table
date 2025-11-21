import { useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_CHARACTERS } from '@/graphql/queries/characters';

interface CharactersQueryResult {
  characters: {
    info: {
      count: number;
      pages: number;
      next: number | null;
      prev: number | null;
    };
    results: Character[];
  };
}

interface UseCharactersOptions {
  searchTerm?: string;
}

export interface LocationData {
  name: string;
  count: number;
  [key: string]: unknown;
}

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
}

export function useCharacters({ searchTerm = '' }: UseCharactersOptions = {}) {
  const { data, loading, error, fetchMore } = useQuery<CharactersQueryResult>(
    GET_CHARACTERS,
    {
      variables: { page: 1, name: searchTerm || undefined },
      notifyOnNetworkStatusChange: true,
    }
  );

  const characters = useMemo(
    () => data?.characters?.results ?? [],
    [data?.characters?.results]
  );

  const hasMore = useMemo(() => {
    if (!data?.characters?.info) return false;
    return data.characters.info.next !== null;
  }, [data]);

  const loadMore = useCallback(async () => {
    const nextPage = data?.characters?.info?.next;
    if (loading || !nextPage) return;

    try {
      await fetchMore({
        variables: { page: nextPage, name: searchTerm || undefined },
      });
    } catch (err) {
      console.error('Error fetching more characters:', err);
    }
  }, [loading, data?.characters?.info?.next, fetchMore, searchTerm]);

  const locationData = useMemo<LocationData[]>(() => {
    const locationCounts = new Map<string, number>();

    characters.forEach((character) => {
      if (!character?.location?.name) return;
      const locationName = character.location.name;
      locationCounts.set(locationName, (locationCounts.get(locationName) || 0) + 1);
    });

    return Array.from(locationCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [characters]);

  return {
    characters,
    loading,
    error: error?.message || null,
    hasMore,
    loadMore,
    locationData,
    totalCount: data?.characters?.info?.count || 0,
  };
}
