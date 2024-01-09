import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import dropReducer from "./drop/reducer";
import projectReducer from "./project/reducer";
import kanbanReducer from "./kanban/reducer";

const reducer = {
  drop: dropReducer,
  project: projectReducer,
  kanban: kanbanReducer,
};

const state = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default state;
