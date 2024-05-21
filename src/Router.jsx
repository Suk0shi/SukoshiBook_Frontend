import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Friends from "./components/Friends";
import UpdatePost from "./components/UpdatePost";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import IndividualPost from "./components/IndividualPost";
import Profile from "./components/Profile";
import { useState } from 'react'
// import ErrorPage from "./ErrorPage";

const Router = () => {

  
  const [editInfo, setEditInfo] = useState({});

  const router = createBrowserRouter([
    {
      path: "feed",
      element: <App setEditInfo={setEditInfo}/>,
      // errorElement: <ErrorPage />,
    },
    {
      path: "Friends",
      element: <Friends/>,
    },
    {
      path: "UpdatePost",
      element: <UpdatePost editInfo={editInfo}/>,
    },
    {
      path: "SignUp",
      element: <SignUp />,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "IndividualPost",
      element: <IndividualPost />,
    },
    {
      path: "Profile",
      element: <Profile />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;