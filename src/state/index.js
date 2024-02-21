import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import dropReducer from "./drop/reducer";
import projectReducer from "./project/reducer";
import kanbanReducer from "./kanban/reducer";
import epicReducer from "./epic/reducer";
import loginReducer from "./login/reducer";

const reducer = {
  drop: dropReducer,
  project: projectReducer,
  kanban: kanbanReducer,
  epic: epicReducer,
  login: loginReducer,
};

const state = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default state;
