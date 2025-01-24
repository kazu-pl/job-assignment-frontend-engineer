import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";
import throwMiddleware from "./middlewares/throwMiddleware";

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(throwMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
