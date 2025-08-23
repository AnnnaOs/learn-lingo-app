import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useModal } from '../../hooks/useModal';

import Header from '../Header/Header';
import ScrollUpBtn from '../ScrollUpBtn/ScrollUpBtn';
import ModalController from '../Modals/ModalController';

const Layout = () => {
  const {
    modalType,
    selectedTeacher,
    isModalOpen,
    openModal,
    closeModal,
    switchModal,
  } = useModal();

  const [isMobMenuOpen, setIsMobMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Header
        onOpenModal={openModal}
        isMobMenuOpen={isMobMenuOpen}
        setIsMobMenuOpen={setIsMobMenuOpen}
      />

      <main>
        <Outlet context={{ onOpenModal: openModal }} />
      </main>

      {isModalOpen && (
        <ModalController
          type={modalType}
          isOpen={isModalOpen}
          onClose={closeModal}
          onSwitchModal={switchModal}
          teacher={selectedTeacher}
        />
      )}

      <ScrollUpBtn hide={isMobMenuOpen || isHome} />
    </>
  );
};

export default Layout;
