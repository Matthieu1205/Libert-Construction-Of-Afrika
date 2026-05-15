import { Link } from 'react-router-dom';
import './About.css';

const Arrow = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>);
const Check = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>);

const VALEURS = [
  { title:'Confiance',  desc:"Nous bâtissons des relations durables fondées sur la transparence et l'honnêteté." },
  { title:'Efficacité', desc:'Des procédures rapides et claires pour que vous obteniez votre terrain sans délai.' },
  { title:'Proximité',  desc:'Une équipe à votre écoute, présente sur le terrain pour vous accompagner.' },
  { title:'Excellence', desc:'Nous visons la qualité dans chaque transaction et chaque service proposé.' },
];

const SERVICES = ['Vente de terrains résidentiels','Construction de bâtiments','Transport de matériaux','Entretien de bureaux','Import / Export','Conseil en investissement immobilier'];

export default function About() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="tag">Notre histoire</span>
          <h1 style={{marginTop:12}}>À propos de <span>Liberté Construction</span></h1>
          <p>Une entreprise ivoirienne au service de vos projets immobiliers depuis plus de 10 ans.</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{padding:'80px 0'}}>
        <div className="container about-mv">
          <div className="mv-card mv-card--green">
            <h3>Notre Mission</h3>
            <p>Rendre l'accès à la propriété foncière possible pour chaque Ivoirien, quelle que soit sa situation financière, grâce à des solutions de paiement flexibles et des terrains sécurisés.</p>
          </div>
          <div className="mv-card mv-card--light">
            <h3>Notre Vision</h3>
            <p>Devenir le leader de l'immobilier abordable en Côte d'Ivoire en accompagnant des milliers de familles dans l'acquisition de leur espace de vie et la réalisation de leur avenir.</p>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="about-story">
        <div className="container about-story__grid">
          <div className="about-story__text">
            <p className="section__pretitle">— Notre histoire</p>
            <h2 className="section-title" style={{color:'var(--white)'}}>Plus de <span style={{color:'var(--gold)'}}>10 ans</span> au service de vos rêves</h2>
            <p>Liberté Construction Of Afrika est née de la volonté de ses fondateurs de démocratiser l'accès à la propriété en Côte d'Ivoire. Face aux difficultés que rencontrent de nombreuses familles, l'entreprise a développé des solutions innovantes et accessibles.</p>
            <p>Aujourd'hui, avec plus de 1 500 clients satisfaits et des terrains disponibles dans quatre villes stratégiques, nous continuons de grandir pour mieux vous servir.</p>
            <ul className="about-story__list">
              {['Plus de 500 terrains vendus','Présence dans 4 villes','1 500+ clients satisfaits','Titres fonciers sécurisés'].map((item,i)=>(
                <li key={i}><span className="why__check"><Check /></span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="about-story__visual">
            <img src="/logo.jpeg" alt="LCA" />
            <div className="about-story__badge"><strong>"Entrez dans votre nouvelle vie"</strong></div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section style={{padding:'80px 0'}}>
        <div className="container">
          <div className="section__header--center">
            <p className="section__pretitle">— Ce qui nous définit</p>
            <h2 className="section-title">Nos <span>valeurs</span></h2>
          </div>
          <div className="values__grid">
            {VALEURS.map((v,i)=>(
              <div className="value__card" key={i}>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{padding:'80px 0', background:'var(--off-white)'}}>
        <div className="container about-services">
          <div>
            <p className="section__pretitle">— Ce que nous faisons</p>
            <h2 className="section-title">Nos <span>services</span></h2>
            <p style={{color:'var(--dark-gray)',marginTop:12,lineHeight:1.7,maxWidth:480}}>Au-delà de la vente de terrains, Liberté Construction Of Afrika offre un éventail de services pour accompagner tous vos projets.</p>
            <ul className="services__list">
              {SERVICES.map((s,i)=>(
                <li key={i}><span className="why__check"><Check /></span>{s}</li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn-primary btn-lg" style={{marginTop:28}}>Nous contacter <Arrow /></Link>
          </div>
          <div className="about-services__img">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
          </div>
        </div>
      </section>
    </main>
  );
}
