import React from 'react';

const Page1 = React.lazy(() => import('./Dashboard'));
const Page2 = React.lazy(() => import('./Role'));
const Page3 = React.lazy(() => import('./Banner'));
const Page4 = React.lazy(() => import('./Messages'));
const Page5 = React.lazy(() => import('./Staff'));
const Page6 = React.lazy(() => import('./Branch'));
const Page7 = React.lazy(() => import('./Floor'));
const Page8 = React.lazy(() => import('./Room'));
const Page9 = React.lazy(() => import('./Package'));
const Page10 = React.lazy(() => import('./MembersInfo'));
const Page11 = React.lazy(() => import('./PurchaseDetails'));
const Page12 = React.lazy(() => import('./Booking'));
const Page13 = React.lazy(() => import('./BookingsCheckIn'));
const Page14 = React.lazy(() => import('./TransferPackage'));
const Page15 = React.lazy(() => import('./AttendanceInfo'));
const Page16 = React.lazy(() => import('./UsageReport'));
const Page17 = React.lazy(() => import('./PackageReport'));

export const samplePagesConfigs = [
  {
    path: '/sample/Dashboard',
    element: <Page1 />,
  },
  {
    path: '/sample/Role',
    element: <Page2 />,
  },
  {
    path: '/sample/Banner',
    element: <Page3 />,
  },
  {
    path: '/sample/Messages',
    element: <Page4 />,
  },
  {
    path: '/sample/Staff',
    element: <Page5 />,
  },
  {
    path: '/sample/Branch',
    element: <Page6 />,
  },
  {
    path: '/sample/Floor',
    element: <Page7 />,
  },
  {
    path: '/sample/Room',
    element: <Page8 />,
  },
  {
    path: '/sample/Package',
    element: <Page9 />,
  },
  {
    path: '/sample/MembersInfo',
    element: <Page10 />,
  },
  {
    path: '/sample/PurchaseDetails',
    element: <Page11 />,
  },
  {
    path: '/sample/Booking',
    element: <Page12 />,
  },
  {
    path: '/sample/BookingsCheckIn',
    element: <Page13 />,
  },
  {
    path: '/sample/TransferPackage',
    element: <Page14 />,
  },
  {
    path: '/sample/AttendanceInfo',
    element: <Page15 />,
  },
  {
    path: '/sample/UsageReport',
    element: <Page16 />,
  },
  {
    path: '/sample/PackageReport',
    element: <Page17 />,
  },
];
