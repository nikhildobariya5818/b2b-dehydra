import Image from "next/image";

export function CompanyLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Image
      src= "/images/company-short-logo.png"
      alt=""
      width={compact ? 48 : 220}
      height={compact ? 48 : 64}
      className={compact ? "company-logo compact" : "company-logo"}
      priority
    />
  );
}

export function CertificationLogos({ items = ["ISO 22000", "HACCP", "FSSAI", "HALAL", "GMP"] }: { items?: string[] }) {
  return (
    <div className="certification-logos" aria-label="Certifications">
      {items.map((item) => (
        <div className="certification-logo" key={item}>
          <span className="certification-seal">✓</span>
          <strong>{item}</strong>
          <small>Certified system</small>
        </div>
      ))}
    </div>
  );
}
