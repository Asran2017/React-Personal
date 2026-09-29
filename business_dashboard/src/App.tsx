import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard.tsx";
import { Orders } from "./pages/Orders.tsx";
import { Settings } from "./pages/Settings.tsx";
import { Customers } from "./pages/Customers.tsx";
import Navbar from "./components/Navbar.tsx";
import { Provider } from "react-redux";
import store from "../store.tsx";

function App() {
  return (
    <div className="min-h-screen">
      <header className="py-5 ">
        <h1 className="text-5xl tracking-tight text-mauve text-center font-heading font-bold">
          Pulse Board
        </h1>
        <p className="mt-2 text-lg italic text-muted-text text-center">
          Your business, connected and in focus.
        </p>
      </header>

      <BrowserRouter>
        <Navbar />
        <Provider store={store}>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}
export default App;
