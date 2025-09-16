import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';

const PagamentoConcluidoPage = () => {
    return (
        <main className={styles.successPage}>
            <div className={styles.successCard}>
                <div className={styles.iconWrapper}>
                    <FontAwesomeIcon icon={faCheck} className={styles.icon} />
                </div>
                <h1 className={styles.title}>Pagamento Concluído!</h1>
                <p className={styles.message}>
                    Sua memória foi criada com sucesso. Em breve você receberá um e-mail com todas as informações e o link de acesso.
                </p>
                <Link href="/" className="btn-primary">
                    Voltar para a página inicial
                </Link>
            </div>
        </main>
    );
};

export default PagamentoConcluidoPage;