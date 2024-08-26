import React from 'react';
import {RoutePermittedRole} from 'shared/constants/AppConst';

const Page1 = React.lazy(() => import('./SurveyEditor'));
const Page2 = React.lazy(() => import('./AddmissionForm'));

export const samplePagesConfigs = [
  {
    path: '/sample/SurveyEditor',
    element: <Page1 />,
    permittedRole: [RoutePermittedRole.Admin, RoutePermittedRole.Teacher],
  },
  {
    path: '/sample/AddmissionForm',
    element: <Page2 />,
  },
];
