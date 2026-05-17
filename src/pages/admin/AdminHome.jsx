import { useState } from 'react';
import { useData } from '../../contexts/DataContext';

export default function AdminHome() {
  const { data, update } = useData();
  const [tab, setTab] = useState('stats');

  const TABS = [
    { id:'stats',       label:'Statistiques' },
    { id:'temoignages', label:'Témoignages' },
    { id:'tarifs',      label:'Tarifs & Villes' },
    { id:'conditions',  label:'Conditions' },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header"><h2>Page Accueil</h2></div>
      <div className="admin-tabs">
        {TABS.map(t => (
          <button key={t.id} className={`admin-tab${tab===t.id?' admin-tab--active':''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'stats'       && <StatsTab       data={data} update={update} />}
      {tab === 'temoignages' && <TestimonialsTab data={data} update={update} />}
      {tab === 'tarifs'      && <TarifsTab       data={data} update={update} />}
      {tab === 'conditions'  && <ConditionsTab   data={data} update={update} />}
    </div>
  );
}

/* ---- Stats ---- */
function StatsTab({ data, update }) {
  const [stats, setStats] = useState(data.stats);
  const [saved, setSaved] = useState(false);

  const save = () => { update('stats', stats); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="admin-section">
      <p className="admin-section-title">Chiffres clés (bandeau sous le héros)</p>
      {stats.map((s, i) => (
        <div key={i} className="admin-form-row" style={{marginBottom:10}}>
          <div className="admin-field">
            <label>Valeur</label>
            <input value={s.value} onChange={e => setStats(prev => prev.map((x,j) => j===i ? {...x,value:e.target.value} : x))} placeholder="ex: 500+" />
          </div>
          <div className="admin-field">
            <label>Libellé</label>
            <input value={s.label} onChange={e => setStats(prev => prev.map((x,j) => j===i ? {...x,label:e.target.value} : x))} placeholder="ex: Terrains vendus" />
          </div>
        </div>
      ))}
      <div style={{marginTop:14,display:'flex',alignItems:'center',gap:10}}>
        <button className="admin-btn admin-btn--primary" onClick={save}>Enregistrer</button>
        {saved && <span className="admin-saved">✓ Enregistré</span>}
      </div>
    </div>
  );
}

/* ---- Témoignages ---- */
function TestimonialsTab({ data, update }) {
  const [items, setItems] = useState(data.testimonials);
  const [form, setForm]   = useState(null);
  const [saved, setSaved] = useState(false);
  const EMPTY = { name:'', city:'', stars:5, text:'' };

  const saveAll = () => { update('testimonials', items); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const saveForm = () => {
    if (!form.name.trim() || !form.text.trim()) return;
    if (form.id) {
      setItems(prev => prev.map(t => t.id===form.id ? form : t));
    } else {
      const nextId = items.length ? Math.max(...items.map(t=>t.id))+1 : 1;
      setItems(prev => [...prev, {...form, id:nextId}]);
    }
    setForm(null);
  };

  const del = (id) => setItems(prev => prev.filter(t => t.id!==id));

  return (
    <div className="admin-section">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <p className="admin-section-title" style={{marginBottom:0}}>Témoignages clients</p>
        <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={() => setForm(EMPTY)}>+ Ajouter</button>
      </div>

      {items.map(t => (
        <div key={t.id} className="admin-card">
          <div className="admin-card-header">
            <h3>{t.name} — {t.city} {'★'.repeat(t.stars)}</h3>
            <div style={{display:'flex',gap:6}}>
              <button className="admin-btn admin-btn--sm" onClick={() => setForm({...t})}>Modifier</button>
              <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => del(t.id)}>Supprimer</button>
            </div>
          </div>
          <p style={{fontSize:13,color:'#555',margin:0,fontStyle:'italic'}}>"{t.text}"</p>
        </div>
      ))}

      <div style={{display:'flex',alignItems:'center',gap:10,marginTop:8}}>
        <button className="admin-btn admin-btn--primary" onClick={saveAll}>Enregistrer les changements</button>
        {saved && <span className="admin-saved">✓ Enregistré</span>}
      </div>

      {form && (
        <div className="admin-modal-overlay" onClick={() => setForm(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h3>{form.id ? 'Modifier le témoignage' : 'Nouveau témoignage'}</h3>
            <div className="admin-form">
              <div className="admin-form-row">
                <div className="admin-field">
                  <label>Nom *</label>
                  <input value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} placeholder="Konan Jean-Baptiste" />
                </div>
                <div className="admin-field">
                  <label>Ville</label>
                  <input value={form.city} onChange={e => setForm(p=>({...p,city:e.target.value}))} placeholder="Abidjan" />
                </div>
              </div>
              <div className="admin-field">
                <label>Note (étoiles)</label>
                <select value={form.stars} onChange={e => setForm(p=>({...p,stars:Number(e.target.value)}))}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} étoile{n>1?'s':''}</option>)}
                </select>
              </div>
              <div className="admin-field">
                <label>Témoignage *</label>
                <textarea value={form.text} onChange={e => setForm(p=>({...p,text:e.target.value}))} rows={4} placeholder="Le témoignage du client…" />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn" onClick={() => setForm(null)}>Annuler</button>
              <button className="admin-btn admin-btn--primary" onClick={saveForm}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- Tarifs & Villes ---- */
function TarifsTab({ data, update }) {
  const [pricing, setPricing] = useState(data.pricing);
  const [cities,  setCities]  = useState(data.cities);
  const [savedP,  setSavedP]  = useState(false);
  const [savedC,  setSavedC]  = useState(false);

  const saveP = () => { update('pricing', pricing); setSavedP(true); setTimeout(()=>setSavedP(false),2000); };
  const saveC = () => { update('cities',  cities);  setSavedC(true); setTimeout(()=>setSavedC(false),2000); };

  return (
    <>
      <div className="admin-section">
        <p className="admin-section-title">Tarifs (cartes de prix)</p>
        {pricing.map((p, i) => (
          <div key={p.id} className="admin-card">
            <div className="admin-form-row">
              <div className="admin-field">
                <label>Superficie</label>
                <input value={p.area} onChange={e => setPricing(prev => prev.map((x,j)=>j===i?{...x,area:e.target.value}:x))} placeholder="400 m²" />
              </div>
              <div className="admin-field">
                <label>Prix (ex: 5 000 000)</label>
                <input value={p.price} onChange={e => setPricing(prev => prev.map((x,j)=>j===i?{...x,price:e.target.value}:x))} />
              </div>
            </div>
            <label className="admin-checkbox-row" style={{marginTop:10}}>
              <input type="checkbox" checked={p.featured}
                onChange={e => setPricing(prev => prev.map((x,j)=>j===i?{...x,featured:e.target.checked}:x))} />
              Mettre en avant (le plus populaire)
            </label>
          </div>
        ))}
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button className="admin-btn admin-btn--primary" onClick={saveP}>Enregistrer les tarifs</button>
          {savedP && <span className="admin-saved">✓ Enregistré</span>}
        </div>
      </div>

      <div className="admin-section">
        <p className="admin-section-title">Zones de commercialisation</p>
        {cities.map((c, i) => (
          <div key={c.id} className="admin-card">
            <div className="admin-form-row">
              <div className="admin-field">
                <label>Nom de la ville</label>
                <input value={c.name} onChange={e => setCities(prev => prev.map((x,j)=>j===i?{...x,name:e.target.value}:x))} />
              </div>
              <div className="admin-field">
                <label>Description</label>
                <input value={c.desc} onChange={e => setCities(prev => prev.map((x,j)=>j===i?{...x,desc:e.target.value}:x))} />
              </div>
            </div>
          </div>
        ))}
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button className="admin-btn admin-btn--primary" onClick={saveC}>Enregistrer les villes</button>
          {savedC && <span className="admin-saved">✓ Enregistré</span>}
        </div>
      </div>
    </>
  );
}

/* ---- Conditions ---- */
function ConditionsTab({ data, update }) {
  const [cond, setCond] = useState(data.conditions);
  const [saved, setSaved] = useState(false);

  const save = () => { update('conditions', cond); setSaved(true); setTimeout(()=>setSaved(false),2000); };

  return (
    <div className="admin-section">
      <p className="admin-section-title">Conditions de paiement (page Terrains)</p>
      <div className="admin-card">
        <div className="admin-form">
          <div className="admin-field">
            <label>Frais de dossier</label>
            <input value={cond.frais} onChange={e=>setCond(p=>({...p,frais:e.target.value}))} placeholder="150 000 FCFA" />
          </div>
          <div className="admin-field">
            <label>Apport initial</label>
            <input value={cond.apport} onChange={e=>setCond(p=>({...p,apport:e.target.value}))} placeholder="3 000 000 FCFA" />
          </div>
          <div className="admin-field">
            <label>Solde / Mode de paiement</label>
            <input value={cond.solde} onChange={e=>setCond(p=>({...p,solde:e.target.value}))} placeholder="Paiement mensuel ou journalier" />
          </div>
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <button className="admin-btn admin-btn--primary" onClick={save}>Enregistrer</button>
        {saved && <span className="admin-saved">✓ Enregistré</span>}
      </div>
    </div>
  );
}
