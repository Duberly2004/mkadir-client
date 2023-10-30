import React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import RestaurantsRoutes from './Restaurants.routes'
import ProfileRoutes from './Profile.routes';
import auth_routes from './Auth.routes';
import admin_routes from './Admin.routes'
import HomePage from '../pages/HomePage'
import IsAuthenticated from '../middlewares/IsAuthenticated';
import AuthRequired from '../middlewares/AuthRequired';
export default function Routes() {
    
  const routes = useRoutes([
    { path: "/", element: <HomePage/> },
    { path: "auth/*", element: <IsAuthenticated/> ,children:auth_routes},
    { path: "profile/*", element: <AuthRequired/>,children:ProfileRoutes},
    { path: "restaurants/*", element: <Outlet/>,children:RestaurantsRoutes},
    { path: "admin/*", element:<AuthRequired children={<Outlet/>}/> , children:admin_routes},
  ]);

  return routes;
}
