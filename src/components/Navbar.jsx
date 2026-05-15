import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
  </svg>
);

const navLinks = [
  { to: '/',            label: 'Accueil'      },
  { to: '/a-propos',   label: 'À Propos'     },
  { to: '/terrains',   label: 'Terrains'     },
  { to: '/construction', label: 'Construction' },
  { to: '/contact',    label: 'Contact'      },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location                = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [location]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src="/logo.jpeg" alt="LCA" />
          <span>
            <strong>Liberté</strong>
            <em>Construction Of Afrika</em>
          </span>
        </Link>
        <nav className="navbar__nav">
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}
              className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <a href="tel:+2250710891040" className="navbar__cta btn btn-primary">
          <PhoneIcon /> Nous appeler
        </a>
        <button className="navbar__burger" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      <div className={`navbar__mobile${open ? ' navbar__mobile--open' : ''}`}>
        <nav>
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}
              className={({ isActive }) => isActive ? 'navbar__mlink navbar__mlink--active' : 'navbar__mlink'}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <a href="tel:+2250710891040" className="btn btn-primary btn-lg"><PhoneIcon /> Appeler maintenant</a>
      </div>
    </header>
  );
}
