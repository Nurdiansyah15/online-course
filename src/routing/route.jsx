import { createBrowserRouter, Outlet } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Layout from "../components/layout/Layout";
import Courses from "../pages/courses/Courses";
import CreateCourse from "../pages/courses/CreateCourse";
import DetailCourse from "../pages/courses/DetailCourse";
import Users from "../pages/users/Users";
import DetailUser from "../pages/users/DetailUser";
import Settings from "../pages/settings/Settings";
import Faqs from "../pages/faqs/Faqs";
import Transactions from "../pages/transactions/Transactions";

const route = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "courses/create",
        element: <CreateCourse />,
      },
      {
        path: "courses/detail",
        element: <DetailCourse />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/detail",
        element: <DetailUser />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "faqs",
        element: <Faqs />,
      },
    ],
  },
]);

export default route;
