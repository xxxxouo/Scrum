import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isUndefined } from "lodash";
import axios from "utils/http";
import { set_current_project } from "state/kanban/reducer";
import { set_kanban_data } from "state/drop/reducer";

const initialState = {
  list: [],
  loading: false,
  users: [],
  organization: [],
  task_types: [],
};

export const getProjectListAsync = createAsyncThunk(
  "project/getProjectList",
  async () => {
    const response = await axios.get("/api/projects");
    return response.data;
  },
);

export const getSingle_Project_Async = createAsyncThunk(
  "project/getSingle_Project",
  async (id, state) => {
    const response = await axios.get(`/api/project/${id}`);
    const kanban = response.data.kanban;
    kanban.forEach(item => {
      item.task.some(task => task == null) ? (item.task = []) : item.task;
    });
    state.dispatch(set_kanban_data(kanban));
    state.dispatch(set_current_project(response.data));
  },
);

export const getUsersAsync = createAsyncThunk("project/getUsers", async () => {
  const response = await axios.get(`/api/users`);
  return response.data;
});

export const getOrganizationAsync = createAsyncThunk(
  "project/getOrganization",
  async () => {
    const response = await axios.get(`/api/organization`);
    return response.data;
  },
);

export const getTaskTypesAsync = createAsyncThunk(
  "project/getTaskTypes",
  async () => {
    const response = await axios.get(`/api/task/type_list`);
    return response.data;
  },
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProjectListAsync.pending, state => {
        state.loading = true;
      })
      .addCase(getProjectListAsync.fulfilled, (state, action) => {
        const data = action.payload.data;
        data.forEach(item => {
          if (isUndefined(item.collect)) item.collect = false;
        });

        state.list = data;
        state.loading = false;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getOrganizationAsync.fulfilled, (state, action) => {
        state.organization = action.payload;
      })
      .addCase(getTaskTypesAsync.fulfilled, (state, action) => {
        state.task_types = action.payload;
      });
  },
});
export const {} = projectSlice.actions;
export default projectSlice.reducer;
