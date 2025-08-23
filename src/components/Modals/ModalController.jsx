import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useFormSubmit } from '../../hooks/useFormSubmit';
import { usePasswordToggle } from '../../hooks/usePasswordToggle';

import { titles, subtitles, buttonTexts } from '../../services/modalText';
import {
  loginSchema,
  registerSchema,
  bookingSchema,
} from '../../validation/schemas';

import AuthForm from '../Forms/AuthForm';
import BaseModal from './BaseModal/BaseModal';
import BookLessonForm from '../Forms/BookLessonForm';
import AuthModalSwitcher from './AuthModalSwitcher/AuthModalSwitcher';

const ModalController = ({ type, isOpen, onClose, onSwitchModal, teacher }) => {
  const schema =
    type === 'register'
      ? registerSchema
      : type === 'login'
      ? loginSchema
      : bookingSchema;

  const formId = `${type}Form`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), mode: 'onTouched' });

  const closeMobMenu = teacher?.closeMobMenu || null;
  const { onSubmit } = useFormSubmit(type, onClose, reset, closeMobMenu);
  const { showPassword, togglePassword } = usePasswordToggle();

  const switcher =
    type === 'login' || type === 'register' ? (
      <AuthModalSwitcher mode={type} onSwitch={onSwitchModal} />
    ) : null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={titles[type]}
      subtitle={subtitles[type]}
      onSubmit={handleSubmit(onSubmit)}
      buttonText={buttonTexts[type]}
      formId={formId}
      isSubmitting={isSubmitting}
      teacher={type === 'booking' ? teacher : null}
      switcher={switcher}
    >
      {type === 'booking' && teacher ? (
        <BookLessonForm register={register} errors={errors} teacher={teacher} />
      ) : (
        <AuthForm
          mode={type}
          register={register}
          errors={errors}
          showPassword={showPassword}
          togglePassword={togglePassword}
        />
      )}
    </BaseModal>
  );
};

export default ModalController;
