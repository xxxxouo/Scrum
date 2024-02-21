import { useSelector } from "react-redux";

export const useSelectLogin = () => {
  return useSelector(state => state.login.isLogin);
};
