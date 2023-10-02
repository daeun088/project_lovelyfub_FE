import React from 'react';
import styles from './modal.module.scss';

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          닫기
        </button>
        모달창
      </div>
    </div>
  );
}

export default Modal;
