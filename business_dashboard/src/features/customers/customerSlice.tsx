import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  joinedDate: string;
  status: "Active" | "Inactive";
};
const initialState: Customer[] = [
  {
    id: 1,
    name: "Arun Kumar",
    email: "arun.kumar@example.com",
    phone: "+91 98765 43210",
    company: "TechNova Solutions",
    location: "Chennai",
    joinedDate: "2026-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 12345",
    company: "BluePeak Industries",
    location: "Bangalore",
    joinedDate: "2026-02-03",
    status: "Active",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    phone: "+91 99887 66554",
    company: "FinEdge",
    location: "Mumbai",
    joinedDate: "2026-02-20",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Sneha Iyer",
    email: "sneha.iyer@example.com",
    phone: "+91 91234 56789",
    company: "GreenLeaf Retail",
    location: "Coimbatore",
    joinedDate: "2026-03-11",
    status: "Active",
  },
  {
    id: 5,
    name: "Vikram Rao",
    email: "vikram.rao@example.com",
    phone: "+91 90012 34567",
    company: "CloudAxis",
    location: "Hyderabad",
    joinedDate: "2026-03-27",
    status: "Active",
  },
];
const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    deleteCustomer(state, action: PayloadAction<number>) {
      return state.filter((customer) => customer.id !== action.payload);
    },
  },
});

export default customerSlice.reducer;
export const { deleteCustomer } = customerSlice.actions;
