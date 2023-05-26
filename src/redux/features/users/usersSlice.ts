import {IUsersState} from "../../../typescript/states";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeFromLS, setToLS} from "../../../utils/helpers/localStorage";
import {createUser, getUsers, login, updateUser} from "./usersThunks";
import {IUser} from "../../../typescript/entities";
import _ from "lodash";
import {CREATE_USER, GET_USERS, LOGIN, UPDATE_USER} from "../../variables";

const initialState: IUsersState = {
  list: null,
  current: null,
  token: null,
  loading: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.current = null

      removeFromLS('user')
      removeFromLS('token')
    },
    setAuthData: (state, action: PayloadAction<{
      token: string,
      user: IUser,
    }>) => {
      state.token = action.payload.token;
      state.current = action.payload.user;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state) => {
        state.loading.push(LOGIN)
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        state.token = payload.token
        state.current = payload.user

        setToLS('token', payload.token)
        setToLS('user', JSON.stringify(payload.user))

        _.pull(state.loading, LOGIN);
      })
      .addCase(login.rejected, (state, {payload}) => {
        _.pull(state.loading, LOGIN);
      })

      .addCase(getUsers.pending, (state) => {
        state.loading.push(GET_USERS)
      })
      .addCase(getUsers.fulfilled, (state, {payload}) => {
        state.list = payload

        _.pull(state.loading, GET_USERS);
      })
      .addCase(getUsers.rejected, (state) => {
        _.pull(state.loading, GET_USERS);
      })

      .addCase(createUser.pending, (state) => {
        state.loading.push(CREATE_USER)
      })
      .addCase(createUser.fulfilled, (state, {payload}) => {
        const updatedData = [...(state.list as IUser[])]

        updatedData.push(payload)

        state.list = updatedData

        _.pull(state.loading, CREATE_USER);
      })
      .addCase(createUser.rejected, (state) => {
        _.pull(state.loading, CREATE_USER);
      })

      .addCase(updateUser.pending, (state) => {
        state.loading.push(UPDATE_USER)
      })
      .addCase(updateUser.fulfilled, (state, {payload}) => {
        if (state.list) {
          const updatedList = [...(state.list as IUser[])]

          const targetUserIndex = updatedList.findIndex(user => user.id === payload.id)

          updatedList.splice(
            targetUserIndex,
            1,
            {
              ...updatedList[targetUserIndex],
              ...payload,
            }
          )

          state.list = updatedList
        }


        if (state.current!.id === payload.id) {
          const updatedUser = {
            ...state.current,
            ..._.omitBy((_.omit(payload, 'password')), _.isUndefined),
          } as IUser

          state.current = updatedUser
          setToLS('user', JSON.stringify(updatedUser))
        }

        _.pull(state.loading, UPDATE_USER);
      })
      .addCase(updateUser.rejected, (state) => {
        _.pull(state.loading, UPDATE_USER);
      })
  }
})

export const {logout, setAuthData} = usersSlice.actions