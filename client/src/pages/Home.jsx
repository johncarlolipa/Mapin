import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Star from "@mui/icons-material/Stars";
import axios from "axios";
import { format } from "timeago.js";

export default function Home({ currentUser }) {
  const [pins, setPins] = React.useState([]);
  const [currentPlaceId, setCurrentPlaceId] = React.useState(null);
  const [newPlace, setNewPlace] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [rating, setRating] = React.useState(0);

  React.useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get(
          "https://mapin-backend.vercel.app/api/pins"
        );
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

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    if (!isNaN(lng) && !isNaN(lat)) {
      setNewPlace({
        lat,
        long: lng,
      });
    }
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
      const res = await axios.post(
        "https://mapin-backend.vercel.app/api/pins",
        newPin
      );
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
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
        {Array.isArray(pins) &&
          pins.map((pin, index) => (
            <React.Fragment key={index}>
              <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom">
                <FmdGoodIcon
                  style={{
                    fontSize: 20,
                    color:
                      pin.username === currentUser ? "tomato" : "slateblue",
                  }}
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
                  <div className="px-8 py-2">
                    <label className="block font-semibold text-red-400 ">
                      Place
                    </label>
                    <h4 className="italic text-sm mb-4">{pin.title}</h4>
                    <label className="block font-semibold text-red-400">
                      Review
                    </label>
                    <p className="italic text-sm mb-4">{pin.description}</p>
                    <label className="block font-semibold text-red-400">
                      Rating
                    </label>
                    <div>{Array(pin.rating).fill(<Star />)}</div>
                    <div className="mt-4">
                      <span className="text-gray-400">
                        Created by{" "}
                        <b className="italic text-blue-400">{pin.username}</b>
                      </span>
                      <div>
                        <span>{format(pin.createdAt)}</span>
                      </div>
                    </div>
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
            <div className="p-6 bg-white">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Enter a title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mt-1 border-black rounded-md shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="review"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Review
                  </label>
                  <textarea
                    id="review"
                    placeholder="Say something about this place"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mt-1 border-black rounded-md shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="rating"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Rating
                  </label>
                  <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full mt-1 border-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-yellow-100 hover:bg-yellow-200 text-black font-semibold rounded-md focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-50"
                >
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
