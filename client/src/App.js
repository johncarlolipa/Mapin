import * as React from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      initialViewState={{
        longitude: 46,
        latitude: 17,
        zoom: 4,
      }}
      style={{ width: "98vw", height: 1000 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}

export default App;
