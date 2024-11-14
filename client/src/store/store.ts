import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
  },
});

// הוספת טיפוסים לstore
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
