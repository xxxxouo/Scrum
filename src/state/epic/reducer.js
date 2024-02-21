import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal_show: false,
};

const epicSlice = createSlice({
  name: "epic",
  initialState,
  reducers: {
    set_epic_createmodal_show(state, action) {
      state.modal_show = action.payload;
    },
  },
});

export const { set_epic_createmodal_show } = epicSlice.actions;
export default epicSlice.reducer;
