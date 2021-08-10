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

function App() {
    //temporary current user
    const currentUser = "SB"

    //creating a usestate hook for setting and using pins
    const [pins, setPins] = useState([]);

    //creating another useState hook for setting currentplaceid
    const [currentPlaceId, setCurrentPlaceId] = useState(null);

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

    const handleMarkerClick = (id) => {
        setCurrentPlaceId(id);
    };

    return (
        <div className="App">
            <ReactMapGL
                {...viewport}
                //providing the max access token for the api
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira" //this map style i found on internet seemed much better than the traditional grey one
            >
                {pins.map(p => ( //for every pin we are defining the below properties
                    <>
                        <Marker //marker :-https://visgl.github.io/react-map-gl/docs/api-reference/marker
                            latitude={p.lat} //latitude of marker
                            longitude={p.long} //longitutde of marker
                            offsetLeft={-20}
                            offsetTop={-10}>
                            <Room style={{ fontSize: viewport.zoom * 7, color: p.username===currentUser?"tomato":"slateblue", cursor:"pointer" }}
                                onClick={() => handleMarkerClick(p._id)} //function to handle the marker on click
                            />
                        </Marker>
                        {p._id === currentPlaceId && ( //if pin id is equal to the currentplace id then we can open this popup
                            < Popup //popup:- https://visgl.github.io/react-map-gl/docs/api-reference/popup
                                latitude={p.lat} //latitude of the popup
                                longitude={p.long} //logitutde of the popup
                                closeButton={true} //providing close button
                                closeOnClick={false} //whether to close or not when clicked close button
                                anchor="left" //the anchor position  
                                onClose={()=>setCurrentPlaceId(null)} //closing the popup
                            >
                                <div className="card">
                                    <label>Place</label>
                                    <h4 className="place">{p.title}</h4>
                                    <label>Review</label>
                                    <p className="desc">{p.desc}</p>
                                    <label>Rating</label>
                                    <div className="stars">
                                        <Star className="star" />
                                        <Star className="star" />
                                        <Star className="star" />
                                        <Star className="star" />
                                        <Star className="star" />
                                    </div>
                                    <label>Information </label>
                                    <span className="username">Created by <b>{p.username}</b> </span>
                                    <span className="date">{format(p.createdAt)} </span>
                                </div>
                            </Popup>
                        )}
                    </>
                ))}
            </ReactMapGL>
        </div >
    );
}

export default App;