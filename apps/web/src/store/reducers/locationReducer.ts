import { ILocation } from "@fridgespy/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LocationState {
    [key: string]: ILocation;
}

const initialState: LocationState = {
    "7051bd78-bb58-43a0-ad15-dc0e995971fb": {
        id: "7051bd78-bb58-43a0-ad15-dc0e995971fb",
        name: "Kitchen fridge",
        description: "The main fridge in the kitchen",
        products: {
            "f8f8f8f8-bb58-43a0-ad15-dc0e995971fb": {
                id: "f8f8f8f8-bb58-43a0-ad15-dc0e995971fb",
                product: {
                    id: "19a7237a-52f0-4365-86a1-816d6af43e15",
                    name: "Arla Øko Skummetmælk"
                },
                amount: 2,
                maximumAmount: 3,
                minimumAmount: 0,
                createdAt: "2020-04-01T12:00:00.000Z",
                updatedAt: "2020-04-01T12:00:00.000Z"
            },
            "02562235-d2a1-46dd-a4ff-79481b140cc4": {
                id: "02562235-d2a1-46dd-a4ff-79481b140cc4",
                productType: {
                    id: "6b8b5eb6-1bf0-49ea-945f-e3fc517ea6f3",
                    name: "Nutella"
                },
                amount: 4,
                maximumAmount: 8,
                minimumAmount: 0,
                createdAt: "2020-04-01T12:00:00.000Z",
                updatedAt: "2020-04-01T12:00:00.000Z"
            }
        },
        createdAt: "2020-04-01T12:00:00.000Z",
        updatedAt: "2020-04-01T12:00:00.000Z"
    }
}

const locationSlice = createSlice({
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
        },
        setProductAmount: (state: LocationState, action: PayloadAction<{ locationId: string, productId: string, amount: number }>) => {
            const location = state[action.payload.locationId];
            const product = location.products[action.payload.productId];
            product.amount = action.payload.amount;
        }
    }
})

export const locationActions = locationSlice.actions;

export const selectLocation = (state: LocationState, id: string): ILocation => state[id];
export const selectLocations = (state: LocationState) => Object.values(state);

export const selectLocationProducts = (state: LocationState, id: string) => state[id].products;

const reducer = locationSlice.reducer;

export { reducer as locationReducer };
