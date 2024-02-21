import { useEffect } from "react";
import {
  getUsersAsync,
  getOrganizationAsync,
  getTaskTypesAsync,
} from "state/project/reducer";
import { useDispatch } from "react-redux";

/**
 * @description 登陆状态下的全局数据
 */
export default function useGlobal() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersAsync()); // 存储到redux的project下用户
    dispatch(getOrganizationAsync()); // 存储到redux的project下的部门
    dispatch(getTaskTypesAsync()); // 存储到redux的project下的任务类型
  }, [dispatch]);
  return null;
}
