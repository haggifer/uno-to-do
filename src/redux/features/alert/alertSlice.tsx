import {IAlertState} from "../../../typescript/states";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAlert} from "../../../typescript/entities";

const initialState: IAlertState = {
  data: null,
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<IAlert>) => {
      state.data = {
        type: action.payload.type,
        variant: action.payload.variant,
        text: action.payload.text,
      }
    },
    clearAlert: (state) => {
      state.data = null;
    },
  },
})

export const {setAlert, clearAlert} = alertSlice.actions;