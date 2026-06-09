import { useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import SEO from "../components/SEO";
import { useData } from "../contexts/DataContext";
import "./Terrains.css";

const Arrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);

const CITIES = ["Toutes", "Vitré 1", "Sikensi", "Yamoussoukro", "Bonoua"];
const AREAS = ["Toutes", "300 m²", "400 m²", "500 m²", "600 m²"];

export default function Terrains() {
  const { data } = useData();
  const { terrains, conditions, settings } = data;

  const [city, setCity] = useState("Toutes");
  const [area, setArea] = useState("Toutes");

  const filtered = terrains.filter((p) => {
    const cOk = city === "Toutes" || p.city === city;
    const aOk = area === "Toutes" || p.area === parseInt(area);
    return cOk && aOk;
  });

  const waLink = `https://wa.me/${settings.whatsapp_number}`;

  return (
    <main>
      <SEO
        title="Vente de Terrain en Côte d'Ivoire"
        description="Achetez votre terrain à Vitré 1, Sikensi, Yamoussoukro ou Bonoua. Parcelles 300 à 600 m², titre foncier sécurisé. À partir de 4 000 000 FCFA avec paiement mensuel ou journalier."
        path="/terrains"
        image="https://www.liberte-construction.com/slide-bg5.jpg"
      />
      <div className="hero-bg">
        <div className="hero-bg__content">
          <span className="hero-badge">Côte d'Ivoire</span>
          <h1 className="hero-bg__title">Vente de <span className="hero-accent">Terrain</span></h1>
          <p className="hero-subtitle">
            Des parcelles viabilisées, avec titres fonciers,<br />
            dans les meilleures zones de Côte d'Ivoire.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <strong>500+</strong>
              <span>Terrains vendus</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>4</strong>
              <span>Villes couvertes</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>1 500+</strong>
              <span>Clients satisfaits</span>
            </div>
          </div>
          <div className="hero-cities">
            {["Vitré 1", "Sikensi", "Yamoussoukro", "Bonoua"].map((c) => (
              <span key={c} className="hero-city-tag">{c}</span>
            ))}
          </div>
          <div className="hero-actions">
            <a href="#terrains" className="btn btn-gold btn-lg">Voir les terrains</a>
            <Link to="/contact" className="btn hero-btn-outline btn-lg">Nous contacter <Arrow /></Link>
          </div>
        </div>
      </div>

      <section className="conditions">
        <div className="container conditions__grid">
          {[
            ["Frais de dossier", conditions.frais],
            ["Apport initial", conditions.apport],
            ["Solde", conditions.solde],
          ].map(([l, v]) => (
            <div className="condition__item" key={l}>
              <span>{l}</span>
              <strong>{v}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="terrains" style={{ padding: "60px 0 80px" }}>
        <div className="container">
          <div className="terrains-filters">
            <div className="filter-group">
              <label>Ville</label>
              <div className="filter-chips">
                {CITIES.map((c) => (
                  <button
                    key={c}
                    className={`chip${city === c ? " chip--on" : ""}`}
                    onClick={() => setCity(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <label>Superficie</label>
              <div className="filter-chips">
                {AREAS.map((a) => (
                  <button
                    key={a}
                    className={`chip${area === a ? " chip--on" : ""}`}
                    onClick={() => setArea(a)}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-count">
              <strong>{filtered.length}</strong> terrain
              {filtered.length > 1 ? "s" : ""} trouvé
              {filtered.length > 1 ? "s" : ""}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="terrains-grid">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="terrains-empty">
              <p>Aucun terrain ne correspond à vos critères.</p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setCity("Toutes");
                  setArea("Toutes");
                }}
              >
                Réinitialiser
              </button>
            </div>
          )}
        </div>
      </section>

      <section
        style={{
          background: "var(--off-white)",
          borderTop: "1px solid var(--light-gray)",
          padding: "48px 0",
        }}
      >
        <div className="container terrains-cta">
          <div>
            <h2>Vous ne trouvez pas ce que vous cherchez ?</h2>
            <p>
              Contactez-nous — nous avons peut-être d'autres terrains
              disponibles.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Demander un terrain <Arrow />
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-lg"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
