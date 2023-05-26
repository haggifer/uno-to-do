import {ITasksState} from "../../../typescript/states";
import {createSlice} from "@reduxjs/toolkit";
import {
  createTask,
  createTaskList,
  deleteTask,
  deleteTaskList,
  getTask,
  getTaskList,
  getTaskLists,
  getTasksData,
  updateTask,
  updateTaskList
} from "./tasksThunks";
import {ITask, ITaskList} from "../../../typescript/entities";
import {getLocalDueDateString} from "../../../utils/helpers/dates";
import moment from "moment/moment";
import _ from "lodash";
import {
  CREATE_TASK,
  CREATE_TASK_LIST,
  DELETE_TASK,
  DELETE_TASK_LIST,
  GET_TASK,
  GET_TASK_LIST,
  GET_TASK_LISTS,
  GET_TASKS_DATA,
  UPDATE_TASK,
  UPDATE_TASK_LIST
} from "../../variables";

const initialState: ITasksState = {
  data: null,
  lists: null,
  loading: [],
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTasksData.pending, (state) => {
        state.loading.push(GET_TASKS_DATA)
      })
      .addCase(getTasksData.fulfilled, (state, {payload}) => {
        state.data = payload.map(task => ({
          ...task,
          due_date: task.due_date && getLocalDueDateString(moment(task.due_date)),
        }))

        _.pull(state.loading, GET_TASKS_DATA);
      })
      .addCase(getTasksData.rejected, (state) => {
        _.pull(state.loading, GET_TASKS_DATA);
      })

      .addCase(getTask.pending, (state) => {
        state.loading.push(GET_TASK)
      })
      .addCase(getTask.fulfilled, (state, {payload}) => {
        _.pull(state.loading, GET_TASK);
      })
      .addCase(getTask.rejected, (state) => {
        _.pull(state.loading, GET_TASK);
      })

      .addCase(createTask.pending, (state) => {
        state.loading.push(CREATE_TASK)
      })
      .addCase(createTask.fulfilled, (state, {payload}) => {
        const updatedData = [...(state.data as ITask[])]

        updatedData.push(payload)

        state.data = updatedData

        _.pull(state.loading, CREATE_TASK);
      })
      .addCase(createTask.rejected, (state) => {
        _.pull(state.loading, CREATE_TASK);
      })

      .addCase(updateTask.pending, (state) => {
        state.loading.push(UPDATE_TASK)
      })
      .addCase(updateTask.fulfilled, (state, {payload}) => {
        const targetTaskIndex = (state.data as ITask[]).findIndex(task => task.id === payload.id)

        const updatedData = [...(state.data as ITask[])]

        updatedData.splice(targetTaskIndex, 1, {
          ...updatedData[targetTaskIndex],
          ...payload,
        })

        if (payload.due_date) {
          updatedData[targetTaskIndex].due_date = updatedData[targetTaskIndex].due_date && getLocalDueDateString(moment(updatedData[targetTaskIndex].due_date))
        }

        state.data = updatedData

        _.pull(state.loading, UPDATE_TASK);
      })
      .addCase(updateTask.rejected, (state) => {
        _.pull(state.loading, UPDATE_TASK);
      })

      .addCase(deleteTask.pending, (state) => {
        state.loading.push(DELETE_TASK)
      })
      .addCase(deleteTask.fulfilled, (state, {payload}) => {
        const targetTaskIndex = (state.data as ITask[]).findIndex(task => task.id === payload)

        const updatedData = [...(state.data as ITask[])]

        updatedData.splice(targetTaskIndex, 1)

        state.data = updatedData

        _.pull(state.loading, DELETE_TASK);
      })
      .addCase(deleteTask.rejected, (state) => {
        _.pull(state.loading, DELETE_TASK);
      })

      .addCase(getTaskLists.pending, (state) => {
        state.loading.push(GET_TASK_LISTS)
      })
      .addCase(getTaskLists.fulfilled, (state, {payload}) => {
        state.lists = payload

        _.pull(state.loading, GET_TASK_LISTS);
      })
      .addCase(getTaskLists.rejected, (state) => {
        _.pull(state.loading, GET_TASK_LISTS);
      })

      .addCase(getTaskList.pending, (state) => {
        state.loading.push(GET_TASK_LIST)
      })
      .addCase(getTaskList.fulfilled, (state, {payload}) => {
        _.pull(state.loading, GET_TASK_LIST);
      })
      .addCase(getTaskList.rejected, (state) => {
        _.pull(state.loading, GET_TASK_LIST);
      })

      .addCase(createTaskList.pending, (state) => {
        state.loading.push(CREATE_TASK_LIST)
      })
      .addCase(createTaskList.fulfilled, (state, {payload}) => {
        const updatedLists = [...(state.lists as ITaskList[])]

        updatedLists.push(payload)

        state.lists = updatedLists

        _.pull(state.loading, CREATE_TASK_LIST);
      })
      .addCase(createTaskList.rejected, (state) => {
        _.pull(state.loading, CREATE_TASK_LIST);
      })

      .addCase(updateTaskList.pending, (state) => {
        state.loading.push(UPDATE_TASK_LIST)
      })
      .addCase(updateTaskList.fulfilled, (state, {payload}) => {
        const targetListIndex = (state.lists as ITaskList[]).findIndex(task => task.id === payload.id)

        const updatedLists = [...(state.lists as ITaskList[])]

        updatedLists.splice(targetListIndex, 1, {
          ...updatedLists[targetListIndex],
          ...payload,
        })

        state.lists = updatedLists

        _.pull(state.loading, UPDATE_TASK_LIST);
      })
      .addCase(updateTaskList.rejected, (state) => {
        _.pull(state.loading, UPDATE_TASK_LIST);
      })

      .addCase(deleteTaskList.pending, (state) => {
        state.loading.push(DELETE_TASK_LIST)
      })
      .addCase(deleteTaskList.fulfilled, (state, {payload}) => {
        const targetTaskListIndex = (state.lists as ITaskList[]).findIndex(list => list.id === payload)

        const updatedLists = [...(state.lists as ITaskList[])]

        updatedLists.splice(targetTaskListIndex, 1)

        state.lists = updatedLists

        _.pull(state.loading, DELETE_TASK_LIST);
      })
      .addCase(deleteTaskList.rejected, (state) => {
        _.pull(state.loading, DELETE_TASK_LIST);
      })
  }
})

export const {} = tasksSlice.actions