"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "./icon";

interface Product { id: string; name: string; slug: string; }

function ContactFormFields() {
  const searchParams = useSearchParams();
  const requestType = searchParams.get("requestType") || "general";
  const productId = searchParams.get("productId") || "";
  const productName = searchParams.get("productName") || "";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({ contactName: "", companyName: "", email: "", phone: "", industry: "", estimatedVolume: "", interestedProducts: productName, message: requestType === "sample" ? `I would like to request a sample of ${productName}.` : requestType === "specifications" ? `Please send me the technical specifications and brochure for ${productName}.` : "" });

  useEffect(() => { fetch("/api/products").then((res) => res.json()).then((data) => setProducts(data || [])).catch((err) => console.error("Failed to fetch products:", err)); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending");
    try {
      const response = await fetch("/api/client-requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...formData, phone: formData.phone || undefined, estimatedVolume: formData.estimatedVolume || undefined, requestType, productId: productId || undefined }) });
      if (!response.ok) throw new Error("Failed to submit");
      setStatus("sent"); setFormData({ contactName: "", companyName: "", email: "", phone: "", industry: "", estimatedVolume: "", interestedProducts: "", message: "" });
    } catch (error) { console.error("Form submission error:", error); setStatus("error"); }
  }

  return <form className="inquiry-form" onSubmit={submit}>
    <div className="form-head"><span>{requestType === "sample" ? "Sample request" : requestType === "specifications" ? "Brochure & specification request" : "Enterprise inquiry"}</span><b>Fields marked * are required</b></div>
    <div className="form-grid">
      <label>Full name *<input type="text" name="contactName" value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} required autoComplete="name" placeholder="Your name" /></label>
      <label>Company name *<input type="text" name="companyName" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} required autoComplete="organization" placeholder="Company or group" /></label>
      <label>Work email *<input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required autoComplete="email" placeholder="name@company.com" /></label>
      <label>Phone number<input type="tel" name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} autoComplete="tel" placeholder="Country code + number" /></label>
      <label>Industry *<select name="industry" value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} required><option value="" disabled>Select industry</option><option>Food manufacturing</option><option>HoReCa</option><option>Import / export</option><option>Retail / private label</option><option>Pharmaceuticals</option></select></label>
      <label>Monthly volume<select name="estimatedVolume" value={formData.estimatedVolume} onChange={(e) => setFormData({ ...formData, estimatedVolume: e.target.value })}><option value="">Select estimated volume</option><option>Below 5 MT</option><option>5–20 MT</option><option>20–50 MT</option><option>50 MT+</option></select></label>
      <label className="full">Interested products *<select name="interestedProducts" value={formData.interestedProducts} onChange={(e) => setFormData({ ...formData, interestedProducts: e.target.value })} required><option value="" disabled>Select product</option>{products.map((product) => <option key={product.id} value={product.name}>{product.name}</option>)}</select></label>
      <label className="full">Requirement details *<textarea name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={5} placeholder="Tell us the application, specification, destination and expected annual demand." /></label>
    </div>
    <div className="form-submit"><p>By submitting, you agree to be contacted about this business inquiry.</p><button className="button accent" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Submit formal inquiry"}<Icon name="arrow" size={18} /></button></div>
    {status === "sent" && <p className="form-message success">Thank you. Your request has been received and our enterprise team is reviewing it.</p>}
    {status === "error" && <p className="form-message error">The inquiry could not be sent. Please email sales@dehydrafoods.com.</p>}
  </form>;
}

export function ContactForm() { return <Suspense fallback={<div className="inquiry-form"><p>Loading inquiry form…</p></div>}><ContactFormFields /></Suspense>; }
