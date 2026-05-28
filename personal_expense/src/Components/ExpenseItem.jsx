export const ExpenseItem = ({ item, onHandleDelete, onHandleEdit }) => {
  return (
    <li
      className="flex justify-between items-center
bg-white rounded-xl shadow-sm hover:shadow-md px-3 py-2 rounded border border-gray-100"
    >
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-gray-800">{item.name}</span>
        <div className="flex items-center gap-3">
          <span className="text-gray-700 text-sm">₹{item.amount}</span>
          <span className="font-medium text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {item.category}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onHandleEdit(item)}
          className="text-blue-500 text-sm px-2 py-1 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onHandleDelete(item.id)}
          className="text-red-500 text-sm px-2 py-1 bg-red-100 rounded-lg transition hover:bg-red-200"
        >
          Delete
        </button>
      </div>
    </li>
  );
};
