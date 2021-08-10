//importing the usestate hook
//the usestate allows us to add a state to our fucntional components
import { useState } from 'react';

//importing the ReactMapGl , marker 
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

//importing the room marker
import { Room, Star } from '@material-ui/icons';

//importing the app.css file
import "./app.css";

function App() {
    //the usestate hook defining and seting the viewport
    //https://visgl.github.io/react-map-gl/docs/get-started/get-started
    const [viewport, setViewport] = useState({
        width: "100vw", //making full view width
        height: "100vh", //making full view height
        latitude: 20.5937,
        longitude: 78.9629,
        zoom: 4 //zooming in the map
    });
    return (
        <div className="App">
            <ReactMapGL
                {...viewport}
                //providing the max access token for the api
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira" //this map style i found on internet seemed much better than the traditional grey one
            >
                <Marker //marker :-https://visgl.github.io/react-map-gl/docs/api-reference/marker
                    latitude={27.1751} //latitude of marker
                    longitude={78.0421} //longitutde of marker
                    offsetLeft={-20}
                    offsetTop={-10}>
                    <Room style={{ fontSize: viewport.zoom * 7, color: 'slateblue' }} />
                </Marker>
                {/* <Popup //popup:- https://visgl.github.io/react-map-gl/docs/api-reference/popup
                    latitude={27.1751} //latitude of the popup
                    longitude={78.0421} //logitutde of the popup
                    closeButton={true} //providing close button
                    closeOnClick={false} //whether to close or not when clicked close button
                    anchor="left" //the anchor position  
                >
                    <div className="card">
                        <label>Place</label>
                        <h4 className="place">Taj Mahal</h4>
                        <label>Review</label>
                        <p className="desc">Beautiful place. I like it.</p>
                        <label>Rating</label>
                        <div className="stars">
                            <Star className="star" />
                            <Star className="star" />
                            <Star className="star" />
                            <Star className="star" />
                            <Star className="star" />
                        </div>
                        <label>Information </label>
                        <span className="username">Created by <b>Saurav</b> </span>
                        <span className="date">1 hour ago </span>
                    </div>
                </Popup> */}
            </ReactMapGL>
        </div>
    );
}

export default App;