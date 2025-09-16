import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from './StepIndicator.module.css';

interface StepIndicatorProps {
  steps: number[];
  currentStep: number;
}

export default function StepIndicator({
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <div className={styles.stepIndicator}>
      {steps.map((step) => (
        <div
          key={step}
          className={`${styles.step} ${
            currentStep === step ? styles.active : ''
          } ${currentStep > step ? styles.completed : ''}`}
        >
          {currentStep > step ? (
            <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
          ) : (
            step
          )}
        </div>
      ))}
    </div>
  );
}