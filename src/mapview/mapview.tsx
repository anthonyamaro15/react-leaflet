import { useEffect, useRef } from "react";
import mapController from "../controllers/MapController";

function MapView() {
   const mapDiv = useRef(null);

   useEffect(() => {
      mapController.initializeMap(mapDiv);
   }, []);
   return <div id="map" style={{ height: "50vh" }} ref={mapDiv}></div>;
}

export default MapView;
