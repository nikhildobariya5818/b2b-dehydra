"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Icon } from "./icon";

const links = [
  ["Products", "/products"],
  ["Manufacturing", "/manufacturing"],
  ["Infrastructure", "/infrastructure"],
  ["Quality", "/quality"],
  ["Exports", "/exports"],
  ["Contact", "/contact"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" href="/" onClick={() => setOpen(false)}>
          {/* <span className="brand-mark"> */}
            <Image src="/images/company-long-logo.png" alt="" width={34} height={34} />
            {/* </span> */}
          {/* <span>De&apos;Hydra <b>Foods</b></span> */}
        </Link>
        <nav className={open ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link key={href} className={pathname.startsWith(href) ? "active" : ""} href={href} onClick={() => setOpen(false)} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}</Link>
          ))}
          <Link className="button primary mobile-quote" href="/contact" onClick={() => setOpen(false)}>Request Quote</Link>
        </nav>
        <div className="nav-actions">
          <Link className="button ghost desktop-only" href="/quality"><Icon name="download" size={17}/> Brochure</Link>
          <Link className="button accent desktop-only" href="/contact">Request Quote</Link>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}
