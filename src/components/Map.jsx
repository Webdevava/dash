import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

// Function to create a custom Leaflet icon using SVG from Lucide
const createIcon = (svg) => {
  return icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svg)}`, // Convert SVG to base64
    iconSize: [30, 30], // Adjust size as needed
    iconAnchor: [15, 30], // Adjust anchor as needed
  });
};

// SVG data for the Lucide icon you want to use
const locationImg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`;


const ICON = createIcon(locationImg);

export default function Map({ devices }) {
  return (
    <MapContainer
      center={[18.7357, -70.1627]}
      zoom={8}
      style={{ height: "350px", borderRadius: "12px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {devices.map((device) => (
        <Marker key={device.id} position={device.location} icon={ICON}>
          <Popup>{device.id}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
