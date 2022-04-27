import './App.css';
import React from 'react'
import {MapAp, specsx} from "./component/Map"

function App() {

  function Send(props) {
    console.log(
        "lat: " + props.lat + " lng: " + props.lng + " zoom: " + props.zoom);
  }

  return (
      <div className="App">
        <div><p>Capture Maps</p>
          <button onClick={() => Send(specsx)}>Capture</button>
        </div>
        <MapAp/>
      </div>
  );
}

export default App;
