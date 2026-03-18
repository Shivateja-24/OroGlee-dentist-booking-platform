import { useState, useEffect } from "react";
import DentistCard from "../components/DentistCard";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/dentists`);
        const data = await response.json();
        setDentists(data);
      } catch (err) {
        setError("Failed to load dentists", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDentists();
  }, []);

  return (
    <div className="bg-neutral min-h-screen">
      <div className="px-8 py-12 w-full max-w-7xl">
        <h1 className="text-primary text-7xl font-bold leading-tight mb-3">
          Find the Care Your Smile <br /> Deserves.
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          Browse our trusted network of top-tier dental professionals, selected
          for their clinical excellence and patient care.
        </p>

        {loading && <p className="text-gray-400">Loading dentists...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dentists.map((dentist) => (
            <DentistCard key={dentist._id} dentist={dentist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
