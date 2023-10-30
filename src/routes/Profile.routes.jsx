import React from 'react';
import ProfilePageIndex from '../pages/profile/ProfilePageIndex';
import ProfileEmployeePage from '../pages/profile/ProfileEmployeePage';
const ProfileRoutes = [
  { path: "", element: <ProfilePageIndex /> },
  { path: ":employee_id", element: <ProfileEmployeePage /> }
];

export default ProfileRoutes;
