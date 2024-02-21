import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Star from "@mui/icons-material/Stars";

function App() {
  // const [showPopup, setShowPopup] = useState(true);

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
    >
      <Marker longitude={3} latitude={40} anchor="bottom">
        <FmdGoodIcon
          style={{ fontSize: visualViewport.zoom * 7, color: "slateblue" }}
        />
      </Marker>
      {/* {showPopup && ( */}
      <Popup
        longitude={46}
        latitude={17}
        anchor="left"
        closeButton={true}
        closeOnClick={false}
      >
        <div>
          <label>Place</label>
          <h4>Eifell</h4>
          <label>Review</label>
          <p>Beuatiful Place</p>
          <label>Rating</label>
          <div>
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
          <label>Information</label>
          <span>Created by <b>JC</b></span>
          <span>1 hour ago</span>
        </div>
      </Popup>
      {/* )} */}
    </Map>
  );
}

export default App;
