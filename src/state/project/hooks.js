import { useSelector } from "react-redux";

export const useProject_List = () => useSelector(state => state.project.list);

export const useSelectUsers = () => useSelector(state => state.project.users);

export const useSelectOrg = () =>
  useSelector(state => state.project.organization);

export const useSelectTaskTypes = () =>
  useSelector(state => state.project.task_types);
