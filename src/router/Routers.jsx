import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import AddEvent from "../pages/AddEvent";
import MyEvents from "../pages/MyEvents";
import Events from "../pages/Events";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "add-event",
        element: <AddEvent />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "my-events",
        element: <MyEvents />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
]);
