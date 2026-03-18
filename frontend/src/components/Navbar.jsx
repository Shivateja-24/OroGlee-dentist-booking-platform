import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("adminToken");

  return (
    <nav className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
      <span className="text-primary font-bold text-4xl tracking-tight">
        OroGlee
      </span>
      <div className="flex gap-8 text-lg font-medium text-gray-600">
        <Link to="/" className="hover:text-secondary transition-colors">
          Find Dentist
        </Link>
        <Link
          to={token ? "/admin/dashboard" : "/admin/login"}
          className="hover:text-secondary transition-colors"
        >
          Admin Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
