import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dentists, setDentists] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    const fetchData = async () => {
      try {
        const [apptRes, dentRes] = await Promise.all([
          fetch(`${API_BASE_URL}/appointments`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/dentists`),
        ]);
        const apptData = await apptRes.json();
        const dentData = await dentRes.json();
        setAppointments(apptData);
        setDentists(dentData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="bg-neutral min-h-screen">
      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-primary text-3xl font-bold">
              Clinical Overview
            </h1>
            <p className="text-gray-400 text-sm">
              Management portal for OroGlee clinical operations and
              appointments.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 border border-red-200 px-4 py-2 rounded-xl hover:bg-red-50 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-lg text-gray-400 uppercase tracking-wide mb-2">
              Active Database
            </p>
            <h2 className="text-primary text-4xl font-bold">
              {appointments.length}
            </h2>
            <p className="text-gray-400 text-sm mt-1">Total Appointments</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-lg text-gray-400 uppercase tracking-wide mb-2">
              Daily Capacity
            </p>
            <h2 className="text-primary text-4xl font-bold">
              {
                appointments.filter((a) => {
                  const today = new Date().toDateString();
                  return new Date(a.appointmentDate).toDateString() === today;
                }).length
              }
            </h2>
            <p className="text-gray-400 text-sm mt-1">Today's Bookings</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-lg text-gray-400 uppercase tracking-wide mb-2">
              Staff Registry
            </p>
            <h2 className="text-primary text-4xl font-bold">
              {dentists.length}
            </h2>
            <p className="text-gray-400 text-sm mt-1">Total Dentists</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-primary font-bold text-2xl mb-1">
            Patient Records
          </h2>
          <p className="text-gray-400 text-sm mb-6 uppercase tracking-wide">
            Live Data Stream
          </p>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : appointments.length === 0 ? (
            <p className="text-gray-400">No appointments yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-sm uppercase tracking-wide border-b border-gray-100">
                  <th className="text-left py-3">Patient Name</th>
                  <th className="text-left py-3">Bio</th>
                  <th className="text-left py-3">Appointment Date</th>
                  <th className="text-left py-3">Dentist</th>
                  <th className="text-left py-3">Clinic</th>
                  <th className="text-left py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr
                    key={a._id}
                    className="border-b border-gray-50 hover:bg-neutral transition-colors"
                  >
                    <td className="py-4 font-medium text-primary">
                      {a.patientName}
                    </td>
                    <td className="py-4 text-gray-500">
                      {a.age} yrs, {a.gender}
                    </td>
                    <td className="py-4">
                      <span className="bg-secondary/10 text-secondary text-sm px-2 py-1 rounded-lg">
                        {new Date(a.appointmentDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4 text-gray-600">{a.dentist?.name}</td>
                    <td className="py-4 text-gray-600">
                      {a.dentist?.clinicName}
                    </td>
                    <td className="py-4">
                      <span
                        className={`text-sm px-2 py-1 rounded-full font-medium ${
                          a.status === "Booked"
                            ? "bg-blue-50 text-blue-500"
                            : "bg-green-50 text-green-500"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
