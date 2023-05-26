import React, {useMemo} from 'react';
import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import {getDefaultPrivatePath, getPrivateRoutes} from "./routes/privateRoutes";
import {getDefaultPublicPath, getPublicRoutes} from "./routes/publicRoutes";
import {useAppSelector} from "../redux/hooks";
import {selectUsers} from "../redux/selectors/users";
import {serviceRoutes} from "./routes/serviceRoutes";
import {getFromLS} from "../utils/helpers/localStorage";

export const Routes = (): JSX.Element => {
  const users = useAppSelector(selectUsers);

  const isAlreadyVisited = getFromLS('isAlreadyVisited')

  const defaultRoute: RouteObject = useMemo(() => ({
    path: '/',
    element: <Navigate to={users.token ?
      getDefaultPrivatePath() :
      getDefaultPublicPath(!!isAlreadyVisited)
    }/>,
  }), [users.token, isAlreadyVisited])

  const routeConfig = useMemo(() => [
    defaultRoute,
    ...getPrivateRoutes(serviceRoutes),
    ...getPublicRoutes(serviceRoutes),
  ], [defaultRoute])

  const routes = useRoutes(routeConfig)

  return (
    routes || <></>
  )
}