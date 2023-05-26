import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {usersSlice} from "./features/users/usersSlice";
import {alertSlice} from "./features/alert/alertSlice";
import {tasksSlice} from "./features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    users: usersSlice.reducer,
    tasks: tasksSlice.reducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;