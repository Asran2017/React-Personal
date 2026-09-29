import { createSlice } from "@reduxjs/toolkit";

export type Order = {
  id: string;
  customerId: number;
  date: string;
  items: Array<object>;
  amount: number;
  status: "Completed" | "Pending" | "Processing" | "Cancelled";
};

const initialState: Order[] = [
  {
    id: "ORD-1001",
    customerId: 1,
    date: "2026-08-01",
    items: [
      { product: "Laptop", quantity: 1, price: 75000 },
      { product: "Wireless Mouse", quantity: 2, price: 1500 },
    ],
    amount: 78000,
    status: "Completed",
  },
  {
    id: "ORD-1002",
    customerId: 2,
    date: "2026-08-04",
    items: [{ product: "Monitor", quantity: 2, price: 18000 }],
    amount: 36000,
    status: "Processing",
  },
  {
    id: "ORD-1003",
    customerId: 3,
    date: "2026-08-08",
    items: [
      { product: "Keyboard", quantity: 1, price: 4500 },
      { product: "Headset", quantity: 1, price: 6500 },
    ],
    amount: 11000,
    status: "Cancelled",
  },
  {
    id: "ORD-1004",
    customerId: 4,
    date: "2026-08-12",
    items: [{ product: "Tablet", quantity: 1, price: 32000 }],
    amount: 32000,
    status: "Completed",
  },
  {
    id: "ORD-1005",
    customerId: 5,
    date: "2026-08-18",
    items: [{ product: "Laptop", quantity: 2, price: 75000 }],
    amount: 150000,
    status: "Pending",
  },
  {
    id: "ORD-1006",
    customerId: 2,
    date: "2026-08-22",
    items: [
      { product: "Monitor", quantity: 1, price: 18000 },
      { product: "Keyboard", quantity: 1, price: 4500 },
    ],
    amount: 22500,
    status: "Pending",
  },
];

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
});

export default orderSlice.reducer;
