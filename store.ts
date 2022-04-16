import { configureStore } from "@reduxjs/toolkit";
import card from "./src/components/Card/card-slice";
import sidebar from "src/components/Header/Sidebar/searchbar-slice";
export const store = configureStore({
  reducer: { card, sidebar },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
