import { configureStore } from "@reduxjs/toolkit";
import card from "./src/components/Card/card-slice";
import changes from "./src/changes/changes";
export const store = configureStore({
  reducer: { card, changes },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
