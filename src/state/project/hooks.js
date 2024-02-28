import { useSelector, shallowEqual } from "react-redux";

export const useProject_List = () => useSelector(state => state.project.list, shallowEqual);

export const useSelectUsers = () => useSelector(state => state.project.users);

export const useSelectOrg = () =>
  useSelector(state => state.project.organization);

export const useSelectTaskTypes = () =>
  useSelector(state => state.project.task_types);

export const useSelectCreateProjectModel = () =>
  useSelector(state => state.project.project_model.show);

export const useSelectProjectModelData = () =>
  useSelector(state => state.project.project_model);
