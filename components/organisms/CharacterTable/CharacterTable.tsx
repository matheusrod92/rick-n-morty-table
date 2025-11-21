'use client';

import { useRef, useEffect } from 'react';
import useVirtual from 'react-cool-virtual';
import { Tag } from '@/components/atoms/Tag/Tag';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { Character } from '@/hooks/useCharacters';
import { TableCell } from '../../atoms/TableCell/TableCell';
import { TableRow } from '../../molecules/TableRow/TableRow';
import { TableHeader, Column } from '../../molecules/TableHeader/TableHeader';
import { Spinner } from '../../atoms/Spinner/Spinner';
import './CharacterTable.css';

const TABLE_COLUMNS: Column[] = [
  { key: 'avatar', label: '', align: 'center' },
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
  { key: 'species', label: 'Species' },
  { key: 'gender', label: 'Gender' },
  { key: 'origin', label: 'Origin' },
  { key: 'location', label: 'Location' },
];

export interface CharacterTableProps {
  characters: Character[];
  totalCount: number;
  loading?: boolean;
  error?: string | null;
  onLoadMore?: () => void;
}

const ROW_HEIGHT = 65;
const ITEMS_PER_PAGE = 20;

export function CharacterTable({
  characters,
  totalCount,
  loading = false,
  error = null,
  onLoadMore,
}: CharacterTableProps) {
  const isPageLoadedRef = useRef<boolean[]>([true]);

  useEffect(() => {
    isPageLoadedRef.current = [true];
  }, [totalCount]);

  const { outerRef, innerRef, items } = useVirtual<
    HTMLDivElement,
    HTMLTableSectionElement
  >({
    itemCount: totalCount,
    itemSize: ROW_HEIGHT,
    loadMoreCount: ITEMS_PER_PAGE,
    isItemLoaded: (loadIndex) => {
      console.log({ loadIndex, isLoaded: isPageLoadedRef.current})
      return isPageLoadedRef.current[loadIndex] ?? false
    },
    loadMore: ({ loadIndex }) => {
      console.log({ loadIndex, loading })
      if (loading) return;
      isPageLoadedRef.current[loadIndex] = true;
      onLoadMore?.();
    },
  });

  if (error) {
    return (
      <div className="character-table__error">
        <p>Error loading characters: {error}</p>
      </div>
    );
  }

  if (!loading && characters.length === 0) {
    return (
      <div className="character-table__empty">
        <p>No characters found</p>
      </div>
    );
  }

  return (
    <div className="character-table">
      <div ref={outerRef} className="character-table__container">
        {loading && characters.length === 0 ? (
          <div className="character-table__loading">
            <Spinner />
            {characters.length === 0 && <p>Loading characters...</p>}
          </div>
        ) : (
          <table className="character-table__table">
            <TableHeader columns={TABLE_COLUMNS} />
            <tbody ref={innerRef}>
              {items.map(({ index }) => {
                const character = characters[index];
                if (!character) return null;

                return (
                  <TableRow key={character.id}>
                    <TableCell align="center">
                      <Avatar src={character.image} alt={character.name} />
                    </TableCell>
                    <TableCell>{character.name}</TableCell>
                    <TableCell>
                      <Tag status={character.status} />
                    </TableCell>
                    <TableCell>{character.species}</TableCell>
                    <TableCell>{character.gender}</TableCell>
                    <TableCell>{character.origin.name}</TableCell>
                    <TableCell>{character.location.name}</TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
