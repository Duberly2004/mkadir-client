import RestaurantAdminPage from "../pages/admin/restaurant/RestaurantAdminPage";
import EmployeeAdminPage from "../pages/admin/employee/EmployeeAdminPage";

import AdminPage from '../pages/AdminPage'
import FormRestaurant from "../components/forms/FormRestaurant";
import FormEmployee from "../components/forms/FormEmployee";

import { Outlet } from "react-router-dom";
import GetRestaurantAdminPage from "../pages/admin/restaurant/GetRestaurantAdminPage";
import GetEmployeeAdminPage from "../pages/admin/employee/GetEmployeeAdminPage";

const restuarants_admin_routes = [
  { path: "",element:<RestaurantAdminPage/>},
  { path: ":restaurant_id",element:<GetRestaurantAdminPage/>},
  { path: "create",element:<FormRestaurant/>},
  { path: "update/:restaurant_id",element:<FormRestaurant/>},
]

const employees_admin_routes = [
  { path: "",element:<EmployeeAdminPage/>},
  { path: ":employee_id",element:<GetEmployeeAdminPage/>},
  { path: "create",element:<FormEmployee/>},
  { path: "update/:employee_id",element:<FormEmployee/>},
]
const admin_routes = [
    { path: "", element: <AdminPage/> },
    { path: "restaurants/*", element: <Outlet/>,children:restuarants_admin_routes},
    { path: "employees/*", element: <Outlet/>,children:employees_admin_routes}

  ];

export default admin_routes