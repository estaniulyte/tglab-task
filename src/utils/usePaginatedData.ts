import useSWRInfinite from 'swr/infinite';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PAGE_SIZE = 18;

type ApiResponse<T> = {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
};

const usePaginatedData = <T>(endpoint: string, search?: string) => {
  const URL = process.env.REACT_APP_API_URL;

  const { data, mutate, error, size, setSize, isValidating, isLoading } =
    useSWRInfinite<ApiResponse<T>>(
      (index) =>
        `${URL}/${endpoint}?limit=${PAGE_SIZE}&offset=${
          index * PAGE_SIZE
        }&search=${search}`,
      fetcher
    );

  const results: T[] = data ? data.flatMap((page) => page.results) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const hasMore = data ? data[data.length - 1]?.next !== null : false;

  return {
    results,
    isLoadingMore,
    isLoading,
    hasMore,
    error,
    mutate,
    size,
    setSize,
    isValidating,
  };
};

export default usePaginatedData;
