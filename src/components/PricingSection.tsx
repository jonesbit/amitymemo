'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faStar, faCheck, faXmark, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

const PricingSection = () => {
    const [activePlan, setActivePlan] = useState('unico');

    return (
        <section id="planos" className="pricing-section">
            <div className="container">
                <div className="pricing-header">
                    <h2>Escolha o plano perfeito para o seu amor:</h2>
                    <p>Para sempre <span className="infinity-icon">∞</span> ou por um tempo, a escolha é sua.</p>
                </div>
                <div className="pricing-toggle">
                    <button 
                        className={`toggle-btn ${activePlan === 'unico' ? 'active' : ''}`} 
                        onClick={() => setActivePlan('unico')}
                    >
                        Plano Único
                    </button>
                    <button 
                        className={`toggle-btn ${activePlan === 'anual' ? 'active' : ''}`} 
                        onClick={() => setActivePlan('anual')}
                    >
                        Anual
                    </button>
                </div>
                <div className="secure-payment-info">
                    <FontAwesomeIcon icon={faLock} />
                    <p>Plano de pagamento 100% seguro com garantia de devolução do dinheiro</p>
                </div>
                <div className="pricing-card-wrapper">
                    <div className={`pricing-card popular plan-unico ${activePlan === 'unico' ? 'active-plan' : ''}`}>
                        <div className="popular-badge">
                            <FontAwesomeIcon icon={faStar} className="star"/> Mais Popular
                        </div>
                        <div className="plan-title">
                            <div className="plan-icon infinity-icon-bg">∞</div> <h3>Plano Para Sempre</h3>
                        </div>
                        <div className="price">
                            <span className="old-price">R$59,90</span>
                            <span className="current-price">R$39,90</span> <span className="price-period">Por usuário, uma única compra</span>
                        </div>
                        <div className="plan-features">
                            <p className="features-intro">O plano contém:</p>
                            <ul>
                                <li><FontAwesomeIcon icon={faCheck} className="fa-check" /> Acesso vitalício à memória</li>
                                <li><FontAwesomeIcon icon={faCheck} className="fa-check" /> Galeria de fotos ilimitada</li>
                                <li><FontAwesomeIcon icon={faCheck} className="fa-check" /> Vídeo de até 5 minutos</li>
                                <li><FontAwesomeIcon icon={faCheck} className="fa-check" /> Link e QR Code personalizados</li>
                                <li><FontAwesomeIcon icon={faCheck} className="fa-check" /> Suporte prioritário</li>
                                <li><FontAwesomeIcon icon={faCheck} className="fa-check" /> Sem anúncios</li>
                            </ul>
                        </div>
                        <a href="#" className="btn-primary">Escolher Plano Único</a>
                    </div>

                    <div className={`pricing-card plan-anual ${activePlan === 'anual' ? 'active-plan' : ''}`}>
                        <div className="plan-title">
                            <div className="plan-icon"><FontAwesomeIcon icon={faCalendarDays} className="fa-calendar-days"/></div>
                            <h3>Plano Anual</h3>
                        </div>
                        <div className="price">
                            <span className="current-price">R$19,90<span className="price-per-month"> / mês</span></span>
                            <span className="price-period">Cobrado anualmente: R$238,80</span>
                        </div>
                        <div className="plan-features">
                            <p className="features-intro">O plano contém:</p>
                            <ul>
                                <li><FontAwesomeIcon icon={faCheck} className="fa-check" /> Acesso à memória por 1 ano</li>
                                <li><FontAwesomeIcon icon={faCheck} className="fa-check" /> Galeria de fotos limitada (50 fotos)</li>
                                <li><FontAwesomeIcon icon={faCheck} className="fa-check" /> Vídeo de até 2 minutos</li>
                                <li><FontAwesomeIcon icon={faCheck} className="fa-check" /> Link e QR Code padrões</li>
                                <li><FontAwesomeIcon icon={faCheck} className="fa-check" /> Suporte padrão</li>
                                <li><FontAwesomeIcon icon={faXmark} className="fa-xmark" /> Com anúncios</li>
                            </ul>
                        </div>
                        <a href="#" className="btn-primary">Escolher Plano Anual</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;