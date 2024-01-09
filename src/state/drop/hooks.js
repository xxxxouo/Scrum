import { useSelector } from "react-redux";

export const useKanban_dataState = () =>
  useSelector(state => state.drop.kanban_data);
