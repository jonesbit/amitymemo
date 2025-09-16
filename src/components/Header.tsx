import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link href="/" className="logo-link">
            <Image 
              src="/img/logoh1.png" 
              alt="AmityMemo Logo" 
              className="header-logo" 
              width={180} 
              height={40}
              priority
            />
            <span className="logo-text">Amity<span className="logo-text-highlight">Memo</span></span>
          </Link>
          <ul className="nav-links">
            <li><a href="#" aria-label="Mudar Idioma"><FontAwesomeIcon icon={faGlobe} className="language-icon" /></a></li>
            <li className="nav-separator" aria-hidden="true">|</li>
            <li><Link href="/#faq">FAQ</Link></li>
            <li className="nav-separator" aria-hidden="true">|</li>
            <li><Link href="/create">Planos</Link></li>
            <li className="nav-separator" aria-hidden="true">|</li>
            <li><a href="#" className="login-link"><FontAwesomeIcon icon={faRightToBracket} /> Login</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;