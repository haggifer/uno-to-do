import React, {lazy} from "react";
import {RouteObject} from "react-router-dom";
import {ProtectedRoute} from "../ProtectedRoute";
import PageLayout from "../../components/layout/PageLayout";

export const getDefaultPrivatePath = () => {
  return '/tasks'
}

const LazyAllTasks = lazy(() => import("../../components/pages/private/tasks/AllTasks"))
const LazySearchTasks = lazy(() => import("../../components/pages/private/tasks/SearchTasks"))
const LazyImportantTasks = lazy(() => import("../../components/pages/private/tasks/ImportantTasks"))
const LazyListTasks = lazy(() => import("../../components/pages/private/tasks/ListTasks"))

export const getPrivateRoutes = (serviceRoutes?: RouteObject[]) => [
  {
    element: (
      <ProtectedRoute requiredStatus="loggedIn"/>
    ),
    children: [
      {
        element: (
          <PageLayout/>
        ),
        children: [
          {
            path: '/tasks',
            element: (
              <LazyAllTasks/>
            ),
          },
          {
            path: '/tasks/search',
            element: (
              <LazySearchTasks/>
            ),
          },
          {
            path: '/tasks/lists/:listId',
            element: (
              <LazyListTasks/>
            )
          },
          {
            path: '/tasks/important',
            element: (
              <LazyImportantTasks/>
            )
          },
          ...(serviceRoutes || [])
        ]
      },
    ],
  },
]