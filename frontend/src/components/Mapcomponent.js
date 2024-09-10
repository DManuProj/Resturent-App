import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icon for markers
const customIcon = new Icon({
  iconUrl: require("../assets/placeholder.png"), // Path to your custom icon
  iconSize: [38, 38],
});

// Custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

// Locations with coordinates
const locations = [
  { lat: 6.9271, lng: 79.8612, name: "Colombo" },
  { lat: 7.2906, lng: 80.6337, name: "Kandy" },
  { lat: 6.0535, lng: 80.221, name: "Galle" },
  { lat: 6.6828, lng: 80.399, name: "Ratnapura" },
  { lat: 7.4863, lng: 80.3623, name: "Kurunegala" },
];

const MapComponent = () => {
  const center = [7.8731, 80.7718]; // Center the map on Sri Lanka

  return (
    <MapContainer
      center={center}
      zoom={8}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {locations.map((location, idx) => (
          <Marker
            key={idx}
            position={[location.lat, location.lng]}
            icon={customIcon}
          >
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapComponent;
