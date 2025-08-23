import s from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, disabled, isLoading }) => {
  return (
    <button
      className={s.loadMoreBtn}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? 'Loading...' : 'Load more'}
    </button>
  );
};

export default LoadMoreBtn;
