import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from './StepWrapper.module.css';

interface StepWrapperProps {
  children: ReactNode;
  stepTitle: string;
  onPrev: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isValid: boolean;
}

export default function StepWrapper({
  children,
  stepTitle,
  onPrev,
  onNext,
  isFirstStep,
  isLastStep,
  isValid,
}: StepWrapperProps) {
  return (
    <div className={styles.stepWrapper}>
      <h2 className={styles.stepTitle}>{stepTitle}</h2>
      {children}
      <div className={styles.buttonContainer}>
        {!isFirstStep && (
          <button
            onClick={onPrev}
            className={`${styles.button} ${styles.prevButton}`}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            Anterior
          </button>
        )}
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`${styles.button} ${styles.nextButton} ${!isValid ? styles.disabledButton : ''}`}
        >
          {isLastStep ? 'Finalizar' : 'Próximo'}
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}