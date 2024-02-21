import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    set_login_state(state, action) {
      state.isLogin = action.payload;
    },
  },
});

export const { set_login_state } = loginSlice.actions;
export default loginSlice.reducer;
