import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  ICreateTaskListRequest,
  ICreateTaskListResponse,
  ICreateTaskRequest,
  ICreateTaskResponse,
  IDeleteTaskListRequest,
  IDeleteTaskListResponse,
  IDeleteTaskRequest,
  IDeleteTaskResponse,
  IGetTaskListRequest,
  IGetTaskListResponse,
  IGetTaskRequest,
  IGetTaskResponse,
  ITaskListsRequest,
  ITaskListsResponse,
  ITasksDataRequest,
  ITasksDataResponse,
  IUpdateTaskListRequest,
  IUpdateTaskListResponse,
  IUpdateTaskRequest,
  IUpdateTaskResponse
} from "../../../typescript/api";
import {apiProvider} from "../../../api/api";
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

export const getTasksData = createAsyncThunk<ITasksDataResponse, ITasksDataRequest | undefined>(
  `tasks/${GET_TASKS_DATA}`,
  async (params, {rejectWithValue}) => {
    try {
      const response = await apiProvider.request<ITasksDataResponse>({
        method: 'get',
        url: '/tasks',
        params,
      })

      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const getTask = createAsyncThunk<IGetTaskResponse, IGetTaskRequest>(
  `tasks/${GET_TASK}`,
  async (taskId, {rejectWithValue, dispatch}) => {
    try {
      const response = await apiProvider.request<IGetTaskResponse>({
        method: 'post',
        url: `/tasks/${taskId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const createTask = createAsyncThunk<ICreateTaskResponse, ICreateTaskRequest>(
  `tasks/${CREATE_TASK}`,
  async (newTask, {rejectWithValue, dispatch}) => {
    try {
      await apiProvider.request<IUpdateTaskResponse>({
        method: 'post',
        url: `/tasks`,
        data: newTask,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return newTask
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const updateTask = createAsyncThunk<IUpdateTaskResponse, IUpdateTaskRequest>(
  `tasks/${UPDATE_TASK}`,
  async (partialTask, {rejectWithValue, dispatch}) => {
    try {
      await apiProvider.request<IUpdateTaskResponse>({
        method: 'patch',
        url: `/tasks/${partialTask.id}`,
        data: partialTask,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return partialTask
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const deleteTask = createAsyncThunk<IDeleteTaskResponse, IDeleteTaskRequest>(
  `tasks/${DELETE_TASK}`,
  async (taskId, {rejectWithValue, dispatch}) => {
    try {
      return new Promise<IDeleteTaskResponse>((resolve, reject) => {
        setTimeout(async () => {
          await apiProvider.request<IUpdateTaskResponse>({
            method: 'delete',
            url: `/tasks/${taskId}`,
            headers: {
              'Content-Type': 'application/json',
            },
          })

          resolve(taskId)
        }, 1000)
      })

    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const getTaskLists = createAsyncThunk<ITaskListsResponse, ITaskListsRequest | undefined>(
  `tasks/${GET_TASK_LISTS}`,
  async (params, {rejectWithValue}) => {
    try {
      const response = await apiProvider.request<ITaskListsResponse>({
        method: 'get',
        url: '/taskLists',
        params,
      })

      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const getTaskList = createAsyncThunk<IGetTaskListResponse, IGetTaskListRequest>(
  `tasks/${GET_TASK_LIST}`,
  async (taskListId, {rejectWithValue, dispatch}) => {
    try {
      const response = await apiProvider.request<IGetTaskListResponse>({
        method: 'post',
        url: `/tasks/${taskListId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const createTaskList = createAsyncThunk<ICreateTaskListResponse, ICreateTaskListRequest>(
  `tasks/${CREATE_TASK_LIST}`,
  async (newTaskList, {rejectWithValue, dispatch}) => {
    try {
      await apiProvider.request<IUpdateTaskResponse>({
        method: 'post',
        url: `/taskLists`,
        data: newTaskList,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return newTaskList
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const updateTaskList = createAsyncThunk<IUpdateTaskListResponse, IUpdateTaskListRequest>(
  `tasks/${UPDATE_TASK_LIST}`,
  async (partialTaskList, {rejectWithValue, dispatch}) => {
    try {
      await apiProvider.request<IUpdateTaskListResponse>({
        method: 'patch',
        url: `/taskLists/${partialTaskList.id}`,
        data: partialTaskList,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return partialTaskList
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const deleteTaskList = createAsyncThunk<IDeleteTaskListResponse, IDeleteTaskListRequest>(
  `tasks/${DELETE_TASK_LIST}`,
  async (taskListId, {rejectWithValue, dispatch}) => {
    try {
      return new Promise<IDeleteTaskListResponse>((resolve, reject) => {
        setTimeout(async () => {
          await apiProvider.request<IUpdateTaskResponse>({
            method: 'delete',
            url: `/taskLists/${taskListId}`,
            headers: {
              'Content-Type': 'application/json',
            },
          })

          resolve(taskListId)
        }, 1000)
      })

    } catch (err) {
      return rejectWithValue(err)
    }
  }
)