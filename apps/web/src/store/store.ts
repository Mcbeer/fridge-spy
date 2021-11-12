import { configureStore } from "@reduxjs/toolkit";
import { houseReducer } from "./reducers/houseReducer";
import { locationReducer } from "./reducers/locationReducer";
import { userReducer } from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    house: houseReducer,
    user: userReducer,
    location: locationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
