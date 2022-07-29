import { configureStore } from '@reduxjs/toolkit';
import { driverStandingsApi } from '../api/driverStandings.api';
import { resultsApi } from '../api/results.api';
import { CURRENT_ENV } from '../constants';

const apiMiddlewares = [driverStandingsApi.middleware, resultsApi.middleware];

export const store = configureStore({
  reducer: {
    [driverStandingsApi.reducerPath]: driverStandingsApi.reducer,
    [resultsApi.reducerPath]: resultsApi.reducer,
  },
  devTools: CURRENT_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddlewares),
});

export type RootState = ReturnType<typeof store.getState>;
