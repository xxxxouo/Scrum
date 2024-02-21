import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { useSelectLogin } from "state/login/hooks";
const Layout = lazy(() => import("components/Layout/Layout"));
const Login = lazy(() => import("pages/login/login"));
const Register = lazy(() => import("pages/register/register"));
const Project = lazy(() => import("pages/project/project"));
const Kanban = lazy(() => import("pages/kanban/kanban"));
const Epic = lazy(() => import("pages/epic/epic"));
const Vip = lazy(() => import("pages/vip"));

// 登陆拦截
const PrivateRoute = ({ element, path }) => {
  const islogin = useSelectLogin();
  return islogin ? (
    element
  ) : (
    <Navigate to={"/login"} state={{ path }} replace />
  );
};

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
    path: "/vip",
    element: <PrivateRoute element={<Vip />} path={"/vip"} />,
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
