import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const BookAppointment = () => {
  const { dentistId } = useParams();
  const navigate = useNavigate();

  const [dentist, setDentist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    appointmentDate: "",
  });

  useEffect(() => {
    const fetchDentist = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/dentists/${dentistId}`);
        const data = await res.json();
        setDentist(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDentist();
  }, [dentistId]);

  const validate = () => {
    const newErrors = {};
    if (!form.patientName.trim()) newErrors.patientName = "Name is required";
    if (!form.age || form.age < 1 || form.age > 120)
      newErrors.age = "Enter a valid age";
    if (!form.gender) newErrors.gender = "Select a gender";
    if (!form.appointmentDate) newErrors.appointmentDate = "Select a date";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, dentist: dentistId }),
      });
      if (res.ok) setSuccess(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-black-400">Loading...</div>;

  if (success)
    return (
      <div className="bg-neutral min-h-screen">
        <div className="max-w-lg mx-auto mt-20 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-primary text-2xl font-bold mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-500 mb-6">
            Your appointment with {dentist?.name} has been booked.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-secondary text-white px-6 py-2 rounded-xl hover:bg-primary transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-neutral min-h-screen">
      <div className="max-w-4xl mx-auto px-8 py-10">
        <button
          onClick={() => navigate("/")}
          className="text-secondary text-sm mb-6 flex items-center gap-1 hover:underline"
        >
          ← BACK TO DENTISTRY
        </button>

        <h1 className="text-primary text-3xl font-bold mb-1">
          Complete Your Booking
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Verify your details and secure your appointment.
        </p>

        <div className="flex gap-8">
          <div className="w-64 shrink-0">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <img
                src={dentist?.photo}
                alt={dentist?.name}
                className="w-16 h-16 rounded-full object-cover mb-3"
              />
              <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
                PRIMARY DENTIST
              </span>
              <h3 className="text-primary font-bold text-lg mt-2">
                {dentist?.name}
              </h3>
              <p className="text-gray-400 text-xs uppercase tracking-wide">
                {dentist?.specialization}
              </p>
              <div className="mt-4 flex flex-col gap-2 text-sm text-gray-500">
                <span> {dentist?.clinicName}</span>
                <span>{dentist?.address}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <span className="bg-primary text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                01
              </span>
              <h4 className="text-primary font-semibold">
                Patient Information
              </h4>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide">
                  Patient Name
                </label>
                <input
                  name="patientName"
                  value={form.patientName}
                  onChange={handleChange}
                  placeholder="Enter full legal name"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mt-1 outline-none focus:border-secondary"
                />
                {errors.patientName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.patientName}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs text-gray-400 uppercase tracking-wide">
                    Age
                  </label>
                  <input
                    name="age"
                    type="number"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Years"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mt-1 outline-none focus:border-secondary"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-400 uppercase tracking-wide">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mt-1 outline-none focus:border-secondary"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 mb-2">
                <span className="bg-primary text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  02
                </span>
                <h4 className="text-primary font-semibold">
                  Appointment Details
                </h4>
              </div>

              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide">
                  Preferred Appointment Date
                </label>
                <input
                  name="appointmentDate"
                  type="date"
                  value={form.appointmentDate}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mt-1 outline-none focus:border-secondary"
                />
                {errors.appointmentDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.appointmentDate}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-gray-400">
                  🔒 Data is encrypted and protected by OroGlee's Privacy
                  Policy.
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-secondary transition-colors text-sm font-medium"
                >
                  {submitting ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
