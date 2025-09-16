"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import StepWrapper from "./StepWrapper";
import StepIndicator from "./StepIndicator";
import ConfirmationModal from "./ConfirmationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faSmile } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";
import styles from './CreateForm.module.css';

const TOTAL_STEPS = 8;
const STEPS = Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1);

interface FormData {
  urlName: string;
  pageTitle: string;
  startDate: string;
  message: string;
  files: File[];
  emoji: string;
  youtubeLink: string;
}

export default function CreateForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [savedProgress, setSavedProgress] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    urlName: "",
    pageTitle: "",
    startDate: "",
    message: "",
    files: [],
    emoji: "",
    youtubeLink: "",
  });

  const router = useRouter();

  useEffect(() => {
    const progressData = localStorage.getItem("saasProgress");
    if (progressData) {
      setSavedProgress(JSON.parse(progressData));
      setModalOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    if (savedProgress) {
        setCurrentStep(savedProgress.progress);
        setFormData(savedProgress.data);
    }
    setModalOpen(false);
  };

  const handleCancel = () => {
    localStorage.removeItem("saasProgress");
    setModalOpen(false);
  };

  const handleNext = () => {
    const nextStep = currentStep + 1;
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(nextStep);
      localStorage.setItem(
        "saasProgress",
        JSON.stringify({ progress: nextStep, data: formData })
      );
    } else {
      router.push("/pagamento");
    }
  };

  const handlePrev = () => {
    const prevStep = currentStep - 1;
    if (currentStep > 1) {
      setCurrentStep(prevStep);
      localStorage.setItem(
        "saasProgress",
        JSON.stringify({ progress: prevStep, data: formData })
      );
    }
  };
  
  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    setFormData((prev) => ({ ...prev, emoji: emojiData.emoji }));
    setShowEmojiPicker(false);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'emoji' && value.length > 2) {
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setFormData((prev) => ({
        ...prev,
        files: Array.from(fileList),
      }));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <p className={styles.description}>
              Escolha um nome que fará parte do link, ex: `amitymemo.com/nome`
            </p>
            <input
              type="text"
              name="urlName"
              value={formData.urlName}
              onChange={handleInputChange}
              placeholder="ex: joaogaldeanomaiara"
              className={styles.input}
            />
          </>
        );
      case 2:
        return (
          <>
            <p className={styles.description}>
              O título que será exibido na página.
            </p>
            <input
              type="text"
              name="pageTitle"
              value={formData.pageTitle}
              onChange={handleInputChange}
              placeholder="ex: Nossa História"
              className={styles.input}
            />
          </>
        );
      case 3:
        return (
          <>
            <p className={styles.description}>
              Selecione a data de início do relacionamento.
            </p>
            <DatePicker
              selected={formData.startDate ? new Date(formData.startDate) : null}
              onChange={(date: Date | null) => {
                if (date) {
                  const adjustedDate = new Date(date.getTime() - (date.getTimezoneOffset() * -60000));
                  setFormData({ ...formData, startDate: adjustedDate.toISOString().split('T')[0] });
                }
              }}
              dateFormat="dd/MM/yyyy"
              className={styles.input}
              locale={ptBR}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={15}
            />
          </>
        );
      case 4:
        return (
          <>
            <p className={styles.description}>
              Escreva a mensagem especial que ficará na página.
            </p>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className={styles.textarea}
              placeholder="Digite sua mensagem aqui..."
            />
          </>
        );
      case 5:
        return (
          <>
            <p className={styles.description}>
              Envie fotos e outros anexos para a sua página.
            </p>
            <div className={styles.fileInputContainer}>
              <label htmlFor="file-upload" className={styles.fileInputLabel}>
                Escolher arquivos
              </label>
              <input
                id="file-upload"
                type="file"
                name="files"
                onChange={handleFileChange}
                multiple
                className={styles.fileInput}
              />
              <span className={styles.fileName}>
                {formData.files.length > 0
                  ? `${formData.files.length} arquivo(s) selecionado(s)`
                  : "Nenhum arquivo escolhido"}
              </span>
            </div>
          </>
        );
      case 6:
        return (
          <>
            <p className={styles.description}>
              Escolha um emoji para complementar o título da página.
            </p>
            <div className={styles.emojiInputContainer}>
              <input
                type="text"
                name="emoji"
                value={formData.emoji}
                onChange={handleInputChange}
                placeholder="ex: ❤️"
                className={`${styles.input} ${styles.emojiInput}`}
              />
              <button
                type="button"
                className={styles.emojiPickerButton}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <FontAwesomeIcon icon={faSmile} />
              </button>
            </div>
            {showEmojiPicker && (
              <div className={styles.emojiPickerWrapper}>
                <EmojiPicker
                  onEmojiClick={handleEmojiSelect}
                  skinTonesDisabled
                  width="100%"
                />
              </div>
            )}
          </>
        );
      case 7:
        return (
          <>
            <p className={styles.description}>
              Insira o link de uma música do YouTube.
            </p>
            <div className={styles.iconInputContainer}>
              <FontAwesomeIcon icon={faYoutube} className={`${styles.inputIcon} fa-youtube`} />
              <input
                type="url"
                name="youtubeLink"
                value={formData.youtubeLink}
                onChange={handleInputChange}
                placeholder="https://www.youtube.com/watch?v=..."
                className={`${styles.input} ${styles.inputWithIcon}`}
              />
            </div>
          </>
        );
      case 8:
        return (
            <>
                <p className={styles.description}>
                Seu resumo está pronto! Clique em "Próximo" para prosseguir para o
                pagamento e finalizar a criação da sua página.
                </p>
                <div className={styles.summary}>
                <h3 className={styles.summaryTitle}>Resumo da sua página:</h3>
                <p>
                    <strong>URL:</strong> amitymemo.com/{formData.urlName}
                </p>
                <p>
                    <strong>Título:</strong> {formData.pageTitle} {formData.emoji}
                </p>
                <p>
                    <strong>Data de início:</strong> {formData.startDate}
                </p>
                <p>
                    <strong>Mensagem:</strong> {formData.message.substring(0, 50)}...
                </p>
                </div>
            </>
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    const titles = [
      "Nome para a URL",
      "Título da Página",
      "Contador de Tempo",
      "Mensagem",
      "Fotos e Anexos",
      "Emoji",
      "Escolha uma Música",
      "Gerar Página / Pagamento"
    ];
    return titles[currentStep - 1] || "";
  }

  const isStepValid = () => {
    switch (currentStep) {
        case 1: return formData.urlName.length > 0;
        case 2: return formData.pageTitle.length > 0;
        case 3: return !!formData.startDate;
        case 4: return formData.message.length > 0;
        case 5: return formData.files.length > 0;
        case 6: return formData.emoji.length > 0;
        case 7: return formData.youtubeLink.length > 0;
        case 8: return true;
        default: return false;
    }
  }

  const getPreviewUrl = () => {
    return `memorylit.com/memory/${formData.urlName || "TESTE"}`;
  };

  const getPreviewTitle = () => {
    return `${formData.pageTitle || "Título da lembrança"} ${formData.emoji || ''}`;
  };

  return (
    <>
        <ConfirmationModal
            isOpen={modalOpen}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            message="Encontramos um progresso salvo. Deseja continuar de onde parou?"
        />
        <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
                <StepIndicator steps={STEPS} currentStep={currentStep} />
                <StepWrapper
                    stepTitle={getStepTitle()}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    isFirstStep={currentStep === 1}
                    isLastStep={currentStep === TOTAL_STEPS}
                    isValid={isStepValid()}
                >
                    {renderStepContent()}
                </StepWrapper>
            </div>
            <div className={styles.previewPane}>
                <div className={styles.previewWindow}>
                <div className={styles.previewHeader}>
                    <div className={styles.windowButtons}>
                    <span className={styles.windowButton}></span>
                    <span className={styles.windowButton}></span>
                    <span className={styles.windowButton}></span>
                    </div>
                    <div className={styles.previewUrlBar}>
                    {getPreviewUrl()}
                    </div>
                    <FontAwesomeIcon icon={faExternalLinkAlt} className={styles.externalIcon} />
                </div>
                <div className={styles.previewContent}>
                    <div className={styles.previewText}>
                    <div className={styles.previewTitle}>
                        {getPreviewTitle()}
                    </div>
                    <div className={styles.previewSubtitle}>Contador de tempo aqui</div>
                    </div>
                </div>
                <div className={styles.previewFooter}>
                    {formData.message || "Escreva sua mensagem aqui"}
                </div>
                </div>
            </div>
        </div>
    </>
  );
}