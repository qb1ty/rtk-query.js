import { configureStore } from "@reduxjs/toolkit";
import { foodsApi } from "./foodsApi";

export const store = configureStore({
    reducer: {
        [foodsApi.reducerPath]: foodsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(foodsApi.middleware)
})