export interface IUser {
  id: number,
  full_name: string,
  email: string,
  avatar: string | null,
}

export interface IUserWithPassword extends IUser {
  password: string,
}

export interface IPartialUserWithPassword extends Partial<Omit<IUserWithPassword, 'id'>> {
  id: IUser['id'],
}

/*---------------------------------------*/

export interface ITask {
  id: number,
  title: string,
  creation_date: string,
  due_date: string | null,
  note: string | null,
  list_id: number | null,
  important: boolean,
  completed: boolean,
}

export interface IPartialTask extends Partial<Omit<ITask, 'id'>> {
  id: ITask['id'],
}

export interface ITaskList {
  id: number,
  name: string,
}

export interface IPartialTaskList extends Partial<Omit<ITaskList, 'id'>> {
  id: ITaskList['id'],
}

/*---------------------------------------*/

export interface IAlert {
  text: string,
  title?: string,
  type?: 'error' | 'warning' | 'info' | 'success',
  variant?: 'outlined' | 'filled' | 'standard',
}

/*---------------------------------------*/