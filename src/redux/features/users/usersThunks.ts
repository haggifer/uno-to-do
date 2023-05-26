import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  ICreateUserRequest,
  ICreateUserResponse,
  IGetUsersRequest,
  IGetUsersResponse,
  ILoginRequest,
  ILoginResponse,
  IUpdateUserRequest,
  IUpdateUserResponse
} from "../../../typescript/api";
import {IUserWithPassword} from "../../../typescript/entities";
import {CREATE_USER, GET_USERS, LOGIN, UPDATE_USER} from "../../variables";
import {apiProvider} from "../../../api/api";
import {setAlert} from "../alert/alertSlice";
import _ from "lodash";

const testToken = 'qwertyuiopasdfghjklzxcvbnm123456'

export const login = createAsyncThunk<ILoginResponse, ILoginRequest>(
  `users/${LOGIN}`,
  async (creds, {rejectWithValue, dispatch}) => {
    try {
      const response = await apiProvider.request<[IUserWithPassword]>({
        method: 'get',
        url: `/users`,
        params: creds,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.data.length) {
        dispatch(setAlert({
          text: 'Incorrect email or password',
          type: 'error',
        }))

        return rejectWithValue(undefined)
      }

      return {
        user: response.data[0],
        token: testToken,
      }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const getUsers = createAsyncThunk<IGetUsersResponse, IGetUsersRequest>(
  `users/${GET_USERS}`,
  async (_, {rejectWithValue}) => {
    try {
      const response = await apiProvider.request<IGetUsersResponse>({
        method: 'get',
        url: `/users`,
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

export const createUser = createAsyncThunk<ICreateUserResponse, ICreateUserRequest>(
  `users/${CREATE_USER}`,
  async (data, {rejectWithValue}) => {
    try {
      await apiProvider.request({
        method: 'post',
        url: `/users`,
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const updateUser = createAsyncThunk<IUpdateUserResponse, IUpdateUserRequest>(
  `users/${UPDATE_USER}`,
  async (data, {rejectWithValue}) => {
    try {
      await apiProvider.request({
        method: 'patch',
        url: `/users/${data.id}`,
        data: _.omitBy(data, _.isUndefined),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)