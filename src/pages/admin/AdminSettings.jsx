import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminSettings() {
  const { data, update, reset } = useData();
  const { logout } = useAuth();
  const navigate   = useNavigate();

  const [wa,     setWa]     = useState(data.settings.whatsapp_number);
  const [waMsg,  setWaMsg]  = useState(data.settings.whatsapp_message);
  const [savedWa, setSavedWa] = useState(false);

  const [oldPwd,  setOldPwd]  = useState('');
  const [newPwd,  setNewPwd]  = useState('');
  const [newPwd2, setNewPwd2] = useState('');
  const [pwdMsg,  setPwdMsg]  = useState('');
  const [pwdOk,   setPwdOk]   = useState(false);

  const [confirmReset, setConfirmReset] = useState(false);

  const saveWa = () => {
    update('settings', { ...data.settings, whatsapp_number: wa, whatsapp_message: waMsg });
    setSavedWa(true); setTimeout(() => setSavedWa(false), 2000);
  };

  const savePwd = () => {
    const current = data.settings.admin_password || 'lca2024';
    if (oldPwd !== current)       { setPwdMsg('Mot de passe actuel incorrect.'); setPwdOk(false); return; }
    if (newPwd.length < 6)        { setPwdMsg('Le nouveau mot de passe doit faire au moins 6 caractères.'); setPwdOk(false); return; }
    if (newPwd !== newPwd2)       { setPwdMsg('Les deux mots de passe ne correspondent pas.'); setPwdOk(false); return; }
    update('settings', { ...data.settings, admin_password: newPwd });
    setOldPwd(''); setNewPwd(''); setNewPwd2('');
    setPwdMsg('Mot de passe mis à jour avec succès !'); setPwdOk(true);
  };

  const handleReset = () => {
    reset();
    setConfirmReset(false);
    logout();
    navigate('/admin', { replace: true });
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header"><h2>Paramètres</h2></div>

      {/* WhatsApp */}
      <div className="admin-card">
        <div className="admin-card-header"><h3>WhatsApp global</h3></div>
        <div className="admin-form">
          <div className="admin-field">
            <label>Numéro WhatsApp (sans +, sans espaces)</label>
            <input value={wa} onChange={e=>setWa(e.target.value)} placeholder="2250710891040" />
            <span style={{fontSize:11.5,color:'#999',marginTop:2}}>Utilisé pour les liens WhatsApp du site. Ex: 2250710891040</span>
          </div>
          <div className="admin-field">
            <label>Message pré-rempli (encodé URL)</label>
            <input value={waMsg} onChange={e=>setWaMsg(e.target.value)} />
            <span style={{fontSize:11.5,color:'#999',marginTop:2}}>Ex: Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20vos%20terrains.</span>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10,marginTop:14}}>
          <button className="admin-btn admin-btn--primary" onClick={saveWa}>Enregistrer</button>
          {savedWa && <span className="admin-saved">✓ Enregistré</span>}
        </div>
      </div>

      {/* Mot de passe */}
      <div className="admin-card">
        <div className="admin-card-header"><h3>Changer le mot de passe admin</h3></div>
        <div className="admin-form">
          <div className="admin-field">
            <label>Mot de passe actuel</label>
            <input type="password" value={oldPwd} onChange={e=>{setOldPwd(e.target.value);setPwdMsg('');}} />
          </div>
          <div className="admin-form-row">
            <div className="admin-field">
              <label>Nouveau mot de passe</label>
              <input type="password" value={newPwd} onChange={e=>{setNewPwd(e.target.value);setPwdMsg('');}} />
            </div>
            <div className="admin-field">
              <label>Confirmer le nouveau mot de passe</label>
              <input type="password" value={newPwd2} onChange={e=>{setNewPwd2(e.target.value);setPwdMsg('');}} />
            </div>
          </div>
          {pwdMsg && <p className={pwdOk ? 'admin-saved' : 'admin-error'} style={{margin:0}}>{pwdMsg}</p>}
        </div>
        <div style={{marginTop:14}}>
          <button className="admin-btn admin-btn--primary" onClick={savePwd}>Mettre à jour le mot de passe</button>
        </div>
      </div>

      {/* Zone danger */}
      <div className="admin-danger-zone">
        <h3>Zone dangereuse</h3>
        <p>Remettre tout le contenu du site aux valeurs par défaut. Cette action efface toutes vos modifications.</p>
        <button className="admin-btn admin-btn--danger" onClick={() => setConfirmReset(true)}>
          Réinitialiser tout le contenu
        </button>
      </div>

      {/* Confirmation reset */}
      {confirmReset && (
        <div className="admin-modal-overlay" onClick={() => setConfirmReset(false)}>
          <div className="admin-modal admin-modal--sm" onClick={e=>e.stopPropagation()}>
            <h3>Confirmer la réinitialisation</h3>
            <p style={{color:'#555',fontSize:14}}>
              Toutes vos modifications seront perdues et le contenu par défaut sera restauré.
              Vous serez déconnecté. Cette action est irréversible.
            </p>
            <div className="admin-modal-footer">
              <button className="admin-btn" onClick={() => setConfirmReset(false)}>Annuler</button>
              <button className="admin-btn admin-btn--danger" onClick={handleReset}>Réinitialiser</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
