"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTag, faInfinity, faChevronDown, faCreditCard, faCheckCircle, faSpinner, faArrowLeft, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcMastercard, faPix } from '@fortawesome/free-brands-svg-icons';
import styles from './page.module.css';

import { loadStripe, Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/pagamento-concluido`,
            },
        });

        if (error?.type === "card_error" || error?.type === "validation_error") {
            setMessage(error.message || "Ocorreu um erro desconhecido.");
        } else {
            setMessage("Um erro inesperado ocorreu.");
        }
        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit" className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '16px', marginTop: '24px' }}>
                <span id="button-text">
                    {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Pagar R$29,90"}
                </span>
            </button>
            {message && <div className={styles.errorMessage}>{message}</div>}
        </form>
    );
};

const PagamentoPage = () => {
    const [cardClientSecret, setCardClientSecret] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('pix');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [isLoadingPix, setIsLoadingPix] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (selectedPaymentMethod === 'card' && !cardClientSecret) {
            fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentMethodType: 'card' }),
            })
            .then(res => res.json())
            .then(data => setCardClientSecret(data.clientSecret));
        }
    }, [selectedPaymentMethod, cardClientSecret]);

    const handleGeneratePix = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoadingPix(true);
        setErrorMessage('');

        try {
            const res = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    name: email,
                    cpf: cpf,
                    paymentMethodType: 'pix',
                }),
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                console.error("Erro da API:", data);
                throw new Error(data.error || 'Falha ao gerar o PIX.');
            }

            if (data.clientSecret) {
                router.push(`/pagamento/pix?cs=${data.clientSecret}`);
            }
        } catch (error) {
            console.error("Erro ao tentar gerar PIX:", error);
            setErrorMessage(error instanceof Error ? error.message : "Ocorreu um erro inesperado.");
        } finally {
            setIsLoadingPix(false);
        }
    };
    
    const appearance: StripeElementsOptions['appearance'] = {
      theme: 'night',
      variables: {
        colorPrimary: '#E7008A',
        colorBackground: '#0d1117',
        colorText: '#F0F0F0',
        colorDanger: '#ef4444',
        fontFamily: 'Poppins, sans-serif',
        borderRadius: '8px',
        spacingUnit: '4px',
      },
    };

    const options: StripeElementsOptions = {
        clientSecret: cardClientSecret,
        appearance,
    };

    return (
        <main className={styles.paymentPage}>
            <div className={styles.mainContainer}>
                <button onClick={() => router.back()} className={styles.backButton}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Voltar e editar
                </button>

                <div className={styles.summaryCard}>
                    <div className={styles.summaryIcon}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </div>
                    <p className={styles.productName}>AmityMemo</p>
                    <div className={styles.priceContainer}>
                        <span className={styles.oldPrice}>R$59,90</span>
                        <span className={styles.currentPrice}>R$29,90</span>
                    </div>
                    <div className={styles.planSelector}>
                        <FontAwesomeIcon icon={faInfinity} className={styles.planIcon} />
                        <span className={styles.planDetails}>Plano Para Sempre</span>
                        <span className={styles.planPrice}>R$29,90</span>
                        <FontAwesomeIcon icon={faChevronDown} className={styles.chevronDown} />
                    </div>
                    <div className={styles.promoBanner}>
                        <FontAwesomeIcon icon={faTag} />
                        <span>Economize 50%</span>
                    </div>
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>E-mail</label>
                    <input 
                        type="email" 
                        id="email" 
                        className={styles.input} 
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Forma de pagamento</label>
                    <div className={styles.paymentOptions}>
                        <input 
                            type="radio" 
                            id="pix" 
                            name="paymentMethod" 
                            value="pix" 
                            checked={selectedPaymentMethod === 'pix'}
                            onChange={() => setSelectedPaymentMethod('pix')}
                        />
                        <label htmlFor="pix">
                            <FontAwesomeIcon icon={faPix} className={styles.paymentIcon} />
                            <span className={styles.paymentMethodName}>PIX</span>
                        </label>

                        <input 
                            type="radio" 
                            id="card" 
                            name="paymentMethod" 
                            value="card" 
                            checked={selectedPaymentMethod === 'card'}
                            onChange={() => setSelectedPaymentMethod('card')}
                        />
                        <label htmlFor="card">
                            <FontAwesomeIcon icon={faCreditCard} className={styles.paymentIcon} />
                            <span className={styles.paymentMethodName}>Cartão</span>
                            <div className={styles.cardLogos}>
                                <FontAwesomeIcon icon={faCcVisa} size="lg" />
                                <FontAwesomeIcon icon={faCcMastercard} size="lg" />
                            </div>
                        </label>
                    </div>
                </div>

                {selectedPaymentMethod === 'card' && cardClientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}

                {selectedPaymentMethod === 'pix' && (
                    <form onSubmit={handleGeneratePix}>
                        <div className={styles.formGroup}>
                            <label htmlFor="cpf" className={styles.label}>CPF</label>
                            <input 
                                type="text" 
                                id="cpf" 
                                className={styles.input} 
                                placeholder="000.000.000-00"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                required 
                            />
                        </div>
                        <button type="submit" className="btn-primary" disabled={isLoadingPix} style={{ width: '100%', fontSize: '1.1rem', padding: '16px' }}>
                            {isLoadingPix ? <FontAwesomeIcon icon={faSpinner} spin /> : "Gerar PIX"}
                        </button>
                    </form>
                )}
                
                {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                
                <div className={styles.securePurchase}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span>Compra 100% segura</span>
                </div>

                <p className={styles.legalText}>
                    Realizando o pagamento você aceita nossos <Link href="/termos-de-uso">Termos de Uso</Link> e <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
                </p>
            </div>
        </main>
    );
};
  
export default PagamentoPage;