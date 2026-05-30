import { useState } from "react";
import { Header } from "./Components/Header.jsx";
import { Summary } from "./Components/Summary.jsx";
import { ExpenseForm } from "./Components/ExpenseForm.jsx";
import { ExpenseItem } from "./Components/ExpenseItem.jsx";
import { useLocalStorage } from "./useLocalStorage.jsx";
export default function App() {
  const [arr, setArr] = useLocalStorage([], "expenseList");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [editItem, setEditItem] = useState("");

  const handleDelete = (id) => {
    setArr((arr) => arr.filter((elt) => elt.id !== id));
  };
  const handleEdit = (item) => {
    setName(item.name);
    setAmount(item.amount);
    setEditItem(item.id);
  };
  const totalAmount = arr.reduce((acc, curr) => acc + Number(curr.amount), 0);

  // console.log(totalAmount);
  const arrLength = arr.length;

  //Retrieving the data
  // useEffect(function () {
  //   const convertedArray = localStorage.getItem("expenseList");
  //   const savedArray = JSON.parse(convertedArray);
  //   console.log(savedArray);
  //   if (savedArray) setArr(savedArray);
  // }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <Header />
        <ExpenseForm
          initialArr={arr}
          setArr={setArr}
          name={name}
          setName={setName}
          amount={amount}
          setAmount={setAmount}
          editItem={editItem}
          setEditItem={setEditItem}
        />
        <ExpenseList
          arr={arr}
          onHandleEdit={handleEdit}
          onHandleDelete={handleDelete}
        />
        <Summary amount={totalAmount} length={arrLength} />
      </div>
    </div>
  );
}

const ExpenseList = ({ arr, onHandleDelete, onHandleEdit }) => {
  return (
    <ul className="flex flex-col gap-2 mb-4">
      {arr.length === 0 ? (
        <p className="font-bold text-center text-gray-800">
          Start adding expenses to your app
        </p>
      ) : (
        arr.map((item) => (
          <ExpenseItem
            item={item}
            key={item.id}
            onHandleEdit={onHandleEdit}
            onHandleDelete={onHandleDelete}
          />
        ))
      )}
    </ul>
  );
};
