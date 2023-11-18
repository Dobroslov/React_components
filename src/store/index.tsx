import { configureStore } from '@reduxjs/toolkit';
import starWarsReducer from './StarWarsSlice';

export const store = configureStore({
	reducer: {
		starWars: starWarsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
