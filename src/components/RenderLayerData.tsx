import { useEffect } from "react";
import { useSelector } from "react-redux";
import { layerData as layerDataSelector } from "../store/slices/mapSlice";

const RenderLayerData = () => {
   const layerData = useSelector(layerDataSelector);

   useEffect(() => {}, [layerData]);
   return (
      <div className="render-data">
         {Object.keys(layerData).length ? (
            <div>
               <p>{layerData.WCSPROGRAMS_ProjectName}</p>
            </div>
         ) : (
            <p>No polygon selected</p>
         )}
      </div>
   );
};

export default RenderLayerData;
