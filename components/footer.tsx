import Link from "next/link";
import { Icon } from "./icon";
import { CompanyLogo } from "./brand";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid container">
        <div>
          <Link className="brand footer-brand" href="/"><CompanyLogo /></Link>
          <p>Industrial food ingredients engineered with scientific precision and supplied at global scale.</p>
          <div className="cert-row"><span>ISO 22000</span><span>HACCP</span><span>FSSAI</span></div>
        </div>
        <div><h4>Company</h4><Link href="/manufacturing">Manufacturing</Link><Link href="/infrastructure">Infrastructure</Link><Link href="/quality">Quality assurance</Link></div>
        <div><h4>Solutions</h4><Link href="/products">Product range</Link><Link href="/products/potato-flakes">Potato flakes</Link><Link href="/exports">Export markets</Link></div>
        <div><h4>Get in touch</h4><p>Industrial Area Phase II<br />Gujarat, India</p><a href="mailto:sales@dehydrafoods.com">sales@dehydrafoods.com</a><a href="tel:+919081804600">+91 90818 04600</a><a href="tel:+919081804700">+91 90818 04700</a>
          <a href="tel:+919081804800">+91 90818 04800</a></div>
      </div>
      <div className="footer-bottom container"><span>© 2026 De&apos;Hydra Foods. All rights reserved.</span><span>Bulk ingredients. Built for industry.</span></div>
    </footer>
  );
}
