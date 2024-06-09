import { configureStore } from "@reduxjs/toolkit";
import { ModalSlice } from "./ModalSlice";
import { FetchSlice } from "./FetchSlice";

const store = configureStore({
     reducer : {
          Modal : ModalSlice.reducer,
          fetch : FetchSlice.reducer
     }
})

export const ModalActions = ModalSlice.actions;
export const FetchActions = FetchSlice.actions;
export default store;