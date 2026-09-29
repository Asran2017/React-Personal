import { useAppSelector } from "../../store";
import { SummaryCard } from "../components/SummaryCard";

export function Dashboard() {
  const orders = useAppSelector((state) => state.order);
  const customers = useAppSelector((state) => state.customer);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => {
    acc = acc + order.amount;
    return acc;
  }, 0);
  console.log(totalRevenue);
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending",
  ).length;
  console.log(pendingOrders);
  const totalCustomers = customers.length;
  console.log(totalCustomers);
  const summaryValues: Array<number> = [
    totalOrders,
    totalRevenue,
    pendingOrders,
    totalCustomers,
  ];
  return (
    <div>
      <SummaryCard values={summaryValues} />
    </div>
  );
}

export default Dashboard;
