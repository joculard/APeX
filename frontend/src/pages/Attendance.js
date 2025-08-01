import React, { useState } from 'react';

const students = [
  { id: 1, name: 'Ama Boateng' },
  { id: 2, name: 'Kwame Nkrumah' },
  { id: 3, name: 'Efua Mensah' },
  { id: 4, name: 'Yaw Ofori' },
];

function Attendance() {
  const [selectedDate, setSelectedDate] = useState('');
  const [attendance, setAttendance] = useState({});

  const handleCheckboxChange = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSave = () => {
    const presentStudents = students.filter((s) => attendance[s.id]);
    alert(
      `Attendance for ${selectedDate || 'today'}:\n` +
        presentStudents.map((s) => s.name).join(', ') ||
        'No one marked present'
    );
    // Placeholder for API call to save attendance
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4">Attendance Tracker</h2>

      {/* Date Picker */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Select Date:</label>
        <input
          type="date"
          className="border px-4 py-2 rounded-md w-full sm:w-1/2"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Student List with Checkboxes */}
      <div className="bg-white p-4 rounded-lg shadow-md border">
        <h3 className="font-semibold mb-4 text-gray-800">Mark Present</h3>
        <ul className="space-y-3">
          {students.map((student) => (
            <li key={student.id} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={attendance[student.id] || false}
                onChange={() => handleCheckboxChange(student.id)}
              />
              <span>{student.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-xl"
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
}

export default Attendance;
