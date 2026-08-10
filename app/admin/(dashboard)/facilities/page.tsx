"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/icon";

interface Facility {
  id: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  description?: string;
  type?: string;
}

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Facility | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    description: "",
    type: "manufacturing",
  });

  useEffect(() => {
    loadFacilities();
  }, []);

  async function loadFacilities() {
    try {
      const response = await fetch("/api/facilities");
      const data = await response.json();
      setFacilities(data);
    } catch (error) {
      console.error("Failed to load facilities:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const url = editing ? `/api/facilities/${editing.id}` : "/api/facilities";
      const method = editing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await loadFacilities();
        setFormData({
          name: "",
          address: "",
          latitude: "",
          longitude: "",
          description: "",
          type: "manufacturing",
        });
        setEditing(null);
        alert("Facility saved successfully!");
      } else {
        alert("Failed to save facility");
      }
    } catch (error) {
      console.error("Error saving facility:", error);
      alert("Error saving facility");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this facility?")) return;

    try {
      const response = await fetch(`/api/facilities/${id}`, { method: "DELETE" });
      if (response.ok) {
        await loadFacilities();
        alert("Facility deleted successfully!");
      } else {
        alert("Failed to delete facility");
      }
    } catch (error) {
      console.error("Error deleting facility:", error);
      alert("Error deleting facility");
    }
  }

  function startEdit(facility: Facility) {
    setEditing(facility);
    setFormData({
      name: facility.name,
      address: facility.address,
      latitude: facility.latitude,
      longitude: facility.longitude,
      description: facility.description || "",
      type: facility.type || "manufacturing",
    });
  }

  function cancelEdit() {
    setEditing(null);
    setFormData({
      name: "",
      address: "",
      latitude: "",
      longitude: "",
      description: "",
      type: "manufacturing",
    });
  }

  if (loading) {
    return <div className="admin-container"><p>Loading facilities...</p></div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Facility Management</h1>
        <p>Manage your business locations for Google Maps display</p>
      </div>

      <div className="admin-card">
        <h2>{editing ? "Edit Facility" : "Add New Facility"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Facility Name *
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g., Manufacturing Plant A"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Address *
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                placeholder="Full address"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Latitude *
              <input
                type="number"
                step="0.0000001"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                required
                placeholder="e.g., 40.7128"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Longitude *
              <input
                type="number"
                step="0.0000001"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                required
                placeholder="e.g., -74.0060"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Type
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="manufacturing">Manufacturing</option>
                <option value="warehouse">Warehouse</option>
                <option value="office">Office</option>
                <option value="distribution">Distribution Center</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Description
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional description"
                rows={3}
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="button primary">
              {editing ? "Update Facility" : "Add Facility"}
            </button>
            {editing && (
              <button type="button" onClick={cancelEdit} className="button secondary">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h2>Your Facilities ({facilities.length})</h2>
        {facilities.length === 0 ? (
          <p>No facilities added yet.</p>
        ) : (
          <div className="facilities-list">
            {facilities.map((facility) => (
              <div key={facility.id} className="facility-item">
                <div className="facility-info">
                  <h3>{facility.name}</h3>
                  <p>{facility.address}</p>
                  <p className="facility-meta">
                    Lat: {facility.latitude} | Lng: {facility.longitude}
                    {facility.type && ` | ${facility.type}`}
                  </p>
                  {facility.description && <p>{facility.description}</p>}
                </div>
                <div className="facility-actions">
                  <button onClick={() => startEdit(facility)} className="button small">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(facility.id)} className="button small danger">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
