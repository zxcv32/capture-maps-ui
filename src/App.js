import './App.css';
import {React, useState} from 'react'
import {MapAp, specs} from "./component/Map"
import configData from './config'

function App() {

  const defaultZoom = 15
  const defaultRadius = 5
  const [zoom, setZoom] = useState(defaultZoom);
  const [radius, setRadius] = useState(defaultRadius);

  function Send(props) {
    props.zoom = zoom
    props.radius = radius
    console.log(JSON.stringify(props))
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      mode: 'no-cors',
      body: JSON.stringify(props),
      responseType: "blob"
    };
    const url = configData.API_HOST + "print"
    fetch(url, requestOptions)
    .then(response => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "capture.png");
        document.body.appendChild(link);
        // link.click();
      });
    })

    .catch(err => {
      console.log(err);
    });
  }

  return (
      <div className="App">
        <div><h1>Capture Maps</h1>
          <InputForm/>
        </div>
        <MapAp/>
      </div>
  );

  function InputForm() {
    return (
        <form>
          <label>Zoom
            <input type="number" placeholder={defaultZoom}
                   value={zoom}
                   onChange={(e) => {
                     setZoom(parseInt(e.target.value))
                   }}/>
          </label>
          <br/>
          <label>Radius
            <input type="number" placeholder={defaultRadius}
                // defaultValue={defaultRadius}
                   value={radius}
                   onChange={(e) => {
                     setRadius(parseInt(e.target.value))
                   }}/>
          </label>
          <br/>
          <input type="button" value={"Capture"} onClick={() => Send(specs)}/>
        </form>
    )
  }
}

export default App;
