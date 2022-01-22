import { configureStore, combineReducers } from '@reduxjs/toolkit';
import taskSlice from './slices/taskSlice';

const rootReducer = combineReducers({
    tasks: taskSlice
})

export const store = configureStore({
    reducer: rootReducer
})

export type IRootState = ReturnType<typeof rootReducer>;