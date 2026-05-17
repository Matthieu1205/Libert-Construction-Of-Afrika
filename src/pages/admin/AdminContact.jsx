import { useState } from 'react';
import { useData } from '../../contexts/DataContext';

export default function AdminContact() {
  const { data, update } = useData();
  const [contact, setContact] = useState(data.contact);
  const [saved,   setSaved]   = useState(false);

  const change = (field, val) => setContact(prev => ({...prev, [field]: val}));

  const save = () => {
    update('contact', contact);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Field = ({ label, field, placeholder, hint }) => (
    <div className="admin-field">
      <label>{label}</label>
      <input value={contact[field]} onChange={e=>change(field,e.target.value)} placeholder={placeholder} />
      {hint && <span style={{fontSize:11.5,color:'#999',marginTop:2}}>{hint}</span>}
    </div>
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header"><h2>Page Contact</h2></div>

      <div className="admin-card">
        <div className="admin-card-header"><h3>Adresse</h3></div>
        <div className="admin-form">
          <Field label="Adresse" field="address" placeholder="Port Bouet, route de l'Aéroport…" />
          <Field label="Ville / Pays" field="city" placeholder="Abidjan, Côte d'Ivoire" />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header"><h3>Téléphones</h3></div>
        <div className="admin-form">
          <div className="admin-form-row">
            <Field label="WhatsApp / Appel (affiché)" field="whatsapp" placeholder="(+225) 07 10 89 10 40" />
            <Field label="WhatsApp (lien tel:)" field="whatsapp_href" placeholder="tel:+2250710891040" hint="Format : tel:+225XXXXXXXXXX" />
          </div>
          <div className="admin-form-row">
            <Field label="Mobile (affiché)" field="mobile" placeholder="(+225) 07 47 63 96 16" />
            <Field label="Mobile (lien tel:)" field="mobile_href" placeholder="tel:+2250747639616" />
          </div>
          <div className="admin-form-row">
            <Field label="Fixe (affiché)" field="fixe" placeholder="(+225) 27 21 51 58 11" />
            <Field label="Fixe (lien tel:)" field="fixe_href" placeholder="tel:+2252721515811" />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header"><h3>Email & Horaires</h3></div>
        <div className="admin-form">
          <Field label="Email" field="email" placeholder="lca.sarlci@gmail.com" />
          <div className="admin-form-row">
            <Field label="Horaires" field="hours" placeholder="Lun – Sam : 8h – 18h" />
            <Field label="Note horaires" field="hours_sub" placeholder="Dimanche sur rendez-vous" />
          </div>
        </div>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <button className="admin-btn admin-btn--primary" onClick={save}>Enregistrer les coordonnées</button>
        {saved && <span className="admin-saved">✓ Enregistré</span>}
      </div>
    </div>
  );
}
