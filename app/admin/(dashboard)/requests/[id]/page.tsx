"use client";

import { useState, useEffect, FormEvent } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function RequestDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingBrochure, setIsSendingBrochure] = useState(false);
  const [sendMessage, setSendMessage] = useState("");

  useEffect(() => {
    fetchRequest();
  }, [id]);

  async function fetchRequest() {
    try {
      setLoading(true);
      const response = await fetch(`/api/client-requests/${id}`);
      if (!response.ok) throw new Error("Failed to load request");
      const data = await response.json();
      setRequest(data);
      setStatus(data.status);
      setNotes(data.notes || "");
    } catch (err) {
      setError("Failed to load request details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`/api/client-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });

      if (!response.ok) throw new Error("Failed to update");
      const updated = await response.json();
      setRequest(updated);
      setError("");
      // Show success
      alert("Request updated successfully");
    } catch (err) {
      setError("Failed to update request");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  }

  if (loading) {
    return <div className="admin-header"><p>Loading...</p></div>;
  }

  async function sendBrochure() {
    setIsSendingBrochure(true);
    setSendMessage("");
    try {
      const response = await fetch(`/api/client-requests/${id}/send-brochure`, { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to send brochure");
      setSendMessage("Brochure email sent successfully.");
      setStatus("responded");
    } catch (err) {
      setSendMessage(err instanceof Error ? err.message : "Unable to send brochure.");
    } finally {
      setIsSendingBrochure(false);
    }
  }

  if (!request) {
    return (
      <div>
        <div className="admin-header">
          <h1>Request Not Found</h1>
        </div>
        <Link href="/admin/requests" className="btn btn-secondary">
          Back to Requests
        </Link>
      </div>
    );
  }

  let interestedProducts: string[] = [];
  try {
    const parsed = JSON.parse(request.interestedProducts || "[]");
    interestedProducts = Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    // If it's not valid JSON, treat it as a single string value
    interestedProducts = request.interestedProducts ? [request.interestedProducts] : [];
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Client Request Details</h1>
        <p>{request.companyName}</p>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
        <div className="form-container">
          <h2>Request Information</h2>

          <div className="form-group">
            <label>Company Name</label>
            <p style={{ margin: 0, padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
              {request.companyName}
            </p>
          </div>

          <div className="form-group">
            <label>Contact Person</label>
            <p style={{ margin: 0, padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
              {request.contactName}
            </p>
          </div>

          <div className="form-group">
            <label>Email</label>
            <a href={`mailto:${request.email}`} style={{ color: "#00a8cc" }}>
              {request.email}
            </a>
          </div>

          {request.phone && (
            <div className="form-group">
              <label>Phone</label>
              <p style={{ margin: 0, padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                {request.phone}
              </p>
            </div>
          )}

          <div className="form-group">
            <label>Industry</label>
            <p style={{ margin: 0, padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
              {request.industry}
            </p>
          </div>

          <div className="form-group">
            <label>Estimated Volume</label>
            <p style={{ margin: 0, padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
              {request.estimatedVolume || "Not specified"}
            </p>
          </div>

          <div className="form-group">
            <label>Interested Products</label>
            <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
              {interestedProducts.map((product: string, idx: number) => (
                <li key={idx}>{product}</li>
              ))}
            </ul>
          </div>

          <div className="form-group">
            <label>Message</label>
            <div style={{ background: "#f5f5f5", padding: "10px", borderRadius: "4px", whiteSpace: "pre-wrap" }}>
              {request.message}
            </div>
          </div>

          <div className="form-group">
            <label>Submitted Date</label>
            <p style={{ margin: 0 }}>
              {new Date(request.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="form-container">
          <h2>Manage Request</h2>
          <div className="form-actions" style={{ marginBottom: "20px" }}>
            <button type="button" className="btn btn-primary" onClick={sendBrochure} disabled={isSendingBrochure}>
              {isSendingBrochure ? "Sending brochure..." : "Send brochure by email"}
            </button>
            <a className="btn btn-secondary" href={`mailto:${request.email}?subject=${encodeURIComponent("Re: De'Hydra Foods request")}&body=${encodeURIComponent(`Hello ${request.contactName},\\n\\n`)}`}>Quick chat by email</a>
          </div>
          {sendMessage && <p className={sendMessage.includes("successfully") ? "form-message success" : "form-message error"}>{sendMessage}</p>}
          <form onSubmit={handleUpdate} className="form-group" style={{ margin: 0 }}>
            <div className="form-group">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={isSaving}
                required
              >
                <option value="new">New</option>
                <option value="reviewing">Reviewing</option>
                <option value="responded">Responded</option>
                <option value="quoted">Quoted</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Admin Notes</label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Internal notes about this request..."
                disabled={isSaving}
                rows={8}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? "Saving..." : "Update Request"}
              </button>
              <Link href="/admin/requests" className="btn btn-secondary">
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
