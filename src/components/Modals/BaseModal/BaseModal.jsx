import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import Icon from '../../Icon/Icon';
import s from './BaseModal.module.css';

const BaseModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  teacher,
  children,
  onSubmit,
  buttonText,
  isSubmitting,
  switcher,
  formId = 'modalForm',
}) => {
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null;

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div
        className={s.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${formId}-title`}
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          className={s.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon name="close-btn" className={s.icon} />
        </button>

        <div className={s.modalContainer}>
          <div className={s.infoWrap}>
            <h2 id={`${formId}-title`} className={s.title}>
              {title}
            </h2>
            {subtitle && <p className={s.subtitle}>{subtitle}</p>}
            {teacher && (
              <div className={s.teacherWrap}>
                <img
                  src={teacher.avatar_url}
                  alt="Teacher"
                  width={44}
                  height={44}
                />
                <div className={s.teacherInfo}>
                  <p>Your teacher</p>
                  <b>
                    {teacher.name} {teacher.surname}
                  </b>
                </div>
              </div>
            )}
          </div>

          <form className={s.form} id={formId} onSubmit={onSubmit} noValidate>
            <div className={s.formContent}>{children}</div>
          </form>

          {buttonText && (
            <button
              className={s.submitBtn}
              type="submit"
              form={formId}
              disabled={isSubmitting}
            >
              {buttonText}
            </button>
          )}

          {switcher && <div className={s.switcher}>{switcher}</div>}
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default BaseModal;
