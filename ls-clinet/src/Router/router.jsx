import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../page/Home/home/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Any from "../pages/Any";
import PrivateRoute from "./PrivateRouter";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/signUp',
            element: <SignUp></SignUp>
        },
        {
            path: '/any',
            element:<PrivateRoute> <Any></Any></PrivateRoute>
        },
      ]
    },
  ]);