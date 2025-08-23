import { useEffect, useState } from 'react';

export const usePaginatedData = (data = [], perPage = 4) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleData, setVisibleData] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (data.length === 0) {
      setVisibleData([]);
      setHasMore(false);
      return;
    }

    const nextData = data.slice(0, currentPage * perPage);
    setVisibleData(nextData);
    setHasMore(nextData.length < data.length);
  }, [data, perPage, currentPage]);

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return { visibleData, loadMore, hasMore };
};