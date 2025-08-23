import Icon from '../Icon/Icon';
import s from './Forms.module.css';

const AuthForm = ({ register, errors, mode, showPassword, togglePassword }) => {
  return (
    <>
      {mode === 'register' && (
        <div className={s.floatingGroup}>
          <input
            id="name"
            type="text"
            placeholder=" "
            autoComplete="name"
            className={`${s.input} ${errors.name ? s.errorInput : ''}`}
            required
            {...register('name')}
          />
          <label htmlFor="name" className={s.label}>
            Name
          </label>
          {errors.name && <p className={s.errorText}>{errors.name.message}</p>}
        </div>
      )}

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
        {errors.email && <p className={s.errorText}>{errors.email.message}</p>}
      </div>

      <div className={s.floatingGroup}>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder=" "
          autoComplete={
            mode === 'register' ? 'new-password' : 'current-password'
          }
          className={`${s.input} ${errors.password ? s.errorInput : ''}`}
          required
          {...register('password')}
        />
        <label htmlFor="password" className={s.label}>
          Password
        </label>
        <button
          type="button"
          onClick={togglePassword}
          className={s.passwordBtn}
        >
          {showPassword ? (
            <Icon name="eye-open" className={s.icon} />
          ) : (
            <Icon name="eye-close" className={s.icon} />
          )}
        </button>
        {errors.password && (
          <p className={s.errorText}>{errors.password.message}</p>
        )}
      </div>
    </>
  );
};

export default AuthForm;
