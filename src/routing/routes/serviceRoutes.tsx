import {RouteObject} from "react-router-dom";
import React from "react";
import {PageNotFound} from "../../components/pages/service/PageNotFound";

export const serviceRoutes: RouteObject[] = [
  {
    path: '/*',
    element: (
      <PageNotFound/>
    )
  },
]