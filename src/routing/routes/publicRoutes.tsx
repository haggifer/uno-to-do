import {RouteObject} from "react-router-dom";
import React from "react";
import {Login} from "../../components/pages/public/Login";
import {SignUp} from "../../components/pages/public/SignUp";
import {GetStarted} from "../../components/pages/public/GetStarted";
import {ProtectedRoute} from "../ProtectedRoute";
import {ForgotPassword} from "../../components/pages/public/ForgotPassword";

export const getDefaultPublicPath = (isAlreadyVisited: boolean) => {
  return isAlreadyVisited ?
    '/login' :
    '/get-started'
}

export const getPublicRoutes = (serviceRoutes?: RouteObject[]) => [
  {
    element: (
      <ProtectedRoute requiredStatus="loggedOut"/>
    ),
    children: [
      {
        path: '/get-started',
        element: (
          <GetStarted/>
        )
      },
      {
        path: '/login',
        element: (
          <Login/>
        )
      },
      {
        path: '/sign-up',
        element: (
          <SignUp/>
        )
      },
      {
        path: '/forgot-password',
        element: (
          <ForgotPassword/>
        )
      },
      ...(serviceRoutes || []),
    ],
  },
]