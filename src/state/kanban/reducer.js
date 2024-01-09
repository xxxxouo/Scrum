import { createSlice } from "@reduxjs/toolkit";
import { drop_update_async } from "state/drop/reducer";

const initialState = {
  task_modal_status: {
    show: false,
    kanban_key: "",
    task_id: "",
    type: "create", // create or edit
    comfirm_loading: false,
  },
  current_project: {}, // 当前project 对象
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    set_current_project(state, action) {
      state.current_project = action.payload;
    },
    set_task_modal(state, action) {
      Object.keys(action.payload).forEach(key => {
        state.task_modal_status[key] = action.payload[key];
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(drop_update_async.pending, (state, action) => {
        state.task_modal_status.comfirm_loading = true;
      })
      .addCase(drop_update_async.fulfilled, (state, action) => {
        state.task_modal_status.comfirm_loading = false;
      });
  },
});

export const { set_current_project, set_task_modal } = kanbanSlice.actions;
export default kanbanSlice.reducer;
