import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
     status: '', // 'deleteModal' , 'editModal' , '' 
     task: '' // task to use in modal , '' 
}

export const ModalSlice = createSlice({
     name: 'Modal',
     initialState: initialValue,
     reducers: {
          showDeleteModal(state) {
               state.status = 'deleteModal';
          },
          showEditModal(state) {
               state.status = 'editModal';
          },
          hideModal(state) {
               state.status = '';
          },
          selectTask(state, newTask) {
               state.task = newTask.payload;
          },
          deselectTask(state) {
               state.task = '';
          }
     }
})