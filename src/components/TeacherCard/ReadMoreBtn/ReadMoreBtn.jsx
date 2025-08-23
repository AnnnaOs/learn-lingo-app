import ReadMoreSection from '../ReadMoreSection/ReadMoreSection';
import s from './ReadMoreBtn.module.css';

const ReadMoreBtn = ({ teacher, isActive, setIsActive }) => {
  if (!teacher) return null;

  return (
    <>
      {isActive && <ReadMoreSection {...teacher} />}
      <button
        className={s.readMoreBtn}
        type="button"
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? 'Read less' : 'Read more'}
      </button>
    </>
  );
};

export default ReadMoreBtn;
