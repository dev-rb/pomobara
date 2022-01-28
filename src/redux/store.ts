import { configureStore, combineReducers, StoreEnhancer } from '@reduxjs/toolkit';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import authSlice from './slices/authSlice';
import taskSlice from './slices/taskSlice';
import { tasksApi } from './apis/tasksApi';


const rootReducer = combineReducers({
    tasks: taskSlice,
    user: authSlice,
    [tasksApi.reducerPath]: tasksApi.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware),
    enhancers: [offline(offlineConfig) as StoreEnhancer]
})

export type IRootState = ReturnType<typeof rootReducer>;