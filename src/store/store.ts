import { configureStore } from '@reduxjs/toolkit'
import stock from './reducers/stock'

export const store = configureStore({
  reducer: {
    main: stock,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable serializeable check
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
