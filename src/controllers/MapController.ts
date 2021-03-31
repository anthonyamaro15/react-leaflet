import { RefObject } from "react";
import L from "leaflet";
import * as esri from "esri-leaflet";
import store from "../store/store";
import {
   setLayerData,
   setMapLoaded,
   setProjectNames,
} from "../store/slices/mapSlice";

class MapController {
   #featureLeyer?: any;
   initializeMap = async (domRef: RefObject<HTMLDivElement>) => {
      if (!domRef.current) return;

      let map = L.map(domRef.current, { center: [45.526, -122.667], zoom: 4 });
      esri.basemapLayer("Gray").addTo(map);

      this.#featureLeyer = esri.featureLayer({
         url:
            "https://services.arcgis.com/x494PplYsmeeZsYB/ArcGIS/rest/services/Stronghold_Dashboard_Main/FeatureServer/0",
      });

      this.#featureLeyer.on("load", (e: any) => {
         let projectNames = [];
         let temp = e.target._layers;
         for (let value in temp) {
            projectNames.push(
               temp[value].feature.properties.WCSPROGRAMS_ProjectName,
            );
         }
         this.#featureLeyer.bindPopup((e: any) => {
            store.dispatch(setLayerData(e.feature.properties));
            return L.Util.template(
               `<p>title: {BiomeMetricName}</p><p>Program: {Program}</p> <p>Project Name: {WCSPROGRAMS_ProjectName}</p><p>Shape Area: {Shape__Area}</p>`,
               e.feature.properties,
            );
         });
         store.dispatch(setMapLoaded(true));
         store.dispatch(setProjectNames(projectNames));
      });

      this.#featureLeyer.addTo(map);
   };

   updateMapView = (name: string) => {
      this.#featureLeyer.setWhere("WCSPROGRAMS_ProjectName = '" + name + "'");
   };
}

const mapController = new MapController();

export default mapController;
