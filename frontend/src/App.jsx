import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookAppointment from "./pages/BookAppointment";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:dentistId" element={<BookAppointment />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
