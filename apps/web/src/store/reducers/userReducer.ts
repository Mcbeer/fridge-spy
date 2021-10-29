import { IUser } from "@fridgespy/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: IUser = {
  id: "",
  email: "",
  name: "",
  createdAt: "",
  updatedAt: "",
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    set: (state: IUser, action: PayloadAction<IUser>) => {
      state = action.payload;
    },
    remove: (state: IUser) => {
      state = initialState;
    },
  },
});

export const userActions = userReducer.actions;

export const selectUser = (state: RootState) => state.user;

const reducer = userReducer.reducer;

export { reducer as userReducer };
