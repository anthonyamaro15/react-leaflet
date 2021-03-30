import { RefObject } from "react";
import L from "leaflet";
import * as esri from "esri-leaflet";

class MapController {
   initializeMap = async (domRef: RefObject<HTMLDivElement>) => {
      if (!domRef.current) return;

      let map = L.map(domRef.current, { center: [45.526, -122.667], zoom: 4 });
      esri.basemapLayer("Gray").addTo(map);

      const featureLayer = esri
         .featureLayer({
            url:
               "https://services.arcgis.com/x494PplYsmeeZsYB/ArcGIS/rest/services/Stronghold_Dashboard_Main/FeatureServer/0",
            style: function () {
               return { color: "#70ca49", weight: 2 };
            },
         })
         .addTo(map);

      featureLayer.bindPopup((e: any) => {
         return L.Util.template(
            `<p>{Country}</p><p>{Program}</p>`,
            e.feature.properties,
         );
      });
   };
}

const mapController = new MapController();

export default mapController;
