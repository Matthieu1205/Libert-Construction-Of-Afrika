import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useData } from './contexts/DataContext';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';

import Navbar         from './components/Navbar';
import Footer         from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

import Home         from './pages/Home';
import About        from './pages/About';
import Terrains     from './pages/Terrains';
import Construction from './pages/Construction';
import Contact      from './pages/Contact';

import AdminLogin        from './pages/admin/AdminLogin';
import AdminLayout       from './pages/admin/AdminLayout';
import AdminDashboard    from './pages/admin/AdminDashboard';
import AdminTerrains     from './pages/admin/AdminTerrains';
import AdminHome         from './pages/admin/AdminHome';
import AdminAbout        from './pages/admin/AdminAbout';
import AdminConstruction from './pages/admin/AdminConstruction';
import AdminContact      from './pages/admin/AdminContact';
import AdminSettings     from './pages/admin/AdminSettings';

function PublicLayout() {
  const { loading } = useData();
  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: 'var(--green)' }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard"    element={<AdminDashboard />} />
              <Route path="terrains"     element={<AdminTerrains />} />
              <Route path="accueil"      element={<AdminHome />} />
              <Route path="apropos"      element={<AdminAbout />} />
              <Route path="construction" element={<AdminConstruction />} />
              <Route path="contact"      element={<AdminContact />} />
              <Route path="parametres"   element={<AdminSettings />} />
            </Route>

            {/* Public */}
            <Route element={<PublicLayout />}>
              <Route path="/"             element={<Home />} />
              <Route path="/a-propos"     element={<About />} />
              <Route path="/terrains"     element={<Terrains />} />
              <Route path="/construction" element={<Construction />} />
              <Route path="/contact"      element={<Contact />} />
              <Route path="*"             element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </DataProvider>
  );
}
