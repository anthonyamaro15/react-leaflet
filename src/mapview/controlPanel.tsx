import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import mapController from "../controllers/MapController";
import { projectNames as projectNamesSelector } from "../store/slices/mapSlice";

const ControlPanel = () => {
   const [selectedProject, setSelectedProject] = useState("");
   const projectNames = useSelector(projectNamesSelector);
   useEffect(() => {
      if (selectedProject) {
         mapController.updateMapView(selectedProject);
      }
   }, [projectNames, selectedProject]);

   return (
      <div>
         <select
            name="selectedName"
            id="selectedName"
            onChange={(e) => setSelectedProject(e.target.value)}
         >
            <option value="">select Project Name</option>
            {projectNames &&
               projectNames.map((name: string, index: number) => (
                  <option key={index} value={name}>
                     {name}
                  </option>
               ))}
         </select>
      </div>
   );
};

export default ControlPanel;
