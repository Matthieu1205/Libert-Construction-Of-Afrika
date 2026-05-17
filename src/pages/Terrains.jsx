import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { useData } from '../contexts/DataContext';
import './Terrains.css';

const Arrow = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>);

const CITIES = ['Toutes','Sikensi','Grand-Bassam','Yamoussoukro','Bonoua'];
const AREAS  = ['Toutes','400 m²','500 m²','600 m²'];

export default function Terrains() {
  const { data } = useData();
  const { terrains, conditions, settings } = data;

  const [city, setCity] = useState('Toutes');
  const [area, setArea] = useState('Toutes');

  const filtered = terrains.filter(p => {
    const cOk = city === 'Toutes' || p.city === city;
    const aOk = area === 'Toutes' || p.area === parseInt(area);
    return cOk && aOk;
  });

  const waLink = `https://wa.me/${settings.whatsapp_number}`;

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
          {[
            ['Frais de dossier', conditions.frais],
            ['Apport initial',   conditions.apport],
            ['Solde',           conditions.solde],
          ].map(([l, v]) => (
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
                {CITIES.map(c => <button key={c} className={`chip${city===c?' chip--on':''}`} onClick={() => setCity(c)}>{c}</button>)}
              </div>
            </div>
            <div className="filter-group">
              <label>Superficie</label>
              <div className="filter-chips">
                {AREAS.map(a => <button key={a} className={`chip${area===a?' chip--on':''}`} onClick={() => setArea(a)}>{a}</button>)}
              </div>
            </div>
            <div className="filter-count"><strong>{filtered.length}</strong> terrain{filtered.length>1?'s':''} trouvé{filtered.length>1?'s':''}</div>
          </div>

          {filtered.length > 0
            ? <div className="terrains-grid">{filtered.map(p => <PropertyCard key={p.id} property={p} />)}</div>
            : (
              <div className="terrains-empty">
                <p>Aucun terrain ne correspond à vos critères.</p>
                <button className="btn btn-outline" onClick={() => { setCity('Toutes'); setArea('Toutes'); }}>Réinitialiser</button>
              </div>
            )
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
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg">WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  );
}
