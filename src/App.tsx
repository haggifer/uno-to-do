import React, {useEffect, useMemo, useState} from 'react';
import {Routes} from "./routing/Routes";
import {CssBaseline, GlobalStyles, PaletteMode, ThemeProvider, useMediaQuery} from "@mui/material";
import {getGlobalStyles} from "utils/helpers/globalStyles";
import {getFromLS, setToLS} from "utils/helpers/localStorage";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {selectUsers} from "./redux/selectors/users";
import {setAuthData} from "./redux/features/users/usersSlice";
import {CenteredLoader} from "components/common/CenteredLoader";
import {getTheme} from "utils/configs/themeConfig";
import {FunctionInterpolation} from "@emotion/styled/dist/emotion-styled.cjs";
import {Theme} from "@mui/material/styles";
import {ThemeModeContext} from "utils/contexts/ThemeModeContext"
import {defaultThemeMode} from "utils/staticVariables";
import {getTaskLists, getTasksData} from "./redux/features/tasks/tasksThunks";

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './assets/scss/index.scss';
import {useLocation} from "react-router";
import {GET_TASK_LISTS, GET_TASKS_DATA, LOGIN} from "./redux/variables";
import {getDefaultPublicPath} from "./routing/routes/publicRoutes";
import {selectTasks} from "./redux/selectors/tasks";
import {SidebarContext} from "./utils/contexts/SidebarContext";

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation()

  const users = useAppSelector(selectUsers);
  const tasks = useAppSelector(selectTasks);

  const lsToken = getFromLS('token');
  const lsUser = getFromLS('user');
  const lsIsAlreadyVisited = getFromLS('isAlreadyVisited');

  const lsThemeMode = getFromLS('themeMode') as PaletteMode | null;

  const [themeMode, setThemeMode] = useState<PaletteMode>(
    lsThemeMode || defaultThemeMode);

  const theme = useMemo<Theme>(() => {
    return getTheme(themeMode)
  }, [themeMode]);

  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(upMd);

  useEffect(() => {
    setToLS('themeMode', themeMode)
  }, [themeMode])

  useEffect(() => {
    if (lsToken && !users.token) {
      dispatch(setAuthData({
        token: lsToken,
        user: lsUser ? JSON.parse(lsUser) : lsUser,
      }))
    }
  }, [users, dispatch, lsToken, lsUser])

  useEffect(() => {
    if (lsToken) {
      if (!tasks.data && !tasks.loading.includes(GET_TASKS_DATA)) {
        dispatch(getTasksData())
      }

      if (!tasks.lists && !tasks.loading.includes(GET_TASK_LISTS)) {
        dispatch(getTaskLists())
      }
    }
  }, [dispatch, lsToken])

  const showLoader = useMemo<boolean>(() => {
    return Boolean(
      users.loading.includes(LOGIN) ||
      (location.pathname === getDefaultPublicPath(!!lsIsAlreadyVisited) && lsToken && users.token) ||
      (lsToken && !users.token) ||
      (users.token && !tasks.data) ||
      (users.token && !tasks.lists)
    )
  }, [location.pathname, lsIsAlreadyVisited, lsToken, users, tasks])
  console.log(showLoader)

  return (
    <ThemeModeContext.Provider value={{
      switchMode: setThemeMode,
    }}>
      <ThemeProvider theme={theme}>
        <SidebarContext.Provider value={{
          open: sidebarOpen,
          setOpen: setSidebarOpen,
        }}>
          <CssBaseline enableColorScheme/>

          <GlobalStyles styles={(theme) => getGlobalStyles(theme) as FunctionInterpolation<Theme>}/>

          {
            showLoader ?
              <CenteredLoader/> :
              <Routes/>
          }
        </SidebarContext.Provider>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}