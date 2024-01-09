import { useSelector } from "react-redux";

export const useGetCurrentProject = () =>
  useSelector(state => state.kanban.current_project);

export const useGetTaskModalStatus = () =>
  useSelector(state => state.kanban.task_modal_status);

export const useGetTaskModalShow = () =>
  useSelector(state => state.kanban.task_modal_status.show);
