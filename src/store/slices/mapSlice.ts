import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AppState {
   mapLoaded: boolean;
   layerData: any;
   projectNames: any;
}
const initialState: AppState = {
   mapLoaded: false,
   layerData: {},
   projectNames: null,
};

export const mapSlice = createSlice({
   name: "mapSlice",
   initialState,
   reducers: {
      setMapLoaded: (state, action: PayloadAction<boolean>) => {
         state.mapLoaded = action.payload;
      },
      setLayerData: (state, action: any) => {
         state.layerData = action.payload;
      },
      setProjectNames: (state, action) => {
         state.projectNames = action.payload;
      },
   },
});

export const { setMapLoaded, setLayerData, setProjectNames } = mapSlice.actions;
export const mapLoaded = (state: RootState) => state.mapSlice.mapLoaded;
export const layerData = (state: RootState) => state.mapSlice.layerData;
export const projectNames = (state: RootState) => state.mapSlice.projectNames;
export default mapSlice.reducer;
