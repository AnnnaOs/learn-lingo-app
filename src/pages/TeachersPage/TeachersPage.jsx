import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTeachers } from '../../redux/teachers/operations';
import {
  selectAllTeachers,
  selectIsLoading,
  selectError,
} from '../../redux/teachers/selectors';

import { useFilterOptions } from '../../hooks/useFilterOptions';
import { usePaginatedData } from '../../hooks/usePaginatedData';

import FilterBar from '../../components/FilterBar/FilterBar';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import TeachersList from '../../components/TeachersList/TeachersList';

const TeachersPage = () => {
  const dispatch = useDispatch();
  const allTeachers = useSelector(selectAllTeachers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [filters, setFilters] = useState({
    language: '',
    level: '',
    price: '',
  });

  const { onOpenModal } = useOutletContext();

  useEffect(() => {
    if (!allTeachers.length) {
      dispatch(fetchTeachers());
    }
  }, [dispatch, allTeachers.length]);

  const { filteredTeachers, languageOptions, levelOptions, priceOptions } =
    useFilterOptions(filters);

  const isFilterApplied = filters.language || filters.level || filters.price;

  const {
    visibleData: paginatedAll,
    loadMore: loadMoreAll,
    hasMore: hasMoreAll,
  } = usePaginatedData(allTeachers);

  const {
    visibleData: paginatedFiltered,
    loadMore: loadMoreFiltered,
    hasMore: hasMoreFiltered,
  } = usePaginatedData(filteredTeachers);

  const teachersToRender = isFilterApplied ? paginatedFiltered : paginatedAll;
  const showLoadMore = isFilterApplied ? hasMoreFiltered : hasMoreAll;
  const handleLoadMore = isFilterApplied ? loadMoreFiltered : loadMoreAll;

  return (
    <section className="teachersPage">
      <div className="container">
        <FilterBar
          filters={filters}
          onChange={setFilters}
          languageOptions={languageOptions}
          levelOptions={levelOptions}
          priceOptions={priceOptions}
        />

        {error && <p className="errorText">Error: {error}</p>}

        {isLoading && !allTeachers.length ? (
          <p className="loadingText">Loading teachers...</p>
        ) : filteredTeachers.length === 0 && isFilterApplied ? (
          <p className="notFoundText">
            No teachers found matching your filters
          </p>
        ) : (
          <>
            <TeachersList
              teachers={teachersToRender}
              onOpenModal={onOpenModal}
              selectedLevel={filters.level}
            />

            {showLoadMore && (
              <LoadMoreBtn
                onClick={handleLoadMore}
                disabled={false}
                isLoading={false}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TeachersPage;
