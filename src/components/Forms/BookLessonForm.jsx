import s from './Forms.module.css';

const BookLessonForm = ({ register, errors }) => {
  const reasonOptions = {
    career: 'Career and business',
    kids: 'Lesson for kids',
    abroad: 'Living abroad',
    exams: 'Exams and coursework',
    hobby: 'Culture, travel or hobby',
  };

  return (
    <>
      <fieldset className={s.radioGroup}>
        <legend className={s.legend}>
          What is your main reason for learning English?
        </legend>

        {Object.entries(reasonOptions).map(([value, label]) => (
          <label key={value} className={s.radioLabel}>
            <input
              type="radio"
              value={value}
              className={s.radioInput}
              {...register('reason')}
            />
            {label}
          </label>
        ))}

        {errors.reason && <p className={s.error}>{errors.reason.message}</p>}
      </fieldset>

      <div className={s.floatingGroup}>
        <input
          id="fullName"
          type="text"
          placeholder=" "
          autoComplete="name"
          className={`${s.input} ${errors.fullName ? s.errorInput : ''}`}
          required
          {...register('fullName')}
        />
        <label htmlFor="fullName" className={s.label}>
          Full Name
        </label>
        {errors.fullName && (
          <p className={s.errorText}>{errors.fullName?.message}</p>
        )}
      </div>

      <div className={s.floatingGroup}>
        <input
          id="email"
          type="email"
          placeholder=" "
          autoComplete="email"
          className={`${s.input} ${errors.email ? s.errorInput : ''}`}
          required
          {...register('email')}
        />
        <label htmlFor="email" className={s.label}>
          Email
        </label>
        {errors.email && <p className={s.errorText}>{errors.email?.message}</p>}
      </div>

      <div className={s.floatingGroup}>
        <input
          id="phoneNumber"
          type="tel"
          placeholder=" "
          autoComplete="tel"
          className={`${s.input} ${errors.phoneNumber ? s.errorInput : ''}`}
          required
          {...register('phoneNumber')}
        />
        <label htmlFor="phoneNumber" className={s.label}>
          Phone number
        </label>
        {errors.phoneNumber && (
          <p className={s.errorText}>{errors.phoneNumber?.message}</p>
        )}
      </div>
    </>
  );
};

export default BookLessonForm;
