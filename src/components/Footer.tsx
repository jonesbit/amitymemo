import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container pre-footer">
        <h3>Precisa de ajuda? Fale conosco!</h3>
        <a href="#" className="instagram-btn" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} /> Fale conosco no Instagram
        </a>
      </div>
      <div className="main-footer-bg">
        <div className="container footer-container">
          <div className="footer-about">
            <Link href="/" className="logo-link">
              <Image src="/img/logo.png" alt="AmityMemo Logo" className="footer-logo" width={180} height={45} />
            </Link>
            <p>AmityMemo: A plataforma perfeita para criar e eternizar lembranças digitais únicas para quem você mais ama.</p>
          </div>
          <div className="footer-links">
            <h4>Siga nas</h4>
            <ul>
              <li><a href="#" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTiktok} /> TikTok</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Informações Legais</h4>
            <ul>
              <li><Link href="/termos-de-uso">Termos de Uso</Link></li>
              <li><Link href="/politica-de-privacidade">Política de Privacidade</Link></li>
            </ul>
          </div>
          <div className="footer-payment">
            <p>Pagamento seguro por</p>
            <Image src="/img/stripe_logo.png" alt="Stripe Logo" className="stripe-logo" width={100} height={40}/>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>
            <span className="copy">&copy; 2025 AmityMemo. Todos os direitos reservados.</span><br />
            <span className="cnpj">CNPJ: 00.000.000/0001-00</span>
          </p>
          <p className="site-by">
            Feito com ❤️ por 
            <Link href="https://elvros.com" passHref legacyBehavior>
              <a className="nomeElvros" target="_blank" rel="noopener noreferrer">
                Elvros
              </a>
            </Link>
          </p>
          <a href="#hero" className="back-to-top">Voltar ao topo <FontAwesomeIcon icon={faArrowUp} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;