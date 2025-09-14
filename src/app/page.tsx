import Image from 'next/image';
import PricingSection from '@/components/PricingSection';
import FaqSection from '@/components/FaqSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCreditCard, faQrcode, faShareNodes, faShieldHeart, faGift, faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <>
      <section id="hero" className="hero-section">
        <div className="container hero-container">
          <div className="hero-text">
            <h1>Faça algo diferente.</h1>
            <h2 className="gradient-text">Transforme sentimentos em lembranças eternas.</h2>
            <p>No AmityMemo, cada data especial se torna uma página digital viva, repleta de suas fotos, vídeos e mensagens mais queridas.<br /><br />Crie, personalize e presenteie com um elo inquebrável de afeto.<br /><br /></p>
            <a href="#planos" className="btn-primary">Criar Minha Memória Agora</a>
            <div className="social-proof">
              <div className="user-avatars">
                <Image src="https://i.pravatar.cc/40?img=1" alt="Usuário 1" width={35} height={35} />
                <Image src="https://i.pravatar.cc/40?img=2" alt="Usuário 2" width={35} height={35} />
                <Image src="https://i.pravatar.cc/40?img=3" alt="Usuário 3" width={35} height={35} />
              </div>
              <p>+15.000 corações conectados pelo AmityMemo!</p>
            </div>
          </div>
          <div className="hero-image">
            <Image src="/img/hero-banner.webp" alt="App AmityMemo em um celular e laptop" width={550} height={500} />
          </div>
        </div>
      </section>

      <section id="steps" className="steps-section">
        <div className="container">
          <div className="steps-header">
            <h2>Criar sua memória AmityMemo é fácil e rápido!</h2>
            <p>Surpreenda quem você ama com uma lembrança digital que aquece o coração. Em apenas 4 passos, sua história ganha vida.</p>
            <a href="#planos" className="btn-secondary">Começar a eternizar!</a>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon"><FontAwesomeIcon icon={faPenToSquare} /></div>
              <h3>1. Conte sua história</h3>
              <p>Preencha os campos com fotos, vídeos, músicas e textos que marcam seus momentos especiais.</p>
            </div>
            <div className="step-card">
              <div className="step-icon"><FontAwesomeIcon icon={faCreditCard} /></div>
              <h3>2. Escolha seu plano</h3>
              <p>Selecione a melhor opção para você e realize o pagamento de forma segura.</p>
            </div>
            <div className="step-card">
              <div className="step-icon"><FontAwesomeIcon icon={faQrcode} /></div>
              <h3>3. Receba seu acesso</h3>
              <p>Entregamos um link exclusivo e um QR Code para sua memória digital.</p>
            </div>
            <div className="step-card">
              <div className="step-icon"><FontAwesomeIcon icon={faShareNodes} /></div>
              <h3>4. Compartilhe o amor</h3>
              <p>Envie para a pessoa amada e emocione com uma lembrança que dura para sempre.</p>
            </div>
          </div>
        </div>
      </section>

      <PricingSection />

      <section id="features" className="features-section">
        <div className="container">
          <h2>Confiança que une. Emoção que permanece.</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><FontAwesomeIcon icon={faShieldHeart} /></div>
              <h3>Confiança que inspira</h3>
              <p>Com mais de 10.000 memórias criadas em 2024, o AmityMemo é sinônimo de segurança e carinho para suas histórias.</p>
              <div className="rating">
                Nota média: 4.9/5 ★★★★★
              </div>
              <p>Aprovação de mais de 95% dos nossos clientes satisfeitos.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FontAwesomeIcon icon={faGift} /></div>
              <h3>Presente digital, impacto real</h3>
              <p>O AmityMemo transcende o físico, criando experiências digitais que emocionam de verdade e se espalham pelas redes sociais.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FontAwesomeIcon icon={faGlobe} /></div>
              <h3>Conectando corações globalmente</h3>
              <p>Nossas memórias únicas são acessadas em mais de 30 países, provando que o amor não tem fronteiras.</p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />
    </>
  );
}