import {IAlert, ITask, ITaskList, IUser} from "./entities";
import {IAuthThunkName, ITasksThunkName} from "../redux/variables";

export interface IAlertState {
  data: IAlert | null,
}

/*---------------------------------------*/

export interface IUsersState {
  list: IUser[] | null,
  current: IUser | null,
  token: string | null,
  loading: IAuthThunkName[],
}

/*---------------------------------------*/

export interface ITasksState {
  data: ITask[] | null,
  lists: ITaskList[] | null,
  loading: ITasksThunkName[],
}

/*---------------------------------------*/