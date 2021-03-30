import { useEffect, useRef } from "react";
import mapController from "./controllers/MapController";

function App() {
   const mapDiv = useRef(null);

   useEffect(() => {
      mapController.initializeMap(mapDiv);
   }, []);
   return <div id="map" style={{ height: "100vh" }} ref={mapDiv}></div>;
}

export default App;
