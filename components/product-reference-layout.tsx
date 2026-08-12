import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icon";
import { CertificationLogos } from "./brand";
import { CTA, SectionTitle } from "./ui";

type ProductReferenceLayoutProps = {
  product: { id: string; name: string; description: string; imageUrl?: string | null; brochureUrl?: string | null; videoUrl?: string | null; specifications?: unknown; category?: string | null };
  brochures?: Array<{ id: string; fileUrl: string; fileName: string; fileSize?: string | null }>;
};

const applications = [
  ["Snack Manufacturing", "Ideal for extruded pellets, chips, and savory snacks requiring high expansion ratios."],
  ["RTC / RTM Meals", "Instant mashed potatoes, ready-to-cook mixes, and meal bases."],
  ["Bakery & Binders", "Moisture retention in breads and thickener for meat products."],
];

export function ProductReferenceLayout({ product, brochures = [] }: ProductReferenceLayoutProps) {
  const specs = (product.specifications || {}) as Record<string, string>;
  const specificationRows = Object.entries(specs).length ? Object.entries(specs) : [["Moisture", "Max 8.0%"], ["Reducing Sugars", "≤ 2.0%"], ["Ash Content", "≤ 5.0%"], ["Starch Content", "≥ 75.0%"], ["Free Fatty Acids", "≤ 0.1%"], ["Additive Content", "Citric Acid & SAPP (trace)"]];
  const image = product.imageUrl || "/images/potato-1.jpg";
  return <>
    <section className="reference-hero">
      <div className="container reference-hero-grid"><div><p className="eyebrow">Export quality grade</p><h1>{product.name}</h1><p>{product.description}</p><div className="button-row">{product.brochureUrl && <a className="button dark" href={product.brochureUrl} target="_blank" rel="noreferrer"><Icon name="download" size={16}/> Download brochure</a>}<Link className="button accent" href={`/contact?requestType=specifications&productId=${product.id}&productName=${encodeURIComponent(product.name)}`}>Request B2B quote</Link></div></div><div className="reference-hero-image"><Image src={image} alt={product.name} fill priority sizes="(max-width: 800px) 100vw, 50vw" className="cover-image"/></div></div>
    </section>
    <section className="section container reference-overview"><div><div className="reference-main-image"><Image src={image} alt={`${product.name} production`} fill sizes="50vw" className="cover-image"/></div><div className="reference-thumbs"><Image src="/images/potato-2.jpg" alt="Laboratory testing" fill className="cover-image"/><Image src="/images/potato-3.jpg" alt="Product texture" fill className="cover-image"/><Image src="/images/potato-4.jpg" alt="Export packaging" fill className="cover-image"/></div></div><div className="reference-side"><div className="reference-card"><h3>Technical Overview</h3>{[["Purity Level", "99.8% Minimum"], ["Moisture Content", "Max 8.0%"], ["Shelf Life", "18 Months"]].map(([a,b]) => <div className="reference-row" key={a}><span>{a}</span><strong>{b}</strong></div>)}<div className="reference-row"><span>Certifications</span><CertificationLogos items={["ISO 22000", "HACCP", "GMP"]}/></div><Link className="button outline full" href={`/contact?requestType=sample&productId=${product.id}&productName=${encodeURIComponent(product.name)}`}><Icon name="download" size={15}/> Request sample</Link></div><div className="reference-card muted"><h3>Primary Applications</h3>{applications.map(([title, text]) => <div className="application-item" key={title}><Icon name="box" size={17}/><div><strong>{title}</strong><p>{text}</p></div></div>)}</div></div></section>
    {(product.brochureUrl || brochures.length > 0) && <section className="section container"><SectionTitle title="Product brochures"/><div className="reference-feature-grid">{product.brochureUrl && <a className="reference-card brochure-download" href={product.brochureUrl} download target="_blank" rel="noreferrer"><Icon name="download" size={20}/><strong>Download product brochure</strong><span>PDF brochure</span></a>}{brochures.map((brochure) => <a className="reference-card brochure-download" href={brochure.fileUrl} download={brochure.fileName} target="_blank" rel="noreferrer" key={brochure.id}><Icon name="download" size={20}/><strong>{brochure.fileName}</strong><span>{brochure.fileSize || "Product brochure"}</span></a>)}</div></section>}
    <section id="specifications" className="section container"><SectionTitle title="Technical Specifications"/><div className="reference-table"><div><b>Parameters</b><b>Acceptance Limit</b></div>{specificationRows.map(([key, value]) => <div key={key}><span>{key}</span><span>{String(value)}</span></div>)}</div></section>
    <section className="section reference-tint"><div className="container"><SectionTitle center title="Industrial Versatility"/><div className="reference-feature-grid">{applications.map(([title, text]) => <article key={title}><Icon name="box"/><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="section container"><SectionTitle center title="The De'Hydra Advantage"/><div className="reference-advantage-grid">{[["15% Rehydration", "Superior absorption ratio reducing raw material cost."], ["18 Month Stability", "Consistent performance throughout extended shelf life."], ["Clean Label", "Zero additives or artificial preservatives."], ["High Viscosity", "Uniform starch consistency for automated production lines."]].map(([title, text]) => <article key={title}><Icon name="check"/><strong>{title}</strong><p>{text}</p></article>)}</div></section>
    <section className="section container"><SectionTitle center title="Industrial Packaging"/><div className="reference-feature-grid">{[["Standard Export Bag", "25 kg multi-wall paper bags with PE inner liner."], ["Jumbo Bulk Bags", "500–1000 KG FIBC bags with food-grade liners."], ["Container Loads", "20ft / 40ft FCL options for international markets."]].map(([title, text], index) => <article key={title}><Icon name={index === 0 ? "box" : index === 1 ? "factory" : "globe"}/><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    {product.videoUrl && <section className="section container"><SectionTitle center title="Product in action"/><video className="product-video" src={product.videoUrl} controls preload="metadata" aria-label={`${product.name} product video`}/></section>}
    <CTA title="Ready to optimize your production?" text="Contact our technical sales team for custom starch profiles, bulk pricing, or to arrange a facility audit."/>
  </>;
}
