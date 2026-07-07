import { useState } from "react";
export default function App() {
  const [product, setProduct] = useState([]);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleClick(item, quantity) {
    const newProduct = { Product: item, Quantity: quantity, id: Date.now() };
    setProduct((product) => [...product, newProduct]);
    setItem("");
    setQuantity(1);
  }
  const deleteProduct = (item) => {
    setProduct(product.filter((prod) => prod.id !== item));
  };
  return (
    <div className=" min-h-screen bg-gray-200 grid grid-cols-1 justify-items-center sm:justify-items-stretch sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-3 lg:gap-2 p-4">
      <Form
        item={item}
        onSetItem={setItem}
        quantity={quantity}
        onSetQuantity={setQuantity}
        handleSubmit={handleClick}
      />
      <Item product={product} onDeleteProduct={deleteProduct} />
      <Summary product={product} />
    </div>
  );
}

const Form = ({ item, onSetItem, quantity, onSetQuantity, handleSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(item, quantity);
      }}
    >
      <div>
        <span style={{ marginRight: "10px" }}>Product Name</span>
        <input
          style={{ border: "2px solid red" }}
          type="text"
          value={item}
          onChange={(i) => onSetItem(i.target.value)}
        />
      </div>

      <br />
      <br />
      <span style={{ marginRight: "60px" }}>Quantity</span>
      <input
        type="number"
        value={quantity}
        onChange={(e) => {
          e.target.value === ""
            ? onSetQuantity("")
            : onSetQuantity(+e.target.value);
        }}
      />
      <br />
      <br />
      <button type="submit">Add to Cart</button>
    </form>
  );
};
const Item = ({ product, onDeleteProduct }) => {
  return (
    <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {product.map((prod) => (
        <ProductCard key={prod.id} product={prod} onDelete={onDeleteProduct} />
      ))}
    </div>
  );
};

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className=" font-sans-serif bg-white hover:shadow-xl transition  shadow-lg max-w-xs border border-gray-300 border-solid rounded-lg flex flex-col  p-4">
      <img
        src="https://picsum.photos/400"
        alt="product"
        className="w-full  h-32 object-cover rounded-md "
      ></img>
      <div className="pt-3 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-lg font-bold mt-3 text-gray-800">
            {product.Product}
          </h2>
          <p className="text-gray-600 bg-red">Quantity:{product.Quantity}</p>
          <p className="text-gray-600 font-bold ">$499</p>
        </div>
        <button
          onClick={() => onDelete(product.id)}
          className="mt-3 w-full bg-gray-600 hover:bg-gray-800 text-white py-2 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
const Summary = ({ product }) => {
  const productQuantity = product.length;
  const quantityTotal = product.reduce((acc, curr) => acc + curr.Quantity, 0);
  return (
    <div className="summary">
      <p>The number of items in the cart is {productQuantity}</p>
      <p>Total Quantity of all items is {quantityTotal}</p>
    </div>
  );
};
