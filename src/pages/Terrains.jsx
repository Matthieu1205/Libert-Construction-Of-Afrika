import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import './Terrains.css';

const Arrow = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>);

const B  = '/terrain-bassam.jpeg';
const Y  = '/terrain-yamoussoukro.jpeg';
const BN = '/terrain-bonoua.jpeg';
const F  = '/flyer-lca.jpeg';

const ALL = [
  { id:1,  name:'Parcelle Résidentielle A1',  city:'Sikensi',      area:400, price:5000000,  badge:'Disponible',     image: F  },
  { id:2,  name:'Parcelle Résidentielle A2',  city:'Sikensi',      area:500, price:7000000,  badge:'Disponible',     image: F  },
  { id:3,  name:'Grand Terrain Sikensi',      city:'Sikensi',      area:600, price:10000000, badge:'Populaire',      image: F  },
  { id:4,  name:'Bassam Prestige 400',        city:'Grand-Bassam', area:400, price:5000000,                          image: B  },
  { id:5,  name:'Bassam Prestige 600',        city:'Grand-Bassam', area:600, price:10000000, badge:'Offre spéciale', image: B  },
  { id:6,  name:'Bassam Bord de Mer',         city:'Grand-Bassam', area:500, price:7000000,                          image: B  },
  { id:7,  name:'Yamoussoukro Avenir 400',    city:'Yamoussoukro', area:400, price:6000000,  badge:'Disponible',     image: Y  },
  { id:8,  name:'Yamoussoukro Avenir 500',    city:'Yamoussoukro', area:500, price:7000000,                          image: Y  },
  { id:9,  name:'Grand Terrain Yamoussoukro', city:'Yamoussoukro', area:600, price:10000000, badge:'Populaire',      image: Y  },
  { id:10, name:'Bonoua Résidence 500',       city:'Bonoua',       area:500, price:5000000,  badge:'Disponible',     image: BN },
  { id:11, name:'Bonoua Parcelle RIA',        city:'Bonoua',       area:400, price:5000000,                          image: BN },
  { id:12, name:'Grande Parcelle Bonoua',     city:'Bonoua',       area:600, price:10000000,                         image: BN },
];

const CITIES = ['Toutes','Sikensi','Grand-Bassam','Yamoussoukro','Bonoua'];
const AREAS  = ['Toutes','400 m²','500 m²','600 m²'];

export default function Terrains() {
  const [city, setCity] = useState('Toutes');
  const [area, setArea] = useState('Toutes');

  const filtered = ALL.filter(p => {
    const cOk = city === 'Toutes' || p.city === city;
    const aOk = area === 'Toutes' || p.area === parseInt(area);
    return cOk && aOk;
  });

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="tag">Catalogue</span>
          <h1 style={{marginTop:12}}>Terrains <span>disponibles</span></h1>
          <p>Parcourez notre catalogue de terrains en Côte d'Ivoire — paiements flexibles.</p>
        </div>
      </section>

      <section className="conditions">
        <div className="container conditions__grid">
          {[['Frais de dossier','150 000 FCFA'],['Apport initial','3 000 000 FCFA'],['Solde','Paiement mensuel ou journalier']].map(([l,v])=>(
            <div className="condition__item" key={l}><span>{l}</span><strong>{v}</strong></div>
          ))}
        </div>
      </section>

      <section style={{padding:'60px 0 80px'}}>
        <div className="container">
          <div className="terrains-filters">
            <div className="filter-group">
              <label>Ville</label>
              <div className="filter-chips">
                {CITIES.map(c=><button key={c} className={`chip${city===c?' chip--on':''}`} onClick={()=>setCity(c)}>{c}</button>)}
              </div>
            </div>
            <div className="filter-group">
              <label>Superficie</label>
              <div className="filter-chips">
                {AREAS.map(a=><button key={a} className={`chip${area===a?' chip--on':''}`} onClick={()=>setArea(a)}>{a}</button>)}
              </div>
            </div>
            <div className="filter-count"><strong>{filtered.length}</strong> terrain{filtered.length>1?'s':''} trouvé{filtered.length>1?'s':''}</div>
          </div>

          {filtered.length > 0
            ? <div className="terrains-grid">{filtered.map(p=><PropertyCard key={p.id} property={p} />)}</div>
            : <div className="terrains-empty">
                <p>Aucun terrain ne correspond à vos critères.</p>
                <button className="btn btn-outline" onClick={()=>{setCity('Toutes');setArea('Toutes');}}>Réinitialiser</button>
              </div>
          }
        </div>
      </section>

      <section style={{background:'var(--off-white)',borderTop:'1px solid var(--light-gray)',padding:'48px 0'}}>
        <div className="container terrains-cta">
          <div>
            <h2>Vous ne trouvez pas ce que vous cherchez ?</h2>
            <p>Contactez-nous — nous avons peut-être d'autres terrains disponibles.</p>
          </div>
          <div style={{display:'flex',gap:12,flexShrink:0}}>
            <Link to="/contact" className="btn btn-primary btn-lg">Demander un terrain <Arrow /></Link>
            <a href="https://wa.me/2250710891040" target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg">WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  );
}
