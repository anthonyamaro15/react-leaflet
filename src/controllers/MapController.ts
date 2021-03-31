import { RefObject } from "react";
import L from "leaflet";
import * as esri from "esri-leaflet";
import store from "../store/store";
import { setLayerData, setMapLoaded } from "../store/slices/mapSlice";

class MapController {
   initializeMap = async (domRef: RefObject<HTMLDivElement>) => {
      if (!domRef.current) return;

      let map = L.map(domRef.current, { center: [45.526, -122.667], zoom: 4 });
      esri.basemapLayer("Gray").addTo(map);

      const featureLayer = esri.featureLayer({
         url:
            "https://services.arcgis.com/x494PplYsmeeZsYB/ArcGIS/rest/services/Stronghold_Dashboard_Main/FeatureServer/0",
      });

      featureLayer.on("load", () => {
         featureLayer.bindPopup((e: any) => {
            store.dispatch(setLayerData(e.feature.properties));
            return L.Util.template(
               `<p>title: {BiomeMetricName}</p><p>Program: {Program}</p> <p>Project Name: {WCSPROGRAMS_ProjectName}</p><p>Shape Area: {Shape__Area}</p>`,
               e.feature.properties,
            );
         });
         store.dispatch(setMapLoaded(true));
      });

      featureLayer.addTo(map);
   };
}

const mapController = new MapController();

export default mapController;
