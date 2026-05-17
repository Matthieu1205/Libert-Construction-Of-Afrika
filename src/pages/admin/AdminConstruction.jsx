import { useState } from 'react';
import { useData } from '../../contexts/DataContext';

export default function AdminConstruction() {
  const { data, update } = useData();
  const [tab, setTab] = useState('services');

  return (
    <div className="admin-page">
      <div className="admin-page-header"><h2>Page Construction</h2></div>
      <div className="admin-tabs">
        <button className={`admin-tab${tab==='services'?' admin-tab--active':''}`} onClick={()=>setTab('services')}>Services BTP</button>
        <button className={`admin-tab${tab==='process'?' admin-tab--active':''}`}  onClick={()=>setTab('process')}>Processus</button>
      </div>
      {tab === 'services' && <ServicesTab data={data} update={update} />}
      {tab === 'process'  && <ProcessTab  data={data} update={update} />}
    </div>
  );
}

function ServicesTab({ data, update }) {
  const [services, setServices] = useState(data.services_btp);
  const [saved, setSaved]       = useState(false);

  const save = () => { update('services_btp', services); setSaved(true); setTimeout(()=>setSaved(false),2000); };

  const changeService = (i, field, val) =>
    setServices(prev => prev.map((s,j) => j===i ? {...s,[field]:val} : s));

  const changeItem = (si, ii, val) =>
    setServices(prev => prev.map((s,j) => j===si
      ? {...s, items: s.items.map((it,k) => k===ii ? val : it)}
      : s
    ));

  const addItem = (si) =>
    setServices(prev => prev.map((s,j) => j===si ? {...s,items:[...s.items,'']} : s));

  const delItem = (si, ii) =>
    setServices(prev => prev.map((s,j) => j===si
      ? {...s, items: s.items.filter((_,k)=>k!==ii)}
      : s
    ));

  return (
    <div className="admin-section">
      <p className="admin-section-title">Services de construction ({services.length})</p>
      {services.map((s, i) => (
        <div key={s.id} className="admin-card">
          <div className="admin-card-header">
            <h3>Service {i+1}</h3>
          </div>
          <div className="admin-form">
            <div className="admin-field">
              <label>Titre du service</label>
              <input value={s.title} onChange={e=>changeService(i,'title',e.target.value)} />
            </div>
            <div className="admin-field">
              <label>Description</label>
              <textarea value={s.desc} onChange={e=>changeService(i,'desc',e.target.value)} rows={3} />
            </div>
            <div>
              <label style={{fontSize:12.5,fontWeight:600,color:'#374151',display:'block',marginBottom:8}}>Sous-services</label>
              {s.items.map((item, ii) => (
                <div key={ii} className="admin-list-item">
                  <input value={item} onChange={e=>changeItem(i,ii,e.target.value)} placeholder="ex: Maisons individuelles" />
                  <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={()=>delItem(i,ii)}>✕</button>
                </div>
              ))}
              <button className="admin-btn admin-btn--sm" style={{marginTop:8}} onClick={()=>addItem(i)}>+ Ajouter</button>
            </div>
          </div>
        </div>
      ))}
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <button className="admin-btn admin-btn--primary" onClick={save}>Enregistrer les services</button>
        {saved && <span className="admin-saved">✓ Enregistré</span>}
      </div>
    </div>
  );
}

function ProcessTab({ data, update }) {
  const [process, setProcess] = useState(data.process);
  const [saved,   setSaved]   = useState(false);

  const save = () => { update('process', process); setSaved(true); setTimeout(()=>setSaved(false),2000); };

  const change = (i, field, val) => setProcess(prev => prev.map((p,j) => j===i ? {...p,[field]:val} : p));

  return (
    <div className="admin-section">
      <p className="admin-section-title">Étapes du processus</p>
      {process.map((p, i) => (
        <div key={p.id} className="admin-card">
          <div className="admin-form-row">
            <div className="admin-field">
              <label>Numéro (ex: 01)</label>
              <input value={p.step} onChange={e=>change(i,'step',e.target.value)} style={{maxWidth:80}} />
            </div>
            <div className="admin-field">
              <label>Titre de l'étape</label>
              <input value={p.title} onChange={e=>change(i,'title',e.target.value)} />
            </div>
          </div>
          <div className="admin-field" style={{marginTop:10}}>
            <label>Description</label>
            <textarea value={p.desc} onChange={e=>change(i,'desc',e.target.value)} rows={2} />
          </div>
        </div>
      ))}
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <button className="admin-btn admin-btn--primary" onClick={save}>Enregistrer le processus</button>
        {saved && <span className="admin-saved">✓ Enregistré</span>}
      </div>
    </div>
  );
}
