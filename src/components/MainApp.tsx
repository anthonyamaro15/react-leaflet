import ControlPanel from "../mapview/controlPanel";
import MapView from "../mapview/mapview";
import RenderLayerData from "./RenderLayerData";

const MainApp = () => {
   return (
      <div>
         <MapView />
         <RenderLayerData />
         <ControlPanel />
      </div>
   );
};

export default MainApp;
