import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-card px-8 py-4 border-b border-dusty-rose/30 flex items-center justify-between ">
      <h1 className="text-2xl font-semibold color-mauve">Business Dashboard</h1>
      <nav>
        <ul className="flex items-center gap-8">
          <li>
            <NavLink
              to="/"
              className="text-muted-text text-xl font-medium hover:text-mauve transition-colors"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              className="text-muted-text text-xl font-medium hover:text-mauve transition-colors"
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customers"
              className="text-muted-text text-xl font-medium hover:text-mauve transition-colors"
            >
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className="text-muted-text text-xl font-medium hover:text-mauve transition-colors"
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
