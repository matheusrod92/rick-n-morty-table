# Rick & Morty Dashboard

Takehome assignment for Alternative Payment's hiring proccess.

## Getting Started

1. Copy the environment file and install dependencies:

```bash
cp env.example .env.local
pnpm install
```

2. Run the development server:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app router
├── components/
│   ├── atoms/              # Basic UI elements (Button, Input, TableCell, etc)
│   ├── molecules/          # Composed components (SearchInput, TableRow, TableHeader)
│   ├── organisms/          # Complex components (CharacterTable, LocationChart)
│   └── pages/              # Page layouts (Dashboard)
├── graphql/
│   └── queries/            # GraphQL query definitions
└── hooks/                  # Custom React hooks (useCharacters, useDebounce)
```

## Design Decisions

- The table is virtualized using react-cool-virtual to handle large datasets efficiently. We had to set the tbody element to display block for the virtualization to work properly with the table structure.

- Pagination is handled by the virtualization library itself. When the user scrolls near the bottom, it triggers a loadMore callback that fetches the next page through the useCharacters hook.

- The pie chart is built with Recharts and automatically updates whenever new data arrives, whether from loading more pages or applying a search filter.

- State management relies entirely on Apollo Client's InMemoryCache. When new characters arrive with the same filter, the cache merge policy combines old results with new ones. This eliminates the need for separate state hooks to track the character list.

## Trade-offs and Unfinished Parts

- Testing coverage could be expanded with more unit tests for individual atoms and molecules, as well as integration tests for the data fetching flow.

- The atoms components (Button, Input) have minimal variants. In a production app these would have more style variants to cover different use cases.

- When applying a new search filter, the scroll position stays where it was instead of resetting to the top. This could be improved by programmatically scrolling to the top when the filter changes.
