import './App.css';
import React, {useState} from 'react'
import {MapAp, specs} from "./component/Map"
import Button from 'react-bootstrap/Button'
import configData from './config'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from "react-bootstrap";

function App() {

  const defaultZoom = 15
  const defaultRadius = 5

  let [zoom, setZoom] = useState(defaultZoom);
  let [radius, setRadius] = useState(defaultRadius);
  let [disable, setDisable] = useState(false);

  async function Send(props) {
    if (disable) {
      return;
    }
    setDisable(true);
    props.zoom = zoom
    props.radius = radius
    console.log(JSON.stringify(props))
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      mode: 'cors',
      body: JSON.stringify(props),
    };
    const url = configData.API_HOST + "print"
    await fetch(url, requestOptions)  // blocking action
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(
          new Blob([blob]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
          'download',
          'capture.png',
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch(err => {
      console.log(err);
    });
    setDisable(false)
  }

  return (
      <div className="App">
        <div><h1>Capture Maps</h1>
          <Container>
            <Row>
              <Col style={{height: `90vh`}}><MapAp/></Col>
              <Col md="2" lg="2">
                <InputForm/></Col>
            </Row>
          </Container>
        </div>
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
          <br/><br/>
          <label>Radius
            <input type="number" placeholder={defaultRadius}
                   value={radius}
                   onChange={(e) => {
                     setRadius(parseInt(e.target.value))
                   }}/>
          </label>
          <br/><br/>
          <small>Latitude: {specs.lat}, Longitude: {specs.lng},
            Tile&nbsp;Resolution:
            512x512</small>
          <br/><br/>
          <Button disabled={disable}
                  onClick={() => Send(specs)}>{disable ? 'Capturing...'
              : 'Capture'}</Button>
        </form>
    )
  }
}

export default App;
