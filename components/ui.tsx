import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icon";

export function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="eyebrow">{children}</p>; }

export function PageHero({ eyebrow, title, text, image, children, compact = false }: { eyebrow: string; title: string; text: string; image: string; children?: React.ReactNode; compact?: boolean }) {
  return <section className={compact ? "page-hero compact" : "page-hero"}>
    <Image src={image} alt="" fill priority sizes="100vw" className="cover-image"/>
    <div className="hero-scrim"/><div className="container hero-content"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p>{children}</div>
  </section>;
}

export function SectionTitle({ eyebrow, title, text, center = false }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return <div className={center ? "section-title center" : "section-title"}>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

export function Metric({ value, label }: { value: string; label: string }) { return <div className="metric"><strong>{value}</strong><span>{label}</span></div>; }

export function CTA({ title, text }: { title: string; text: string }) {
  return <section className="cta container"><div><Eyebrow>Strategic ingredient partnership</Eyebrow><h2>{title}</h2><p>{text}</p></div><div className="button-row"><Link className="button light" href="/contact">Start an inquiry <Icon name="arrow" size={18}/></Link><Link className="button outline-light" href="/products">View products</Link></div></section>;
}

export function FeatureCard({ icon, title, text }: { icon: "factory" | "globe" | "shield" | "leaf" | "box" | "flask"; title: string; text: string }) {
  return <article className="feature-card"><span className="icon-tile"><Icon name={icon}/></span><h3>{title}</h3><p>{text}</p></article>;
}

export function ImagePanel({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <div className={`image-panel ${className}`}><Image src={src} alt={alt} fill sizes="(max-width: 800px) 100vw, 50vw" className="cover-image"/></div>;
}
