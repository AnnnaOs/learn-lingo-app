import s from './AuthModalSwitcher.module.css';

const AuthModalSwitcher = ({ mode, onSwitch }) => {
  return (
    <p className={s.switcherText}>
      {mode === 'login' ? (
        <>
          Don&apos;t have an account?
          <button
            className={s.switcherBtn}
            type="button"
            onClick={() => onSwitch('register')}
          >
            Sign Up
          </button>
        </>
      ) : (
        <>
          Already have an account?
          <button
            className={s.switcherBtn}
            type="button"
            onClick={() => onSwitch('login')}
          >
            Sign In
          </button>
        </>
      )}
    </p>
  );
};

export default AuthModalSwitcher;
