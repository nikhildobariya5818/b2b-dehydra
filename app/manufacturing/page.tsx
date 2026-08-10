import Link from "next/link";
import { Icon } from "@/components/icon";
import { CTA, ImagePanel, PageHero, SectionTitle } from "@/components/ui";

const steps = ["Farm sourcing", "Cleaning & prep", "Precision processing", "Low-temp dehydration", "Quality analytics", "Industrial packaging", "Global dispatch"];

export default function ManufacturingPage() {
  return <>
    <PageHero eyebrow="From source to shipment" title="Industrial Precision: Our Manufacturing Journey" text="A controlled, traceable process designed to protect flavor, color, nutrition and functionality at commercial scale." image="/images/manufacturing-1.png"><Link className="button accent" href="/contact">Schedule a facility audit</Link></PageHero>
    <section className="section container"><SectionTitle center eyebrow="The linear standard" title="Seven controlled stages. One consistent outcome." /><div className="process-line">{steps.map((step, i) => <div key={step}><span>{String(i + 1).padStart(2, "0")}</span><b>{step}</b></div>)}</div></section>
    <section className="section container story-grid"><ImagePanel src="/images/manufacturing-2.jpg" alt="Commercial crop sourcing" /><div><SectionTitle eyebrow="01 · Responsible sourcing" title="Raw material quality starts at the farm" text="Approved growers, defined crop varieties and incoming residue checks give every batch a documented starting point." /><div className="check-list"><span><Icon name="check" /> Contract farming network</span><span><Icon name="check" /> Crop maturity standards</span><span><Icon name="check" /> Pesticide screening</span></div></div></section>
    <section className="section container story-grid reverse"><ImagePanel src="/images/manufacturing-3.jpg" alt="Colorful dehydrated vegetable ingredients" /><div><SectionTitle eyebrow="04 · Low-temperature dehydration" title="Preserving what makes the ingredient valuable" text="Tightly managed air flow, humidity and product temperature remove moisture while limiting heat damage and flavor loss." /><div className="tech-stats"><div><strong>Zero-touch</strong><span>Product handling</span></div><div><strong>Smart IoT</strong><span>Line monitoring</span></div><div><strong>±1°C</strong><span>Thermal control</span></div></div></div></section>
    <section className="section automation"><div className="container"><SectionTitle center eyebrow="Future-ready automation" title="Data-led production, human-led assurance" text="Operators supervise automated systems while laboratory teams verify every release decision." /><div className="feature-grid"><div className="feature-card"><h3>Continuous monitoring</h3><p>Critical production variables recorded across each line and shift.</p></div><div className="feature-card"><h3>Full traceability</h3><p>Lot codes connect raw material intake, processing records and shipment data.</p></div><div className="feature-card"><h3>Preventive controls</h3><p>HACCP-defined checks reduce risk before it reaches the finished product.</p></div></div></div></section>
    <CTA title="Verify our industrial standards" text="Arrange a technical review, virtual walkthrough or on-site facility audit with our manufacturing team." />
  </>;
}
