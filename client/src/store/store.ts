import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/userSlice";
// import socketReducer from "./features/socketSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
    // socketReducer,
  },
});

// הוספת טיפוסים לstore
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
