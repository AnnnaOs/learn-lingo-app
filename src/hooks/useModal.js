import { useState, useCallback } from "react";

export const useModal = () => {
  const [modalType, setModalType] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const openModal = useCallback((type, teacher = {}) => {
    setModalType(type);
    setSelectedTeacher(teacher);
  }, []);

  const closeModal = useCallback(() => {
    setModalType(null);
    setSelectedTeacher({});
  }, []);

  const switchModal = useCallback((newType) => {
    setModalType(null);
    setTimeout(() => setModalType(newType), 200);
  }, []);

  return { modalType, selectedTeacher, isModalOpen: modalType !== null, openModal, closeModal, switchModal };
};