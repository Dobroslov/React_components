import { configureStore } from '@reduxjs/toolkit';
import starWarsReducer from './StarWarsSlice';
import { starWarsApi } from './starWarsApi';

export const store = configureStore({
	reducer: {
		starWars: starWarsReducer,
		[starWarsApi.reducerPath]: starWarsApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(starWarsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
