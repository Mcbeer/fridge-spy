import { ILocation } from "@fridgespy/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LocationState {
    [key: string]: ILocation;
}

const initialState = {}

const locationReducer = createSlice({
    name: "location",
    initialState,
    reducers: {
        add: (state: LocationState, action: PayloadAction<ILocation>) => {
            state[action.payload.id] = action.payload;
        },
        hydrate: (state: LocationState, action: PayloadAction<LocationState>) => {
            state = action.payload;
        },
        update: (state: LocationState, action: PayloadAction<ILocation>) => {
            state[action.payload.id] = action.payload;
        },
        delete: (state: LocationState, action: PayloadAction<string>) => {
            delete state[action.payload];
        }
    }
})

export const locationActions = locationReducer.actions;

export const selectLocation = (state: LocationState, id: string): ILocation => state[id];
export const selectLocations = (state: LocationState) => Object.values(state);

const reducer = locationReducer.reducer;

export { reducer as locationReducer };
