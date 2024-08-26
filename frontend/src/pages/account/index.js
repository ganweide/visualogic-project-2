import React from 'react';
import {RoutePermittedRole} from 'shared/constants/AppConst';
import Account from './MyProfile';

export const accountPagesConfigs = [
  {
    permittedRole: [
      RoutePermittedRole.Admin,
      RoutePermittedRole.Teacher,
      RoutePermittedRole.Parent,
    ],
    path: '/my-profile',
    element: <Account />,
  },
];
