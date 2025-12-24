import { createSlice } from "@reduxjs/toolkit";

const connectionSlice=createSlice({
    name:"connections",
    initialState:null,
    reducers:{
        addConnections:(state,action)=> action.payload,
        removeConnectioss:(state,action)=> null

    }
})
export const{addConnections,removeConnectioss}=connectionSlice.actions;
export default connectionSlice.reducer;