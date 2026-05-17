import { useState } from 'react';
import { useData } from '../../contexts/DataContext';

export default function AdminAbout() {
  const { data, update } = useData();
  const [tab, setTab] = useState('textes');

  const TABS = [
    { id:'textes',   label:'Mission & Vision' },
    { id:'valeurs',  label:'Valeurs' },
    { id:'services', label:'Services & Stats' },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header"><h2>Page À propos</h2></div>
      <div className="admin-tabs">
        {TABS.map(t => (
          <button key={t.id} className={`admin-tab${tab===t.id?' admin-tab--active':''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'textes'   && <TextesTab   data={data} update={update} />}
      {tab === 'valeurs'  && <ValeursTab  data={data} update={update} />}
      {tab === 'services' && <ServicesTab data={data} update={update} />}
    </div>
  );
}

function TextesTab({ data, update }) {
  const [mission, setMission] = useState(data.mission);
  const [vision,  setVision]  = useState(data.vision);
  const [saved,   setSaved]   = useState(false);

  const save = () => {
    update('mission', mission);
    update('vision',  vision);
    setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  return (
    <div className="admin-section">
      <div className="admin-card">
        <div className="admin-form">
          <div className="admin-field">
            <label>Notre Mission</label>
            <textarea value={mission} onChange={e=>setMission(e.target.value)} rows={4} />
          </div>
          <div className="admin-field">
            <label>Notre Vision</label>
            <textarea value={vision} onChange={e=>setVision(e.target.value)} rows={4} />
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

function ValeursTab({ data, update }) {
  const [valeurs, setValeurs] = useState(data.valeurs);
  const [saved,   setSaved]   = useState(false);

  const save = () => { update('valeurs', valeurs); setSaved(true); setTimeout(()=>setSaved(false),2000); };

  const change = (i, field, val) => setValeurs(prev => prev.map((v,j) => j===i ? {...v,[field]:val} : v));

  return (
    <div className="admin-section">
      <p className="admin-section-title">Valeurs de l'entreprise</p>
      {valeurs.map((v, i) => (
        <div key={v.id} className="admin-card">
          <div className="admin-form-row">
            <div className="admin-field">
              <label>Titre</label>
              <input value={v.title} onChange={e=>change(i,'title',e.target.value)} />
            </div>
            <div className="admin-field">
              <label>Description</label>
              <input value={v.desc} onChange={e=>change(i,'desc',e.target.value)} />
            </div>
          </div>
        </div>
      ))}
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <button className="admin-btn admin-btn--primary" onClick={save}>Enregistrer</button>
        {saved && <span className="admin-saved">✓ Enregistré</span>}
      </div>
    </div>
  );
}

function ServicesTab({ data, update }) {
  const [services,    setServices]    = useState(data.services_about);
  const [storyStats,  setStoryStats]  = useState(data.story_stats);
  const [savedS,      setSavedS]      = useState(false);
  const [savedSt,     setSavedSt]     = useState(false);

  const saveS  = () => { update('services_about', services);   setSavedS(true);  setTimeout(()=>setSavedS(false),2000); };
  const saveSt = () => { update('story_stats',    storyStats); setSavedSt(true); setTimeout(()=>setSavedSt(false),2000); };

  const addService = () => setServices(prev => [...prev, '']);
  const delService = (i) => setServices(prev => prev.filter((_,j)=>j!==i));
  const changeS = (i, val) => setServices(prev => prev.map((x,j)=>j===i?val:x));

  const changeSt = (i, val) => setStoryStats(prev => prev.map((x,j)=>j===i?val:x));

  return (
    <>
      <div className="admin-section">
        <p className="admin-section-title">Liste des services</p>
        <div className="admin-card">
          {services.map((s, i) => (
            <div key={i} className="admin-list-item">
              <input value={s} onChange={e=>changeS(i,e.target.value)} placeholder="Service…" />
              <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={()=>delService(i)}>✕</button>
            </div>
          ))}
          <button className="admin-btn admin-btn--sm" style={{marginTop:10}} onClick={addService}>+ Ajouter</button>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button className="admin-btn admin-btn--primary" onClick={saveS}>Enregistrer les services</button>
          {savedS && <span className="admin-saved">✓ Enregistré</span>}
        </div>
      </div>

      <div className="admin-section">
        <p className="admin-section-title">Points clés de notre histoire</p>
        <div className="admin-card">
          {storyStats.map((s, i) => (
            <div key={i} className="admin-list-item">
              <input value={s} onChange={e=>changeSt(i,e.target.value)} />
            </div>
          ))}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button className="admin-btn admin-btn--primary" onClick={saveSt}>Enregistrer</button>
          {savedSt && <span className="admin-saved">✓ Enregistré</span>}
        </div>
      </div>
    </>
  );
}
