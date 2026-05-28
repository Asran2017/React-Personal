import { useState, useRef, useEffect } from "react";
import { ErrorMessage } from "./ErrorMessage.jsx";

export const ExpenseForm = ({
  editItem,
  setEditItem,
  initialArr,
  setArr,
  name,
  setName,
  amount,
  setAmount,
}) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [category, setCategory] = useState("Food");

  const inputRef = useRef(null);
  const handleAdd = (item) => {
    if (initialArr.some((elt) => elt.name === item.name) && !editItem) {
      setErrorMessage(true);

      return false;
    }
    setArr((arr) => [...arr, item]);
    setErrorMessage(false);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;
    if (editItem) {
      setArr((curr) =>
        curr.map((elt) =>
          elt.id === editItem ? { ...elt, name, amount } : elt,
        ),
      );
      // console.log(editItem);
      inputRef.current.focus();

      setAmount("");
      setName("");
      setEditItem("");
      return;
    }

    if (Math.sign(amount) !== 1) {
      alert("Enter a valid amount");
      return;
    }
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    const newItem = { name: capitalizedName, amount, id: Date.now(), category };
    // console.log(newItem);

    const success = handleAdd(newItem);
    if (success) {
      setName("");
      setAmount("");
      inputRef.current.focus();
    }
  };
  const handleReset = () => {
    setAmount("");
    setName("");
    setEditItem("");
    setCategory("Food");
  };
  useEffect(function () {
    inputRef.current.focus();
  }, []);

  return (
    <form className="flex flex-col gap-5 mb-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700" htmlFor="name">
          Name
        </label>

        <input
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ml-2 focus:border-blue-400 transition shadow-sm"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          ref={inputRef}
        />
        {errorMessage && <ErrorMessage />}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700" htmlFor="amount">
          Amount
        </label>
        <input
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ml-2 shadow-sm focus:border-blue-400 transition"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          Choose an expense category
        </label>
        <select
          className="  border border-gray-300
        rounded-lg
        px-4 py-2
        bg-white
        text-gray-800
        shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
        focus:border-blue-400
        transition"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>

      {editItem ? (
        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-all hover:bg-green-600 font-semibold transition"
        >
          Save Edit
        </button>
      ) : (
        <button
          type="submit"
          className="bg-blue-500  transition-all shadow-md text-white py-2 rounded hover:bg-blue-600 font-semibold transition"
        >
          Add
        </button>
      )}
      <button
        className="bg-red-500 text-white py-2 active:bg-red-500 transition-all shadow-lg rounded hover:bg-red-600 font-semibold transition"
        onClick={handleReset}
      >
        Reset
      </button>
    </form>
  );
};
