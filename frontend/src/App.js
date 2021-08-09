//importing the usestate hook
//the usestate allows us to add a state to our fucntional components
import { useState } from 'react';

//imporrting the ReactMapGl 
import ReactMapGL from 'react-map-gl';

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
            />
        </div>
    );
}

export default App;