import { lazy } from "react";
const Layout = lazy(() => import("components/Layout/Layout"));
const Login = lazy(() => import("pages/login/login"));
const Register = lazy(() => import("pages/register/register"));
const Project = lazy(() => import("pages/project/project"));
const Kanban = lazy(() => import("pages/kanban/kanban"));
const Epic = lazy(() => import("pages/epic/epic"));
export default [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/project",
        element: <Project />,
      },
      {
        path: "/project/:id/kanban",
        element: <Kanban />,
      },
      {
        path: "/project/:id/epic",
        element: <Epic />,
      },
    ],
  },
];
