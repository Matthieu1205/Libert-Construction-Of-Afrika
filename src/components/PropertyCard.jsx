import { Link } from "react-router-dom";
import "./PropertyCard.css";

const MapPin = () => (
  <svg
    width="13"
    height="13"
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

const Area = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

export default function PropertyCard({ property }) {
  const { name, city, area, price, image, badge, documentType } = property;

  const fmt = (p) => new Intl.NumberFormat("fr-FR").format(p) + " FCFA";

  return (
    <div className="pcard">
      <div className="pcard__img-wrap">
        {image ? (
          <img src={image} alt={name} className="pcard__img" />
        ) : (
          <div className="pcard__img-placeholder">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
          </div>
        )}

        {badge && <span className="pcard__badge">{badge}</span>}

        {/* Type de document */}
        {documentType && (
          <span
            className={`pcard__doc ${
              documentType === "TF" ? "pcard__doc--tf" : "pcard__doc--acd"
            }`}
          >
            {documentType}
          </span>
        )}
      </div>

      <div className="pcard__body">
        <div className="pcard__meta">
          <span className="pcard__location">
            <MapPin /> {city}
          </span>

          <span className="pcard__area">
            <Area /> {area} m²
          </span>
        </div>

        <h3 className="pcard__title">{name}</h3>

        <div className="pcard__footer">
          <div className="pcard__price">{fmt(price)}</div>

          <Link to="/contact" className="pcard__cta">
            Renseignements
          </Link>
        </div>
      </div>
    </div>
  );
}
