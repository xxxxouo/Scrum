import React, { useEffect } from "react";
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
    dispatch(getUsersAsync()); // 用户
    dispatch(getOrganizationAsync()); // 部门
    dispatch(getTaskTypesAsync()); // 任务类型
  }, []);
  return null;
}
