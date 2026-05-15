import { useState } from 'react';
import './Contact.css';

const Send = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>);

const PhoneSVG = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>;

const INFO = [
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, label:'Adresse',    value:"Port Bouet, route de l'Aéroport, cité ASECNA", sub:'Abidjan, Côte d\'Ivoire' },
  { icon: PhoneSVG, label:'WhatsApp / Appel', value:'(+225) 07 10 89 10 40', sub:'Aussi disponible sur WhatsApp', href:'tel:+2250710891040' },
  { icon: PhoneSVG, label:'Mobile',           value:'(+225) 07 47 63 96 16', sub:'',                              href:'tel:+2250747639616' },
  { icon: PhoneSVG, label:'Fixe',             value:'(+225) 27 21 51 58 11', sub:'',                              href:'tel:+2252721515811' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label:'Email', value:'lca.sarlci@gmail.com', sub:'Réponse sous 24h', href:'mailto:lca.sarlci@gmail.com' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>, label:'Horaires', value:'Lun – Sam : 8h – 18h', sub:'Dimanche sur rendez-vous' },
];

export default function Contact() {
  const [form, setForm]    = useState({ nom:'', telephone:'', email:'', sujet:'', message:'' });
  const [sent, setSent]    = useState(false);
  const [loading, setLoad] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); setLoad(true); setTimeout(() => { setLoad(false); setSent(true); }, 1200); };

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="tag">Parlons-nous</span>
          <h1 style={{marginTop:12}}>Nous <span>contacter</span></h1>
          <p>Notre équipe est disponible pour répondre à toutes vos questions.</p>
        </div>
      </section>

      <section style={{padding:'80px 0', background:'var(--off-white)'}}>
        <div className="container contact-grid">

          {/* Infos */}
          <div className="contact-info">
            <h2>Nos coordonnées</h2>
            <p>Choisissez le canal qui vous convient le mieux.</p>
            <div className="contact-info__list">
              {INFO.map((c,i)=>(
                <div className="contact-info__item" key={i}>
                  <div className="contact-info__icon">{c.icon}</div>
                  <div>
                    <span className="contact-info__label">{c.label}</span>
                    {c.href
                      ? <a href={c.href} className="contact-info__value contact-info__value--link">{c.value}</a>
                      : <p className="contact-info__value">{c.value}</p>
                    }
                    <p className="contact-info__sub">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="https://wa.me/2250710891040?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20vos%20terrains." target="_blank" rel="noopener noreferrer" className="contact-whatsapp">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
              <div><strong>Écrire sur WhatsApp</strong><span>Réponse rapide garantie</span></div>
            </a>
          </div>

          {/* Formulaire */}
          <div className="contact-form-wrap">
            {sent ? (
              <div className="contact-success">
                <div className="contact-success__icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg></div>
                <h3>Message envoyé !</h3>
                <p>Merci ! Notre équipe vous contactera très prochainement.</p>
                <button className="btn btn-outline" onClick={()=>{setSent(false);setForm({nom:'',telephone:'',email:'',sujet:'',message:''});}}>Envoyer un autre message</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Envoyer un message</h2>
                <p>Remplissez le formulaire et nous vous répondrons rapidement.</p>
                <div className="contact-form__row">
                  <div className="form-group"><label>Nom complet *</label><input name="nom" type="text" placeholder="Votre nom" value={form.nom} onChange={handleChange} required /></div>
                  <div className="form-group"><label>Téléphone *</label><input name="telephone" type="tel" placeholder="+225 07 00 00 00 00" value={form.telephone} onChange={handleChange} required /></div>
                </div>
                <div className="form-group"><label>Email</label><input name="email" type="email" placeholder="votre@email.com" value={form.email} onChange={handleChange} /></div>
                <div className="form-group">
                  <label>Sujet *</label>
                  <select name="sujet" value={form.sujet} onChange={handleChange} required>
                    <option value="">Choisir un sujet</option>
                    <option>Achat d'un terrain</option>
                    <option>Renseignements tarifs</option>
                    <option>Projet de construction</option>
                    <option>Conditions de paiement</option>
                    <option>Autre demande</option>
                  </select>
                </div>
                <div className="form-group"><label>Message *</label><textarea name="message" placeholder="Décrivez votre projet ou votre demande..." value={form.message} onChange={handleChange} required rows={5} /></div>
                <button type="submit" className="btn btn-primary btn-lg contact-form__submit" disabled={loading} style={{width:'100%',justifyContent:'center',marginTop:8}}>
                  {loading ? <span className="spinner" /> : <><Send /> Envoyer le message</>}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
