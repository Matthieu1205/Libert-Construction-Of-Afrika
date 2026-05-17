import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Admin.css';

export default function AdminLogin() {
  const { authed, login } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (authed) navigate('/admin/dashboard', { replace: true });
  }, [authed, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (login(password)) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError('Mot de passe incorrect');
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <img src="/logo.jpeg" alt="LCA" className="admin-login__logo" />
        <h1>Administration</h1>
        <p>Liberté Construction Of Afrika</p>
        <form onSubmit={handleSubmit}>
          <div className="admin-field">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              placeholder="Entrez le mot de passe"
              autoFocus
            />
          </div>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" className="admin-btn admin-btn--primary admin-btn--full" disabled={loading}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
        <p className="admin-login__hint">Mot de passe par défaut : lca2024</p>
      </div>
    </div>
  );
}
