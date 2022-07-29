/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction, configureStore, EnhancedStore, Middleware, Reducer } from '@reduxjs/toolkit';

export function setupTestApiStore<
  A extends {
    reducer: Reducer<any, any>;
    reducerPath: string;
    middleware: Middleware;
    util: { resetApiState(): any };
  },
>(api: A) {
  const getStore = () =>
    configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
      },
      middleware: (gdm) => gdm({ serializableCheck: false, immutableCheck: false }).concat(api.middleware),
    });

  type StoreType = EnhancedStore<
    {
      api: ReturnType<A['reducer']>;
    },
    AnyAction,
    ReturnType<typeof getStore> extends EnhancedStore<any, any, infer M> ? M : never
  >;

  const initialStore = getStore() as StoreType;
  const refObj = {
    api,
    store: initialStore,
  };

  return refObj;
}
