"use client";

import React, { useEffect, useRef } from "react";

interface GoogleMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  title?: string;
}

export function GoogleMap({ latitude, longitude, zoom = 15, title = "Location" }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Check if Google Maps API is loaded
    if (typeof window !== "undefined" && window.google) {
      const location = { lat: latitude, lng: longitude };

      // Initialize map
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          zoom,
          center: location,
          mapTypeControl: true,
          fullscreenControl: true,
          streetViewControl: true,
        });
      }

      // Add marker
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      markerRef.current = new window.google.maps.Marker({
        position: location,
        map: mapInstanceRef.current,
        title,
      });

      // Optional: Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="padding: 10px;"><strong>${title}</strong></div>`,
      });

      markerRef.current.addListener("click", () => {
        infoWindow.open(mapInstanceRef.current, markerRef.current!);
      });
    }
  }, [latitude, longitude, zoom, title]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    />
  );
}

// Load Google Maps Script
export function GoogleMapsScript() {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set");
      return;
    }

    // Check if script is already loaded
    if (window.google?.maps) return;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Optionally remove script on cleanup
    };
  }, []);

  return null;
}
