"use client";

import { GoogleMap, GoogleMapsScript } from "@/components/google-map";

interface Facility {
  id: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  description?: string | null;
  type?: string | null;
}

interface LocationsClientProps {
  facilities: Facility[];
}

export function LocationsClient({ facilities }: LocationsClientProps) {
  const mainFacility = facilities[0];

  return (
    <>
      <GoogleMapsScript />
      <div className="locations-grid">
        {facilities.length === 0 ? (
          <p>No facilities available at this time.</p>
        ) : (
          <>
            {/* Main Map */}
            <div className="main-map">
              {mainFacility && (
                <GoogleMap
                  latitude={parseFloat(mainFacility.latitude as any)}
                  longitude={parseFloat(mainFacility.longitude as any)}
                  zoom={16}
                  title={mainFacility.name}
                />
              )}
            </div>

            {/* Facilities List */}
            <div className="facilities-info">
              {facilities.map((facility, index) => (
                <div key={facility.id} className="facility-card">
                  <div className="facility-badge">{index + 1}</div>
                  <h3>{facility.name}</h3>
                  <p className="facility-type">{facility.type || "Facility"}</p>
                  <p className="facility-address">{facility.address}</p>
                  {facility.description && <p>{facility.description}</p>}
                  <div className="facility-coords">
                    <small>
                      📍 {facility.latitude}, {facility.longitude}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .locations-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin: 2rem 0;
        }

        .main-map {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .facilities-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .facility-card {
          background: var(--bg-secondary, #f5f5f5);
          padding: 1.5rem;
          border-radius: 8px;
          position: relative;
          border-left: 4px solid var(--accent, #007bff);
        }

        .facility-badge {
          position: absolute;
          top: -12px;
          left: 20px;
          background: var(--accent, #007bff);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }

        .facility-card h3 {
          margin: 0.5rem 0 0.25rem;
          font-size: 1.25rem;
        }

        .facility-type {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary, #666);
          text-transform: capitalize;
        }

        .facility-address {
          margin: 0.5rem 0;
          font-size: 0.95rem;
        }

        .facility-coords {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .locations-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
