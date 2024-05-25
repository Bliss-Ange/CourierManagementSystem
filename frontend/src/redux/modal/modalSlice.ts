import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ModalState {
    modalOpen : string;
}

const initialState : ModalState = {
    modalOpen : ""
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModalOpen(state, actions : PayloadAction<string>) {
            state.modalOpen = actions.payload;
        }, 
        removeModalOpen(state) {
            state.modalOpen = ""
        }
    }
})

export const { setModalOpen, removeModalOpen } = modalSlice.actions;
export default modalSlice.reducer;