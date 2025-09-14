'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface Faq {
  question: string;
  answer: string;
}

const faqData: Faq[] = [
    {
        question: "O que é o AmityMemo e como ele funciona?",
        answer: "AmityMemo é uma plataforma inovadora para criar páginas de memórias digitais personalizadas. Você pode adicionar fotos, vídeos, textos e músicas para celebrar momentos especiais, aniversários, datas de namoro, ou qualquer lembrança que deseje eternizar. É um presente único e emocionante para a pessoa amada."
    },
    {
        question: "Como eu crio uma página de memória?",
        answer: "É super simples! Primeiro, você escolhe o plano que melhor se adapta à sua necessidade (Plano Para Sempre ou Anual). Depois, preenche um formulário intuitivo com o conteúdo da sua memória: suas fotos favoritas, um vídeo especial, textos emocionantes e até uma música tema. Após o pagamento, em poucos minutos, sua página estará pronta e você receberá um link exclusivo e um QR Code para compartilhar."
    },
    {
        question: "O que posso incluir na minha página personalizada?",
        answer: "Sua página pode ser totalmente personalizada! Você pode incluir: uma galeria de fotos (ilimitada no Plano Para Sempre), um vídeo (até 5 minutos no Plano Para Sempre), textos detalhados com sua história, e até uma trilha sonora para embalar a memória. Cada detalhe é pensado para tornar sua lembrança ainda mais especial."
    },
    {
        question: "Como recebo e compartilho minha página de memória?",
        answer: "Assim que sua memória estiver pronta e o pagamento for confirmado, você receberá um e-mail com o link direto para a sua página personalizada e um QR Code exclusivo. Você pode então compartilhar esse link ou QR Code com a pessoa amada por mensagem, redes sociais, ou até mesmo imprimi-lo em um cartão de presente. A memória estará acessível de qualquer dispositivo com internet!"
    },
    {
        question: "A memória digital tem validade ou expira?",
        answer: "Oferecemos o flexível \"Plano Para Sempre\", que garante que sua memória digital fique online e acessível para sempre, sem nenhuma data de expiração. Se preferir uma opção de curto prazo, o \"Plano Anual\" mantém sua memória ativa por 1 ano. A escolha é sua para eternizar ou renovar a cada ciclo!"
    },
    {
        question: "Quais são as formas de pagamento aceitas?",
        answer: "Para sua conveniência e segurança, aceitamos diversas formas de pagamento através de um gateway confiável: Cartão de Crédito (Visa, MasterCard, Elo, etc.), Pix e Boleto Bancário. Todas as transações são criptografadas para garantir a proteção dos seus dados."
    }
];

const FaqItem = ({ item, isOpen, onClick }: { item: Faq, isOpen: boolean, onClick: () => void }) => {
    return (
        <div className={`faq-item ${isOpen ? 'active' : ''}`}>
            <button className="faq-question" onClick={onClick}>
                <span>{item.question}</span>
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div className="faq-answer" style={{ maxHeight: isOpen ? '200px' : '0' }}>
                <p>{item.answer}</p>
            </div>
        </div>
    );
};


const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleItemClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="faq-section">
            <div className="container">
                <div className="faq-header">
                    <h2>Dúvidas Frequentes? Estamos aqui para ajudar!</h2>
                    <p>Encontre respostas rápidas para as suas perguntas e crie sua memória AmityMemo com total tranquilidade.</p>
                </div>
                <div className="faq-grid">
                    {faqData.map((item, index) => (
                        <FaqItem
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleItemClick(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;