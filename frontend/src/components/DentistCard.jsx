import { useNavigate } from "react-router-dom";

const DentistCard = ({ dentist }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3">
      <img
        src={dentist.photo}
        alt={dentist.name}
        className="w-full h-48 object-cover rounded-xl"
      />
      <div>
        <h3 className="text-primary font-bold text-xl">{dentist.name}</h3>
        <p className="text-gray-400 text-lg">{dentist.qualification}</p>
      </div>
      <div className="flex flex-col gap-1 text-lg text-gray-500">
        <span> {dentist.experience} Years Experience</span>
        <span> {dentist.clinicName}</span>
        <span>
          {dentist.address}, {dentist.location}
        </span>
      </div>
      <button
        onClick={() => navigate(`/book/${dentist._id}`)}
        className="bg-primary text-white text-sm font-medium py-2 rounded-xl hover:bg-secondary transition-colors mt-auto"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DentistCard;
