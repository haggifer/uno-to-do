export const GET_TASKS_DATA = 'GET_TASKS_DATA'
export const GET_TASK = 'GET_TASK'
export const CREATE_TASK = 'CREATE_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const GET_TASK_LISTS = 'GET_TASK_LISTS'
export const GET_TASK_LIST = 'GET_TASK_LIST'
export const CREATE_TASK_LIST = 'CREATE_TASK_LIST'
export const UPDATE_TASK_LIST = 'UPDATE_TASK_LIST'
export const DELETE_TASK_LIST = 'DELETE_TASK_LIST'

export type ITasksThunkName =
  typeof GET_TASKS_DATA |
  typeof GET_TASK |
  typeof CREATE_TASK |
  typeof UPDATE_TASK |
  typeof DELETE_TASK |
  typeof GET_TASK_LISTS |
  typeof GET_TASK_LIST |
  typeof CREATE_TASK_LIST |
  typeof UPDATE_TASK_LIST |
  typeof DELETE_TASK_LIST

export const LOGIN = 'LOGIN'
export const GET_USERS = 'GET_USERS'
export const CREATE_USER = 'CREATE_USER'
export const UPDATE_USER = 'UPDATE_USER'

export type IAuthThunkName =
  typeof LOGIN |
  typeof GET_USERS |
  typeof CREATE_USER |
  typeof UPDATE_USER