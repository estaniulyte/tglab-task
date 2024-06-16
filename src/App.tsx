import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Article } from './types/article';
import usePaginatedData from './utils/usePaginatedData';
import ArticlesGrid from './components/ArticlesGrid';
import styled from 'styled-components';
import SearchForm from './components/SearchForm';

const MainContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 15px 0;
  padding: 0;
  color: white;
`;

function App() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const {
    results: articles,
    setSize,
    size,
    isLoadingMore,
    hasMore,
  } = usePaginatedData<Article>('articles', query);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(search);
  };

  const handleClearSearch = () => {
    setSearch('');
    setQuery('');
    setSize(1);
  };

  useEffect(() => {
    if (query) {
      setSize(1);
    }
  }, [query, setSize]);

  const loader = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoadingMore) {
        setSize(size + 1);
      }
    },
    [setSize, size, hasMore, isLoadingMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }
    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [handleObserver]);

  return (
    <MainContainer>
      <header>
        <h1>TGLab Task - Evelina Staniulytė</h1>
      </header>
      <main>
        <SearchForm
          search={search}
          onSearchChange={handleSearchInputChange}
          onSearchSubmit={handleSearchSubmit}
          onClearSearch={handleClearSearch}
        />
        {isLoadingMore ? (
          <p>Loading...</p>
        ) : !articles.length ? (
          <p>No articles found</p>
        ) : (
          <></>
        )}
        {articles.length ? <ArticlesGrid articles={articles} /> : <></>}
        <div ref={loader}>
          {isLoadingMore && hasMore && <p>Loading more...</p>}
        </div>
      </main>
    </MainContainer>
  );
}
export default App;
