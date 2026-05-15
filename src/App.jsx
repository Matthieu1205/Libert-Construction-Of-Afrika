import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar        from './components/Navbar';
import Footer        from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

import Home          from './pages/Home';
import About         from './pages/About';
import Terrains      from './pages/Terrains';
import Construction  from './pages/Construction';
import Contact       from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"              element={<Home />}         />
        <Route path="/a-propos"      element={<About />}        />
        <Route path="/terrains"      element={<Terrains />}     />
        <Route path="/construction"  element={<Construction />} />
        <Route path="/contact"       element={<Contact />}      />
        <Route path="*"              element={<Home />}         />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}
