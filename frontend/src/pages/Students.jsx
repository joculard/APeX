import React, { useState } from 'react';

const initialStudents = [
  { id: 1, name: 'Ama Boateng', class: '6A', status: 'Present' },
  { id: 2, name: 'Kwame Nkrumah', class: '6B', status: 'Absent' },
  { id: 3, name: 'Efua Mensah', class: '5A', status: 'Present' },
];

function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', class: '', status: 'Present' });

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStudent = {
      id: Date.now(),
      name: form.name,
      class: form.class,
      status: form.status,
    };
    setStudents([...students, newStudent]);
    setForm({ name: '', class: '', status: 'Present' });
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-800">Student Management</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-xl"
        >
          + Add Student
        </button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-4 py-2 w-full sm:w-1/2 border rounded-xl shadow-sm"
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden border">
          <thead className="bg-indigo-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Class</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4">{student.class}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      student.status === 'Present'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button className="text-blue-600 hover:underline text-sm">Edit</button>
                  <button className="text-red-600 hover:underline text-sm">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStudents.length === 0 && (
          <div className="text-gray-500 text-sm mt-4">No students found.</div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4">Add New Student</h3>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full border px-4 py-2 rounded-md"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="text"
                required
                placeholder="Class (e.g. 6A)"
                className="w-full border px-4 py-2 rounded-md"
                value={form.class}
                onChange={(e) => setForm({ ...form, class: e.target.value })}
              />
              <select
                className="w-full border px-4 py-2 rounded-md"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option>Present</option>
                <option>Absent</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="text-gray-600 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-md"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;
