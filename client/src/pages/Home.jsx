import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Star from "@mui/icons-material/Stars";
import axios from "axios";
import { format } from "timeago.js";

export default function Home () {
  const currentUser = "jc";
  const [pins, setPins] = React.useState([]);
  const [currentPlaceId, setCurrentPlaceId] = React.useState(null);
  const [newPlace, setNewPlace] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [rating, setRating] = React.useState(0);

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

  const handleMarkerClick = (id, lat, lng) => {
    setCurrentPlaceId(id);
  };

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    setNewPlace({
      lat,
      long: lng,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      description,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (error) {
      console.log(error);
    }
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
      onDblClick={handleAddClick}
      transitionDuration="200"
    >
      {pins.map((pin, index) => (
        <React.Fragment key={index}>
          <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom">
            <FmdGoodIcon
              style={{
                fontSize: 20,
                color: pin.username === currentUser ? "tomato" : "slateblue",
              }}
              onClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)}
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
                <div>{Array(pin.rating).fill(<Star />)}</div>
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
      {newPlace && (
        <Popup
          longitude={newPlace.long}
          latitude={newPlace.lat}
          anchor="left"
          closeButton={true}
          closeOnClick={false}
          onClose={() => setNewPlace(null)}
        >
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                placeholder="Enter a title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Review</label>
              <textarea
                placeholder="Say something about this place"
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button>Add Pin</button>
            </form>
          </div>
        </Popup>
      )}
{/* Navbar */}
    </Map>
  );
}
