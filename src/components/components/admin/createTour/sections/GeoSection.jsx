import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

const GeoSection = ({ formData, set }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null); 

  useEffect(() => {
    if (!mapContainer.current || !formData?.geo) return;

    const coordinate = formData.geo.coordinates;
    
    const initMap = async () => {
      const mod = await import("maplibre-gl");
      const maplibregl = mod.default;

      if (mapRef.current) return;

      mapRef.current = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://tiles.openfreemap.org/styles/bright",
        center: [coordinate[0], coordinate[1]],
        zoom: 12,
      });

      markerRef.current = new maplibregl.Marker({ 
        color: "#FF0000",
        draggable: true,
      })
        .setLngLat([coordinate[0], coordinate[1]])
        .addTo(mapRef.current);

      markerRef.current.on('dragend', () => {
        const newPos = markerRef.current.getLngLat();
        set("geo.coordinates", [newPos.lng, newPos.lat]);
      });
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  return (
    <section title="Геолокация">
      <div>{formData?.geo?.coordinates[0].toFixed(3)}</div>
      <div>{formData?.geo?.coordinates[1].toFixed(3)}</div>
      <div 
        ref={mapContainer} 
        style={{ width: '100%', height: '400px' }}
        className="rounded-md border"
      />
    </section>
  );
};

export default GeoSection;

