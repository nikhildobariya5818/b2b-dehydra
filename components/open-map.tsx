"use client";

export function OpenMap({ className = "", showLocations = true }: { className?: string; showLocations?: boolean }) {
  const query = showLocations ? "Mahuva Gujarat India" : "Gujarat India";

  return (
    <div className={`open-map ${className}`}>
      <iframe
        title="De'Hydra Foods location map"
        className="map-container"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=54.5%2C19.5%2C76.5%2C28.5&layer=mapnik&marker=21.09%2C71.76&query=${encodeURIComponent(query)}`}
        loading="lazy"
      />
      <a className="map-label" href="https://www.openstreetmap.org/?mlat=21.09&mlon=71.76#map=5/23.0/65.0" target="_blank" rel="noreferrer">Open interactive map</a>
    </div>
  );
}
