"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faCheckCircle, faSpinner, faArrowLeft, faShoppingCart, faTag, faInfinity, faChevronDown, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcMastercard, faPix } from '@fortawesome/free-brands-svg-icons';
import styles from './page.module.css';

import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
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
            confirmParams: { return_url: `${window.location.origin}/pagamento-concluido` },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message || "Ocorreu um erro desconhecido.");
        } else {
            setMessage("Um erro inesperado ocorreu.");
        }
        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit" className={styles.buyButton} style={{ marginTop: '24px' }}>
                {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Comprar agora"}
                <FontAwesomeIcon icon={faShoppingCart} />
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
    const [isLoading, setIsLoading] = useState(false);
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

    const handleAlternativePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        
        const paymentType = selectedPaymentMethod;

        try {
            const res = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    name: email,
                    cpf: cpf,
                    paymentMethodType: paymentType,
                }),
            });
            
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || `Falha ao gerar ${paymentType}.`);
            
            if (data.clientSecret) {
                if (paymentType === 'pix') {
                    router.push(`/pagamento/pix?cs=${data.clientSecret}`);
                } else if (paymentType === 'boleto') {
                    const stripe = await stripePromise;
                    if (!stripe) return;

                    const { error, paymentIntent } = await stripe.confirmBoletoPayment(data.clientSecret, {
                        payment_method: {
                            boleto: { tax_id: cpf },
                            billing_details: { name: email, email: email, address: { line1: 'N/A', city: 'N/A', state: 'N/A', postal_code: '00000000', country: 'BR' } },
                        },
                    });

                    if (error) throw new Error(error.message);
                    
                    const nextAction = paymentIntent?.next_action as any;
                    if (nextAction && nextAction.boleto_display_details) {
                        const boletoUrl = nextAction.boleto_display_details.pdf;
                        if (boletoUrl) window.open(boletoUrl, '_blank');
                        router.push('/pagamento-concluido');
                    }
                }
            }
        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const appearance: StripeElementsOptions['appearance'] = {
      theme: 'night',
      variables: { 
        colorPrimary: '#22d3ee', 
        colorBackground: '#1A1A2E', 
        colorText: '#F0F0F0',
        colorDanger: '#ef4444',
        fontFamily: 'Poppins, sans-serif',
        borderRadius: '8px',
        spacingUnit: '4px',
      },
    };

    const options: StripeElementsOptions = { clientSecret: cardClientSecret, appearance };

    return (
        <main className={styles.paymentPage}>
            <div className={styles.mainContainer}>
                <div className={styles.summaryCard}>
                    <button onClick={() => router.back()} className={styles.iconBackButton}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
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
                    <input type="email" id="email" className={styles.input} placeholder="seuemail@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Forma de pagamento</label>
                    <div className={styles.paymentOptions}>
                        <input type="radio" id="pix" name="paymentMethod" value="pix" checked={selectedPaymentMethod === 'pix'} onChange={() => setSelectedPaymentMethod('pix')} />
                        <label htmlFor="pix">
                            <div className={styles.optionHeader}>
                                <span className={styles.radioCircle}></span>
                                <FontAwesomeIcon icon={faPix} className={styles.paymentIcon} />
                                <span className={styles.paymentMethodName}>PIX</span>
                            </div>
                            {selectedPaymentMethod === 'pix' && (
                                <form onSubmit={handleAlternativePayment} className={styles.nestedForm}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="cpf" className={styles.label}>CPF</label>
                                        <input type="text" id="cpf" className={styles.input} placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                                    </div>
                                    <button type="submit" className={styles.buyButton} disabled={isLoading}>
                                        {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Comprar agora"}
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                    </button>
                                </form>
                            )}
                        </label>
                        <input type="radio" id="card" name="paymentMethod" value="card" checked={selectedPaymentMethod === 'card'} onChange={() => setSelectedPaymentMethod('card')} />
                        <label htmlFor="card">
                            <div className={styles.optionHeader}>
                                <span className={styles.radioCircle}></span>
                                <FontAwesomeIcon icon={faCreditCard} className={styles.paymentIcon} />
                                <span className={styles.paymentMethodName}>Cartão / Boleto</span>
                                <div className={styles.cardLogos}>
                                    <FontAwesomeIcon icon={faCcVisa} size="lg" />
                                    <FontAwesomeIcon icon={faCcMastercard} size="lg" />
                                </div>
                            </div>
                            {selectedPaymentMethod === 'card' && (
                                <div className={styles.nestedForm}>
                                    {cardClientSecret ? (
                                        <Elements options={options} stripe={stripePromise}>
                                            <CheckoutForm />
                                        </Elements>
                                    ) : (
                                        <FontAwesomeIcon icon={faSpinner} spin />
                                    )}
                                </div>
                            )}
                        </label>
                    </div>
                </div>
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