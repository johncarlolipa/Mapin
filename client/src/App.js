import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Star from "@mui/icons-material/Stars";
import axios from "axios";
import { format } from "timeago.js";

function App() {
  const currentUser = "jc low"
  const [pins, setPins] = React.useState([]);
  const [currentPlaceId, setCurrentPlaceId] = React.useState(null);

  React.useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

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
      {pins.map((pin, index) => (
        <React.Fragment key={index}>
          <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom">
            <FmdGoodIcon
              style={{ fontSize: visualViewport.zoom * 7, color: pin.username === currentUser ? "tomato" : "slateblue" }}
              onClick={() => handleMarkerClick(pin._id)}
              className="cursor-pointer"
            />
          </Marker>
          {pin._id === currentPlaceId && (
            <Popup
              longitude={pin.long}
              latitude={pin.lat}
              anchor="left"
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
            >
              <div>
                <label>Place</label>
                <h4>{pin.title}</h4>
                <label>Review</label>
                <p>{pin.description}</p>
                <label>Rating</label>
                <div>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <label>Information</label>
                <span>
                  Created by <b>{pin.username}</b>
                </span>
                <span>{format(pin.createdAt)}</span>
              </div>
            </Popup>
          )}
        </React.Fragment>
      ))}
    </Map>
  );
}

export default App;
