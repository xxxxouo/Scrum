import { useSelector } from "react-redux";

export const useEpic_modal_show = () =>
  useSelector(state => state.epic.modal_show);
