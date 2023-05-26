import React from 'react';
import {useAppSelector} from "../redux/hooks";
import {selectUsers} from "../redux/selectors/users";
import {PageNotFound} from "../components/pages/service/PageNotFound";
import {Outlet} from "react-router";

interface IProps {
  requiredStatus: 'loggedIn' | 'loggedOut',
}

export const ProtectedRoute = ({requiredStatus}: IProps): JSX.Element => {
  const users = useAppSelector(selectUsers);

  return (
    (requiredStatus === 'loggedIn' && users.token) ||
    (requiredStatus === 'loggedOut' && !users.token) ?
      <Outlet/> :
      <PageNotFound/>
  );
}