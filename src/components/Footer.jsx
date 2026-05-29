import { Link } from "react-router-dom";
import "./Footer.css";

const MapPin = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const Phone = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
  </svg>
);
const Mail = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">
          <div className="footer__brand">
            <img src="/logo.jpeg" alt="LCA" className="footer__logo" />
            <p className="footer__tagline">"Entrez dans votre nouvelle vie"</p>
            <p className="footer__desc">
              Liberté Construction Of Afrika vous accompagne dans l'acquisition
              de terrains et la réalisation de vos projets de construction en
              Côte d'Ivoire.
            </p>
            <div className="footer__services">
              {["Immobilier", "BTP", "Transport", "Import / Export"].map(
                (s) => (
                  <span key={s}>{s}</span>
                ),
              )}
            </div>
          </div>
          <div className="footer__col">
            <h4>Navigation</h4>
            <ul>
              {[
                ["/", "Accueil"],
                ["/a-propos", "À Propos"],
                ["/terrains", "Terrains"],
                ["/construction", "Construction"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h4>Zones</h4>
            <ul>
              {["Sikensi", "Yamoussoukro", "Grand-Bassam", "Bonoua"].map(
                (c) => (
                  <li key={c}>
                    <MapPin />
                    {c}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li>
                <Phone />
                <a href="tel:+2250710891040">(+225) 07 10 89 10 40</a>
              </li>
              <li>
                <Phone />
                <a href="tel:+2250747639616">(+225) 07 47 63 96 15</a>
              </li>
              <li>
                <Phone />
                <a href="tel:+2252721515811">(+225) 27 21 51 58 11</a>
              </li>
              <li>
                <Mail />
                <a href="mailto:lca.sarlci@gmail.com">lca.sarlci@gmail.com</a>
              </li>
              <li>
                <MapPin />
                Port Bouet, route de l'Aéroport, cité ASECNA, Abidjan
              </li>
            </ul>
            <a
              href="https://wa.me/2250710891040"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__whatsapp"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              Discuter sur WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>
            &copy; {new Date().getFullYear()} Liberté Construction Of Afrika.
            Tous droits réservés.
          </p>
          <p>Conçu pour vous servir.</p>
        </div>
      </div>
    </footer>
  );
}
