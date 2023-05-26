import {RootState} from "../store";
import {createSelector} from "reselect";

export const selectTasks = (state: RootState) => state.tasks

export const selectImportantTasks = createSelector(
  selectTasks,
  (tasks) => tasks.data && tasks.data.filter(task => task.important)
)