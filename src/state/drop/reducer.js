import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "utils/http";

const initialState = {
  kanban_data: [],
  project_id: "",
};

const reorderList = (list = [], start, end) => {
  const result = Array.from(list);
  const [removed] = result.splice(start, 1);
  result.splice(end, 0, removed);
  return result;
};

export const drop_update_async = createAsyncThunk(
  "drop/update",
  async (action, state) => {
    const store = state.getState();
    await axios.put(
      `/api/projects/${store.drop.project_id}/kanban`,
      store.drop.kanban_data,
    );
  },
);

const dropSlice = createSlice({
  name: "drop",
  initialState,
  reducers: {
    set_kanban_data: (state, action) => {
      state.kanban_data = action.payload;
    },
    set_project_id: (state, action) => {
      state.project_id = action.payload;
    },
    kanban_order: (state, action) => {
      const result = reorderList(
        state.kanban_data,
        action.payload.source,
        action.payload.destination,
      );
      state.kanban_data = result;
    },
    task_same_order: (state, action) => {
      const kanban = state.kanban_data.find(
        item => item.kanban_key === action.payload.kanban_key,
      );
      let task_arr = kanban.task;
      task_arr = reorderList(
        kanban.task,
        action.payload.source,
        action.payload.destination,
      );
      kanban.task = task_arr;
    },
    task_diff_order: (state, action) => {
      const source = state.kanban_data.find(
        item => item.kanban_key === action.payload.source_kanban_key,
      );
      const destination = state.kanban_data.find(
        item => item.kanban_key === action.payload.destination_kanban_key,
      );
      const source_task_arr = source.task;
      const destination_task_arr = destination.task;
      const [removed] = source_task_arr.splice(action.payload.source, 1);
      destination_task_arr.splice(action.payload.destination, 0, removed);
    },
    add_kanban: (state, action) => {
      const kanban_key = action.payload.kanban_key;
      state.kanban_data.push({
        kanban_key,
        task: [],
      });
    },
    delete_kanban: (state, action) => {
      const kanban_key = action.payload.kanban_key;
      const index = state.kanban_data.findIndex(
        item => item.kanban_key === kanban_key,
      );
      state.kanban_data.splice(index, 1);
    },
    add_task: (state, action) => {
      const kanban_key = action.payload.kanban_key;
      const task_data = action.payload.task;

      const kanban = state.kanban_data.find(
        item => item.kanban_key === kanban_key,
      );
      kanban.task.push(task_data);
    },
    delete_task: (state, action) => {
      const kanban_key = action.payload.kanban_key;
      const task_id = action.payload.task_id;

      const kanban = state.kanban_data.find(
        item => item.kanban_key === kanban_key,
      );
      const task_arr = kanban.task;
      const index = task_arr.findIndex(item => item.task_id === task_id);
      task_arr.splice(index, 1);
    },
    update_task: (state, action) => {
      const kanban_key = action.payload.kanban_key;
      const task_id = action.payload.task_id;
      const task_data = action.payload.task;

      const kanban = state.kanban_data.find(
        item => item.kanban_key === kanban_key,
      );
      const task_arr = kanban.task;
      const index = task_arr.findIndex(item => item.task_id === task_id);
      task_arr[index] = task_data;
    },
  },
});

export const {
  set_kanban_data,
  set_project_id,
  kanban_order,
  task_same_order,
  task_diff_order,
  add_kanban,
  delete_kanban,
  add_task,
  delete_task,
  update_task,
} = dropSlice.actions;
export default dropSlice.reducer;
