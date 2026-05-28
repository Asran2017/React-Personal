export const Summary = ({ amount, length }) => {
  return (
    <div className="border-t border-dashed mt-3 pt-2 flex flex-col justify-between align-left">
      <p className="font-semibold text-md">Total amount is ₹{amount}</p>
      <p className="text-sm text-gray-500">Number of items is {length}</p>
    </div>
  );
};
