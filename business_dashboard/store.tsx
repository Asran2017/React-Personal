import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./src/features/customers/customerSlice";
import orderReducer from "./src/features/orders/orderSlice";
import { useDispatch, useSelector } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
const store = configureStore({
  reducer: { customer: customerReducer, order: orderReducer },
});
export default store;
