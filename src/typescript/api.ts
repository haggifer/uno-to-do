import {
  IPartialTask,
  IPartialTaskList,
  IPartialUserWithPassword,
  ITask,
  ITaskList,
  IUser,
  IUserWithPassword
} from "./entities";

export interface ILoginRequest {
  email: string,
  password: string,
}

export interface ILoginResponse {
  token: string,
  user: IUser,
}

export type IGetUsersRequest = undefined

export type IGetUsersResponse = IUser[]

export type ICreateUserRequest = IUserWithPassword

export type ICreateUserResponse = IUserWithPassword

export type IUpdateUserRequest = IPartialUserWithPassword

export type IUpdateUserResponse = IPartialUserWithPassword

/*---------------------------------------*/

export interface ITasksDataRequest extends Partial<ITask> {

}

export type ITasksDataResponse = ITask[]

export type IGetTaskRequest = ITask['id']

export type IGetTaskResponse = ITask

export type ICreateTaskRequest = ITask

export type ICreateTaskResponse = ITask

export type IUpdateTaskRequest = IPartialTask

export type IUpdateTaskResponse = IPartialTask

export type IDeleteTaskRequest = ITask['id']

export type IDeleteTaskResponse = ITask['id']

export interface ITaskListsRequest extends Partial<ITaskList> {
  full_name: string,
  email: string,
  password: string,
}

export type ITaskListsResponse = ITaskList[]

export type IGetTaskListRequest = ITaskList['id']

export type IGetTaskListResponse = ITaskList

export type ICreateTaskListRequest = ITaskList

export type ICreateTaskListResponse = ITaskList

export type IUpdateTaskListRequest = IPartialTaskList

export type IUpdateTaskListResponse = IPartialTaskList

export type IDeleteTaskListRequest = ITaskList['id']

export type IDeleteTaskListResponse = ITaskList['id']

/*---------------------------------------*/