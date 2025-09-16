import styles from './ConfirmationModal.module.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }: ConfirmationModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonGroup}>
          <button onClick={onCancel} className={styles.cancelButton}>Começar do Zero</button>
          <button onClick={onConfirm} className={styles.confirmButton}>Continuar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;