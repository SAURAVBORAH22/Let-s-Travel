//importing the usestate hook
//the usestate allows us to add a state to our fucntional components
import { useEffect, useState } from 'react';

//importing the ReactMapGl , marker 
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

//importing the room marker
import { Room, Star } from '@material-ui/icons';

//importing the app.css file
import "./app.css";

//importing axios
import axios from "axios";

//importing format
import { format } from "timeago.js";

//import Register
import Register from "./components/Register";

function App() {
    //creating a useState hook for setting the currentuser 
    const [currentUser, setCurrentUser] = useState(null);

    //creating a usestate hook for setting and using pins
    const [pins, setPins] = useState([]);

    //creating another useState hook for setting currentplaceid
    const [currentPlaceId, setCurrentPlaceId] = useState(null);

    //creating another useState hook for setting up a new place in our map
    const [newPlace, setNewPlace] = useState(null);

    //creating a usestate hook for setting title
    const [title, setTitle] = useState(null);

    //creating a usestate hook for setting description
    const [desc, setDesc] = useState(null);

    //creating a usestate hook for setting rating
    const [rating, setRating] = useState(0);


    //the usestate hook defining and seting the viewport
    //https://visgl.github.io/react-map-gl/docs/get-started/get-started
    const [viewport, setViewport] = useState({
        width: "100vw", //making full view width
        height: "100vh", //making full view height
        latitude: 20.5937,
        longitude: 78.9629,
        zoom: 4 //zooming in the map
    });

    //useeffect tells the react component what it need to do after render
    useEffect(() => {
        //creating a async function getPins to send a get all the pins
        const getPins = async () => {
            try {
                //axios will allow use to connect to our api in out backend
                const res = await axios.get("/pins");
                setPins(res.data);//setting the pins with all data inside from the db
            } catch (err) {
                console.log(err);//logging the error
            }
        };
        getPins();
    }, []//empty array because we are gonna fire the useffect at the begining
    );

    //handling the marker on click
    const handleMarkerClick = (id, lat, long) => {
        setCurrentPlaceId(id);
        //centering the popup
        setViewport({ ...viewport, latitude: lat, longitude: long });
    };

    //handling on double click
    const handleAddClick = (e) => {
        const [long, lat] = e.lngLat;
        setNewPlace({
            lat,
            long,
        });
    };


    //function to handle submit
    const handleSubmit = async (e) => {
        e.preventDefault(); //calling this during any stage of event flow cancels the event
        //creating object const new pin
        const newPin = {
            username: currentUser,
            title,
            desc,
            rating,
            lat: newPlace.lat,
            long: newPlace.long,
        }

        try {
            const res = await axios.post("/pins", newPin);//posting info to backend 
            setPins([...pins, res.data]);//adding the new pin to the pins array
            setNewPlace(null);//clearing the new place
        } catch (err) {
            console.log(err);//logging the error
        }
    }

    return (
        <div className="App">
            <ReactMapGL
                {...viewport}
                //providing the max access token for the api
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira" //this map style i found on internet seemed much better than the traditional grey one
                onDblClick={handleAddClick}//handling the double click
                transitionDuration="200" //transition duration for which the map will animate
            >
                {pins.map(p => ( //for every pin we are defining the below properties
                    <>
                        <Marker //marker :-https://visgl.github.io/react-map-gl/docs/api-reference/marker
                            latitude={p.lat} //latitude of marker
                            longitude={p.long} //longitutde of marker
                            offsetLeft={-viewport.zoom * 3.5} //offset left
                            offsetTop={-viewport.zoom * 7} //offset top
                        >
                            <Room style={{ fontSize: viewport.zoom * 7, color: p.username === currentUser ? "tomato" : "slateblue", cursor: "pointer" }}
                                onClick={() => handleMarkerClick(p._id, p.lat, p.long)} //function to handle the marker on click
                            />
                        </Marker>
                        {p._id === currentPlaceId && ( //if pin id is equal to the currentplace id then we can open this popup
                            < Popup //popup:- https://visgl.github.io/react-map-gl/docs/api-reference/popup
                                latitude={p.lat} //latitude of the popup
                                longitude={p.long} //logitutde of the popup
                                closeButton={true} //providing close button
                                closeOnClick={false} //whether to close or not when clicked close button
                                anchor="left" //the anchor position  
                                onClose={() => setCurrentPlaceId(null)} //closing the popup
                            >
                                <div className="card">
                                    <label>Place</label>
                                    <h4 className="place">{p.title}</h4>
                                    <label>Review</label>
                                    <p className="desc">{p.desc}</p>
                                    <label>Rating</label>
                                    <div className="stars">
                                        {/* taking the rating as an array and filling it with stars component */}
                                        {Array(p.rating).fill(<Star className="star" />)}
                                    </div>
                                    <label>Information </label>
                                    <span className="username">Created by <b>{p.username}</b> </span>
                                    <span className="date">{format(p.createdAt)} </span>
                                </div>
                            </Popup>
                        )}
                    </>
                ))}
                {/* creating another popup  */}]
                {/* if there is a new place then we can open this popup */}
                {newPlace && (
                    < Popup //popup:- https://visgl.github.io/react-map-gl/docs/api-reference/popup
                        latitude={newPlace.lat} //latitude of the new palce
                        longitude={newPlace.long} //logitutde of the new place
                        closeButton={true} //providing close button
                        closeOnClick={false} //whether to close or not when clicked close button
                        anchor="left" //the anchor position  
                        onClose={() => setNewPlace(null)} //closing the popup
                    >
                        <div>
                            <form onSubmit={handleSubmit}>
                                {/* form to add a new pin */}
                                <label>Title</label>
                                <input placeholder="Enter a title"
                                    onChange={(e) => setTitle(e.target.value)} />
                                <label>Review</label>
                                <textarea placeholder="Say us something about this place."
                                    onChange={(e) => setDesc(e.target.value)} />
                                <label>Rating</label>
                                <select onChange={(e) => setRating(e.target.value)} >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <button className="submitButton" type="submit">
                                    Add Pin
                                </button>
                            </form>
                        </div>
                    </Popup>
                )}
                {/* if there is current user than we can only logout */}
                {/* else we should se the login and register button */}
                {currentUser ? (<button className="button logout">Log out</button>
                ) : (
                    <div className="buttons">
                        <button className="button login">Login</button>
                        <button className="button register">Register</button>
                    </div>
                )}
                <Register/>
            </ReactMapGL>
        </div >
    );
}

export default App;