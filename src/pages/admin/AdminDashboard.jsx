import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';

export default function AdminDashboard() {
  const { data } = useData();

  const cards = [
    { label: 'Terrains',      value: data.terrains.length,      to: '/admin/terrains',     color: '#2d5a27' },
    { label: 'Témoignages',   value: data.testimonials.length,  to: '/admin/accueil',      color: '#d4920a' },
    { label: 'Services BTP',  value: data.services_btp.length,  to: '/admin/construction', color: '#1e40af' },
    { label: 'Villes',        value: data.cities.length,        to: '/admin/accueil',      color: '#7c3aed' },
  ];

  const quickLinks = [
    ['/admin/terrains',    '+ Ajouter un terrain'],
    ['/admin/accueil',     'Modifier les témoignages'],
    ['/admin/contact',     'Mettre à jour les contacts'],
    ['/admin/parametres',  'Changer le mot de passe'],
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Tableau de bord</h2>
        <span className="admin-page-sub">Gérez le contenu de votre site</span>
      </div>

      <div className="admin-dashboard-grid">
        {cards.map((c, i) => (
          <Link key={i} to={c.to} className="admin-stat-card" style={{ '--card-color': c.color }}>
            <strong>{c.value}</strong>
            <span>{c.label}</span>
          </Link>
        ))}
      </div>

      <div className="admin-quick-links">
        <h3>Accès rapide</h3>
        <div className="admin-links-grid">
          {quickLinks.map(([to, label]) => (
            <Link key={to} to={to} className="admin-quick-link">{label} →</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
