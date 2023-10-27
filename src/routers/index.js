import { lazy } from "react"
const Login = lazy(() => import("../pages/login/login"))
const Register = lazy(() => import("../pages/register/register"))
export default [
  {
    path:'/login',
    element: <Login />,
  },
  {
    path:'/register',
    element: <Register />,
  }
]
