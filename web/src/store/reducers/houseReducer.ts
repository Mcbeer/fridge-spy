import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHouse } from "../../models/IHouse";

export interface HouseState {
  [key: string]: IHouse;
}

const initialState: HouseState = {};

const houseReducer = createSlice({
  name: "house",
  initialState,
  reducers: {
    addHouse: (state: HouseState, action: PayloadAction<IHouse>) => {
      state[action.payload.id] = action.payload;
    },
  },
});

const reducer = houseReducer.reducer;

export { reducer as houseReducer };
