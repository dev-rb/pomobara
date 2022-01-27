import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import taskSlice from './slices/taskSlice';

const rootReducer = combineReducers({
    tasks: taskSlice,
    user: authSlice
})

export const store = configureStore({
    reducer: rootReducer
})

export type IRootState = ReturnType<typeof rootReducer>;