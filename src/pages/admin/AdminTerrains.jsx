import { useState } from 'react';
import { useData } from '../../contexts/DataContext';

const CITIES  = ['Vitré 1', 'Sikensi', 'Yamoussoukro', 'Bonoua'];
const AREAS   = [300, 400, 500, 600];
const BADGES  = ['', 'Disponible', 'Populaire', 'Offre spéciale'];
const DOCS    = ['TF', 'ACD', 'Approbation'];
const EMPTY   = { name:'', city:'Vitré 1', zone:'', area:400, price:5000000, badge:'', image:'', featured:false, documents:[] };

function badgeClass(badge) {
  if (!badge)                   return 'admin-badge admin-badge--gray';
  if (badge === 'Disponible')   return 'admin-badge admin-badge--green';
  if (badge === 'Populaire')    return 'admin-badge admin-badge--gold';
  return 'admin-badge admin-badge--gold';
}

export default function AdminTerrains() {
  const { data, update } = useData();
  const [form, setForm]     = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [error, setError]   = useState('');

  const terrains = data.terrains;

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const toggleDoc = (doc) => {
    setForm(prev => {
      const docs = prev.documents || [];
      return { ...prev, documents: docs.includes(doc) ? docs.filter(d => d !== doc) : [...docs, doc] };
    });
  };

  const save = () => {
    if (!form.name.trim()) { setError('Le nom est obligatoire.'); return; }
    if (!form.image.trim()) { setError("L'URL de l'image est obligatoire."); return; }
    if (form.id) {
      update('terrains', terrains.map(t => t.id === form.id ? form : t));
    } else {
      const nextId = terrains.length ? Math.max(...terrains.map(t => t.id)) + 1 : 1;
      update('terrains', [...terrains, { ...form, id: nextId }]);
    }
    setForm(null);
    setError('');
  };

  const del = (id) => {
    update('terrains', terrains.filter(t => t.id !== id));
    setConfirm(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Terrains <span className="admin-page-sub">({terrains.length} au total)</span></h2>
        <button className="admin-btn admin-btn--primary" onClick={() => { setForm({...EMPTY}); setError(''); }}>
          + Ajouter un terrain
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Ville</th>
              <th>Zone</th>
              <th>Surface</th>
              <th>Prix (FCFA)</th>
              <th>Documents</th>
              <th>Badge</th>
              <th>Accueil</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {terrains.map(t => (
              <tr key={t.id}>
                <td>
                  {t.image
                    ? <img src={t.image} alt={t.name} className="admin-thumb" />
                    : <span style={{color:'#aaa',fontSize:12}}>—</span>
                  }
                </td>
                <td style={{fontWeight:500}}>{t.name}</td>
                <td>{t.city}</td>
                <td style={{fontSize:12,color:'#555'}}>{t.zone || '—'}</td>
                <td>{t.area} m²</td>
                <td>{t.price.toLocaleString('fr-FR')}</td>
                <td style={{fontSize:12}}>
                  {(t.documents || (t.documentType ? [t.documentType] : [])).join(', ') || '—'}
                </td>
                <td>
                  {t.badge
                    ? <span className={badgeClass(t.badge)}>{t.badge}</span>
                    : <span style={{color:'#aaa',fontSize:12}}>—</span>
                  }
                </td>
                <td>
                  {t.featured
                    ? <span className="admin-badge admin-badge--feat">Oui</span>
                    : <span style={{color:'#aaa',fontSize:12}}>Non</span>
                  }
                </td>
                <td className="admin-table-actions">
                  <button className="admin-btn admin-btn--sm" onClick={() => { setForm({ ...t, documents: t.documents || (t.documentType ? [t.documentType] : []) }); setError(''); }}>Modifier</button>
                  <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => setConfirm(t.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal ajout / modification */}
      {form && (
        <div className="admin-modal-overlay" onClick={() => setForm(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h3>{form.id ? 'Modifier le terrain' : 'Nouveau terrain'}</h3>
            <div className="admin-form">
              <div className="admin-form-row">
                <div className="admin-field" style={{gridColumn:'1/-1'}}>
                  <label>Nom du terrain *</label>
                  <input name="name" value={form.name} onChange={change} placeholder="ex: Bassam Prestige 400" />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-field">
                  <label>Ville *</label>
                  <select name="city" value={form.city} onChange={change}>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="admin-field">
                  <label>Zone / Quartier</label>
                  <input name="zone" value={form.zone || ''} onChange={change} placeholder="ex: Autoroutes du Nord" />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-field">
                  <label>Superficie *</label>
                  <select name="area" value={form.area} onChange={change}>
                    {AREAS.map(a => <option key={a} value={a}>{a} m²</option>)}
                  </select>
                </div>
                <div className="admin-field">
                  <label>Documents</label>
                  <div style={{display:'flex',gap:14,flexWrap:'wrap',paddingTop:6}}>
                    {DOCS.map(doc => (
                      <label key={doc} style={{display:'flex',alignItems:'center',gap:5,fontSize:13,cursor:'pointer'}}>
                        <input type="checkbox" checked={(form.documents||[]).includes(doc)} onChange={()=>toggleDoc(doc)} />
                        {doc}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-field">
                  <label>Prix (FCFA) *</label>
                  <input name="price" type="number" value={form.price} onChange={change} step="100000" />
                </div>
                <div className="admin-field">
                  <label>Badge</label>
                  <select name="badge" value={form.badge} onChange={change}>
                    {BADGES.map(b => <option key={b} value={b}>{b || '— Aucun —'}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-field">
                <label>URL de l'image *</label>
                <input name="image" value={form.image} onChange={change} placeholder="https://exemple.com/image.jpeg" />
                {form.image && (
                  <img src={form.image} alt="aperçu" className="admin-img-preview"
                    onError={e => { e.target.style.display='none'; }} />
                )}
              </div>
              <label className="admin-checkbox-row">
                <input type="checkbox" name="featured" checked={form.featured} onChange={change} />
                Afficher sur la page d'accueil (terrain en vedette)
              </label>
              {error && <p className="admin-error">{error}</p>}
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn" onClick={() => setForm(null)}>Annuler</button>
              <button className="admin-btn admin-btn--primary" onClick={save}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal confirmation suppression */}
      {confirm && (
        <div className="admin-modal-overlay" onClick={() => setConfirm(null)}>
          <div className="admin-modal admin-modal--sm" onClick={e => e.stopPropagation()}>
            <h3>Confirmer la suppression</h3>
            <p style={{color:'#555',fontSize:14}}>Voulez-vous vraiment supprimer ce terrain ? Cette action est irréversible.</p>
            <div className="admin-modal-footer">
              <button className="admin-btn" onClick={() => setConfirm(null)}>Annuler</button>
              <button className="admin-btn admin-btn--danger" onClick={() => del(confirm)}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
