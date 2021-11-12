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
    add: (state: HouseState, action: PayloadAction<IHouse>) => {
      state[action.payload.id] = action.payload;
    },
    hydrate: (state: HouseState, action: PayloadAction<HouseState>) => {
      state = action.payload;
    },
    remove: (state: HouseState, action: PayloadAction<IHouse>) => {
      delete state[action.payload.id];
    },
    update: (state: HouseState, action: PayloadAction<IHouse>) => {
      state[action.payload.id] = action.payload;
    }
  },
});

export const houseActions = houseReducer.actions;

const reducer = houseReducer.reducer;

export { reducer as houseReducer };
