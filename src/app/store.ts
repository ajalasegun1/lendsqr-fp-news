import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import {apiSlice} from '../features/api/apiSlice';
const rootReducer = combineReducers({
  authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
