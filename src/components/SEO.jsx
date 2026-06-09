import { Helmet } from "react-helmet-async";

const SITE = "Liberté Construction Of Afrika";
const BASE_URL = "https://www.liberte-construction.com";
const DEFAULT_IMAGE = `${BASE_URL}/flyer-lca.jpeg`;

export default function SEO({ title, description, path = "/", image = DEFAULT_IMAGE }) {
  const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — Terrains & Construction en Côte d'Ivoire`;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_CI" />
      <meta property="og:site_name" content={SITE} />
    </Helmet>
  );
}
