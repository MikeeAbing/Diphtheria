import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Consultation = {
  patient_number: string;
  consultation_id: string;
  consultation_date: string;
  consultation_time: string;
  mode_of_transaction: string;
  type_of_consultation: string;
  chief_complaint: string;
  fullname: string;
};

const Consultations: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('/api/jsonfile')
      .then((res) => {
        setConsultations(res.data.data);  // ✅ setting data
        setLoading(false);                // ✅ updating loading state
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Consultation List</h1>
      <ul className="space-y-2">
        {consultations.map((consultation) => (
          <li key={consultation.consultation_id} className="p-2 bg-gray-100 rounded">
            {consultation.fullname} - {consultation.mode_of_transaction}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Consultations;
