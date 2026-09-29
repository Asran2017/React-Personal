import { useAppDispatch, useAppSelector } from "../../store";
import { deleteCustomer } from "../features/customers/customerSlice";
export function Customers() {
  const customers = useAppSelector((state) => state.customer);

  const dispatch = useAppDispatch();

  function handleDelete(id: number) {
    dispatch(deleteCustomer(id));
  }

  return (
    <>
      <h1>Customer List</h1>
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Company</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Location</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b">
              <td className="px-4 py-3">{customer.name}</td>
              <td className="px-4 py-3">{customer.company}</td>
              <td className="px-4 py-3">{customer.email}</td>
              <td className="px-4 py-3">{customer.location}</td>
              <td className="px-4 py-3">{customer.status}</td>
              <td className="px-4 py-3">
                <button onClick={() => handleDelete(customer.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <ul>
        {customers.map((customer) => (
          <>
            <li>{customer.name}</li>
            <button onClick={() => handleDelete(customer.id)}>Delete</button>
          </>
        ))}
      </ul> */}
    </>
  );
}
