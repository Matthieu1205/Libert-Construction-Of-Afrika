import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import './Home.css';

const STATS = [
  { value: '500+',   label: 'Terrains vendus'    },
  { value: '4',      label: 'Villes couvertes'    },
  { value: '1 500+', label: 'Clients satisfaits'  },
  { value: '10 ans', label: "D'expérience"        },
];

const IMG_BASSAM  = '/WhatsApp Image 2026-05-14 at 12.52.02.jpeg';
const IMG_YAMOUS  = '/WhatsApp Image 2026-05-14 at 12.52.02 (1).jpeg';
const IMG_BONOUA  = '/WhatsApp Image 2026-05-14 at 12.52.03.jpeg';
const IMG_FLYER   = '/WhatsApp Image 2026-05-14 at 12.50.42.jpeg';

const PROPERTIES = [
  { id: 1, name: 'Parcelle Résidentielle', city: 'Sikensi',      area: 400, price: 5000000,  badge: 'Populaire',      image: IMG_FLYER   },
  { id: 2, name: 'Terrain Prestige',       city: 'Grand-Bassam', area: 600, price: 10000000, badge: 'Disponible',     image: IMG_BASSAM  },
  { id: 3, name: 'Yamoussoukro Avenir',    city: 'Yamoussoukro', area: 500, price: 7000000,  badge: 'Offre spéciale', image: IMG_YAMOUS  },
  { id: 4, name: 'Bonoua Résidence 500',   city: 'Bonoua',       area: 500, price: 5000000,  badge: 'Disponible',     image: IMG_BONOUA  },
];

const CITIES = [
  { name: 'Sikensi',      desc: 'Proche d\'Abidjan, idéal pour résidence principale.' },
  { name: 'Yamoussoukro', desc: 'Capitale politique, fort potentiel d\'investissement.' },
  { name: 'Grand-Bassam', desc: 'Ville historique, bord de mer, cadre exceptionnel.' },
  { name: 'Bonoua',       desc: 'Ville en plein essor, terrains très accessibles.' },
];

const TESTIMONIALS = [
  { name: 'Konan Jean-Baptiste', city: 'Abidjan',      text: "Liberté Construction m'a aidé à acquérir mon terrain à Grand-Bassam. Le processus était simple et transparent. Je recommande vivement.", stars: 5 },
  { name: 'Aya Coulibaly',       city: 'Yamoussoukro', text: "Grâce à leur système de paiement mensuel, j'ai pu réaliser mon rêve d'avoir un terrain. Une équipe très professionnelle.", stars: 5 },
  { name: 'Serge Koffi',         city: 'Bonoua',       text: "Service impeccable ! L'équipe m'a guidé à chaque étape. Je construis ma maison sur mon terrain de Bonoua.", stars: 5 },
];

const Arrow = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>);
const Check = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>);
const Pin   = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>);
const Search= () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const Star  = ({ on }) => (<svg width="14" height="14" viewBox="0 0 24 24" fill={on ? 'var(--gold)' : 'none'} stroke="var(--gold)" strokeWidth="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>);

export default function Home() {
  return (
    <main className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="container hero__content">
          <div className="hero__text">
            <span className="tag" style={{background:'rgba(212,146,10,0.2)',color:'var(--gold-light)'}}>Côte d'Ivoire</span>
            <h1>Trouvez votre terrain<br /><span>de rêve en Afrique</span></h1>
            <p>Liberté Construction Of Afrika — l'immobilier de confiance en Côte d'Ivoire. Terrains sécurisés et paiements flexibles adaptés à votre budget.</p>
            <div className="hero__actions">
              <Link to="/terrains" className="btn btn-gold btn-lg">Voir les terrains <Arrow /></Link>
              <Link to="/contact" className="btn btn-outline-white btn-lg">Nous contacter</Link>
            </div>
          </div>
          <div className="hero__search">
            <h3>Trouver un terrain</h3>
            <div className="hero__form">
              {[['Ville',['Toutes les villes','Sikensi','Yamoussoukro','Grand-Bassam','Bonoua']],
                ['Superficie',['Toutes surfaces','400 m²','500 m²','600 m²']],
                ['Budget',['Tous budgets','5 000 000 FCFA','7 000 000 FCFA','10 000 000 FCFA']]
              ].map(([lbl, opts]) => (
                <div className="hero__field" key={lbl}>
                  <label>{lbl}</label>
                  <select>{opts.map(o => <option key={o}>{o}</option>)}</select>
                </div>
              ))}
              <Link to="/terrains" className="btn btn-primary"><Search /> Rechercher</Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="container stats__grid">
          {STATS.map((s, i) => (
            <div className="stats__item" key={i}><strong>{s.value}</strong><span>{s.label}</span></div>
          ))}
        </div>
      </section>

      {/* TERRAINS POPULAIRES */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <div><p className="section__pretitle">— Populaire</p><h2 className="section-title">Terrains les plus<br /><span>demandés</span></h2></div>
            <Link to="/terrains" className="btn btn-outline">Voir tout <Arrow /></Link>
          </div>
          <div className="props__grid">
            {PROPERTIES.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <section className="section" style={{background:'var(--white)'}}>
        <div className="container">
          <div className="section__header--center">
            <p className="section__pretitle">— Nos offres</p>
            <h2 className="section-title">Tarifs <span>transparents</span></h2>
            <p className="section-subtitle">Des parcelles pour tous les budgets, avec des conditions de paiement flexibles.</p>
          </div>
          <div className="pricing__grid">
            {[
              { area:'400 m²', price:'5 000 000', featured:false },
              { area:'500 m²', price:'7 000 000', featured:true  },
              { area:'600 m²', price:'10 000 000',featured:false },
            ].map((p, i) => (
              <div className={`pricing__card${p.featured ? ' pricing__card--featured' : ''}`} key={i}>
                {p.featured && <div className="pricing__badge">Le plus populaire</div>}
                <div className="pricing__area">{p.area}</div>
                <div className="pricing__price">{p.price} <span>FCFA</span></div>
                <ul className="pricing__features">
                  {['Frais de dossier : 150 000 FCFA','Apport initial : 3 000 000 FCFA','Paiement mensuel ou journalier','Titre foncier sécurisé'].map((f,j)=>(
                    <li key={j}><Check />{f}</li>
                  ))}
                </ul>
                <Link to="/contact" className={`btn ${p.featured?'btn-gold':'btn-outline'} btn-lg`} style={{width:'100%',justifyContent:'center'}}>Réserver maintenant</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VILLES */}
      <section className="section">
        <div className="container">
          <div className="section__header--center">
            <p className="section__pretitle">— Zones</p>
            <h2 className="section-title">Nos zones de <span>commercialisation</span></h2>
          </div>
          <div className="cities__grid">
            {CITIES.map((c,i) => (
              <div className="city__card" key={i}>
                <div className="city__icon"><Pin /></div>
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
                <Link to="/terrains" className="city__link">Voir terrains <Arrow /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section className="section" style={{background:'var(--white)'}}>
        <div className="container why__inner">
          <div className="why__text">
            <p className="section__pretitle">— Pourquoi nous choisir</p>
            <h2 className="section-title">La confiance avant<br /><span>tout</span></h2>
            <p className="why__desc">Depuis plus de 10 ans, nous accompagnons des centaines de familles ivoiriennes dans l'acquisition de leur terrain. Notre engagement : transparence, sécurité et satisfaction client.</p>
            <ul className="why__list">
              {['Titres fonciers sécurisés','Paiements échelonnés sans intérêts','Équipe présente sur le terrain','Suivi personnalisé de votre dossier','Plus de 1 500 clients satisfaits'].map((item,i)=>(
                <li key={i}><span className="why__check"><Check /></span>{item}</li>
              ))}
            </ul>
            <Link to="/a-propos" className="btn btn-primary btn-lg">En savoir plus <Arrow /></Link>
          </div>
          <div className="why__visual">
            <div className="why__card--main">
              <img src="/logo.jpeg" alt="LCA" />
              <div><strong>Liberté Construction Of Afrika</strong><span>"Entrez dans votre nouvelle vie"</span></div>
            </div>
            <div className="why__stats">
              <div className="why__stat"><strong>150 000</strong><span>FCFA de frais de dossier</span></div>
              <div className="why__stat"><strong>3 M FCFA</strong><span>d'apport initial seulement</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="section">
        <div className="container">
          <div className="section__header--center">
            <p className="section__pretitle">— Témoignages</p>
            <h2 className="section-title">Ce que disent <span>nos clients</span></h2>
          </div>
          <div className="testi__grid">
            {TESTIMONIALS.map((t,i)=>(
              <div className="testi__card" key={i}>
                <div className="testi__stars">{[...Array(5)].map((_,s)=><Star key={s} on={s<t.stars} />)}</div>
                <p>"{t.text}"</p>
                <div className="testi__author">
                  <div className="testi__avatar">{t.name.charAt(0)}</div>
                  <div><strong>{t.name}</strong><span>{t.city}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-final">
        <div className="container cta-final__inner">
          <h2>Prêt à acquérir votre terrain ?</h2>
          <p>Contactez-nous dès aujourd'hui et faites le premier pas vers votre nouvelle vie.</p>
          <div className="cta-final__actions">
            <Link to="/contact" className="btn btn-gold btn-lg">Démarrer maintenant <Arrow /></Link>
            <a href="https://wa.me/2250710891040" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white btn-lg">WhatsApp direct</a>
          </div>
        </div>
      </section>

    </main>
  );
}
