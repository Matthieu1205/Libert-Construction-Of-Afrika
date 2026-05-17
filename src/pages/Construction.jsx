import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import './Construction.css';

const Arrow = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>);
const Check = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>);

export default function Construction() {
  const { data } = useData();
  const { services_btp, process, settings } = data;
  const waLink = `https://wa.me/${settings.whatsapp_number}`;

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="tag">BTP</span>
          <h1 style={{marginTop:12}}>Services de <span>Construction</span></h1>
          <p>De l'idée au bâtiment — nous concrétisons vos projets de construction en Côte d'Ivoire.</p>
        </div>
      </section>

      {/* Services */}
      <section style={{padding:'80px 0'}}>
        <div className="container">
          <div className="section__header--center">
            <p className="section__pretitle">— Ce que nous faisons</p>
            <h2 className="section-title">Nos services <span>de construction</span></h2>
          </div>
          <div className="const-services">
            {services_btp.map((s, i) => (
              <div className="const-service" key={i}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul>{s.items.map((item, j) => <li key={j}><Check />{item}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section style={{background:'var(--green-dark)',padding:'80px 0'}}>
        <div className="container">
          <div className="section__header--center">
            <p className="section__pretitle" style={{color:'var(--gold-light)'}}>— Comment ça marche</p>
            <h2 className="section-title" style={{color:'var(--white)'}}>Notre <span style={{color:'var(--gold)'}}>processus</span></h2>
          </div>
          <div className="const-process">
            {process.map((p, i) => (
              <div className="const-process__item" key={i}>
                <div className="const-step">{p.step}</div>
                <div><h3>{p.title}</h3><p>{p.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section style={{padding:'80px 0'}}>
        <div className="container">
          <div className="section__header--center">
            <p className="section__pretitle">— Portfolio</p>
            <h2 className="section-title">Nos <span>réalisations</span></h2>
            <p className="section-subtitle">Quelques projets réalisés par nos équipes.</p>
          </div>
          <div className="const-gallery">
            {[...Array(6)].map((_, i) => (
              <div className="const-gallery__item" key={i}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
                <span>Votre photo ici</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'var(--green)',padding:'60px 0'}}>
        <div className="container const-cta">
          <div>
            <h2>Vous avez un projet de construction ?</h2>
            <p>Parlez-nous de votre projet — nous vous proposons une solution adaptée à votre budget.</p>
          </div>
          <div style={{display:'flex',gap:12,flexShrink:0}}>
            <Link to="/contact" className="btn btn-gold btn-lg">Demander un devis <Arrow /></Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-white btn-lg">WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  );
}
