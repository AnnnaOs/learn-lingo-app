import Icon from '../../Icon/Icon';
import s from './ReadMoreSection.module.css';

const ReadMoreSection = ({ experience, reviews }) => {
  return (
    <>
      <p className={s.experience}>{experience}</p>

      <ul className={s.list}>
        {reviews.map(({ reviewer_name, reviewer_rating, comment }, index) => (
          <li key={index} className={s.item}>
            <div className={s.reviewerInfo}>
              <div className={s.avatar}>
                {reviewer_name.charAt(0).toUpperCase()}
              </div>
              <div className={s.textWrap}>
                <p className={s.name}>{reviewer_name}</p>
                <div className={s.rating}>
                  <Icon name="star" className={s.icon} />
                  <span className={s.ratingNum}>
                    {reviewer_rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            <p className={s.reviewerComment}>{comment}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReadMoreSection;
