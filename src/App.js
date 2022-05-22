import './App.css';
import React, {useState} from 'react'
import {MapAp, specs} from "./component/Map"
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Badge from 'react-bootstrap/Badge'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import configData from './config'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from "react-bootstrap";

function App() {
  const [displayLat, setDisplayLat] = useState(specs.lat)
  const [displayLng, setDisplayLng] = useState(specs.lng)
  const [mapZoom, setMapZoom] = useState(specs.zoom)
  const [mapTypeId, setMapTypeId] = useState(specs.mapTypeId)
  const [displayTileResolution, setDisplayTileResolution] = useState("512x512")

  const [displayError, setDisplayError] = useState("")
  const [displayErrorShow, setDisplayErrorShow] = useState(false);

  const defaultZoom = specs.zoom
  const defaultRadius = specs.radius

  let [formZoom, setFormZoom] = useState(defaultZoom);
  let [formRadius, setFormRadius] = useState(defaultRadius);
  let [disable, setDisable] = useState(false);

  async function Send() {
    if (disable) {
      return;
    }
    let data = {
      lat: displayLat,
      lng: displayLng,
      zoom: formZoom,
      radius: formRadius,
      mapTypeId: mapTypeId
    }
    setDisable(true);

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      mode: 'cors',
      body: JSON.stringify(data),
    };
    const url = configData.API_HOST + "print"
    await fetch(url, requestOptions)  // blocking action
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => {
          setDisplayError(text);
          setDisplayErrorShow(true);
          throw new Error(text);
        });
      }
      return response
    }).then((response) => response.blob())
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
    }).catch(() => {
    });
    setDisable(false)
  }

  return (
      <div className="App">
        <div><h1>Capture Maps</h1>
          <Container>
            <Row>
              <Col style={{height: `90vh`}}><MapAp
                  setDisplayLat={setDisplayLat} setDisplayLng={setDisplayLng}
                  setMapZoom={setMapZoom} setMapTypeId={setMapTypeId}
                  setFormZoom={setFormZoom}/></Col>
              <Col md="2" lg="2" id={"inputForm"}>
                <InputForm/>
                <div className={"align-items-baseline"} style={{height: `500px`}}>
                  <a target="_blank"
                     href="https://github.com/zxcV32/capture-maps-ui"><Badge
                      bg="light" text="dark"><img
                      src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                      height={"32px"}/> Capture Maps UI</Badge></a>
                  <br/>
                  <br/>
                  <a target="_blank"
                     href="https://github.com/zxcV32/capture-maps-api"><Badge
                      bg="light" text="dark"><img
                      src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                      height={"32px"}/> Capture Maps API</Badge></a>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
  );

  function InputForm() {

    return (
        <form>
          <OverlayTrigger
              key="right"
              placement="right"
              overlay={
                <Tooltip id="tooltip-right">
                  Map detail level. [0,21]
                </Tooltip>
              }
          >
            <label>Capture Zoom Level&nbsp;
              <input type="number" placeholder={defaultZoom.toString()}
                     defaultValue={formZoom.toString()}
                     onChange={(e) => {
                       setFormZoom(parseInt(e.target.value))
                       setDisplayErrorShow(false);
                     }}/>
            </label>
          </OverlayTrigger>
          <br/><br/>
          <OverlayTrigger
              key="right"
              placement="right"
              overlay={
                <Tooltip id="tooltip-right">
                  Number of images in one direction. Total images =
                  (2*radius-1)^2. [1,15]
                </Tooltip>
              }
          >
            <label>Capture Tile Radius&nbsp;
              <input type="number" placeholder={defaultRadius.toString()}
                     defaultValue={formRadius.toString()}
                     onChange={(e) => {
                       setFormRadius(parseInt(e.target.value))
                       setDisplayErrorShow(false);
                     }}/>
            </label>
          </OverlayTrigger>
          <br/><br/>
          <small>
            Latitude:&nbsp;{displayLat},
            Longitude:&nbsp;{displayLng},
            Tile&nbsp;Resolution:&nbsp;{displayTileResolution},
            Map&nbsp;Zoom:&nbsp;{mapZoom}
          </small>
          <br/><br/>
          <Error/>
          <Button disabled={disable}
                  onClick={() => Send()}>{disable ? <span><Spinner
                  animation="border" size="sm" variant="dark"/> Capturing...</span>
              : 'Capture'} </Button>
          <br/><br/>
        </form>
    )
  }

  function Error() {
    if (displayErrorShow) {
      return (
          <Alert key="danger" variant="danger">
            {displayError}
          </Alert>
      )
    }
  }
}

export default App;
