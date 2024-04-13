import React, { useState } from "react";
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";

const customIcon = new Icon({
  iconUrl: require("./placeholder.png"),
  iconSize: [38, 38]
});

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

export default function App() {
  const [markers, setMarkers] = useState([]);

  const addMarker = (latitude, longitude, popup, link) => {
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { geocode: [latitude, longitude], popUp: popup, link: link }
    ]);
  };

  return (
    <div>
      <MapContainer center={[20.5937, 78.9629]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>
                <div>
                  <p>{marker.popUp}</p>
                  <a
                    href={marker.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      
      <h2 className="heading2">Add Marker</h2>
      <div className="FormContainer">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const latitude = parseFloat(e.target.latitude.value);
            const longitude = parseFloat(e.target.longitude.value);
            const popup = e.target.popup.value;
            const link = e.target.link.value;
            if (!isNaN(latitude) && !isNaN(longitude)) {
              addMarker(latitude, longitude, popup, link);
            }
          }}
        >
          <label>
            Latitude: <br />
            <input type="text" name="latitude" placeholder="Enter Latitude" />
          </label>
          <label>
            Longitude: <br />
            <input type="text" name="longitude" placeholder="Enter Longitude" />
          </label>
          <label>
            Popup Text: <br />
            <input type="text" name="popup" placeholder="Enter Popup Text" />
          </label>
          <label>
            Link:   <br />
            <input type="text" name="link" placeholder="Enter Link" />
          </label>
          <button type="submit">ADD MARKER</button>
        </form>
      </div>
    </div>
  );
}
