import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     status: '' //  'fetchAgain' , ''
}
export const FetchSlice = createSlice({
     name: 'fetch',
     initialState,
     reducers: {
          setFetcherResolcer(state) {
               state.status = 'fetchAgain';
          },
          onSetFetcherResolcer(state) {
               state.status = '';
          }
     }
})