import React from 'react';

function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Students */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700">Total Students</h3>
          <p className="text-3xl font-bold text-indigo-700 mt-2">452</p>
        </div>

        {/* Attendance */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700">Average Attendance</h3>
          <p className="text-3xl font-bold text-indigo-700 mt-2">91%</p>
        </div>

        {/* Performance */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700">Top Performer Grade</h3>
          <p className="text-3xl font-bold text-indigo-700 mt-2">A+</p>
        </div>
      </div>

      {/* Section: Notices or Updates */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Updates</h3>
        <ul className="space-y-3">
          <li className="bg-white p-4 rounded-xl shadow-sm border text-sm text-gray-600">
            🎓 New students have been added to Class 6B.
          </li>
          <li className="bg-white p-4 rounded-xl shadow-sm border text-sm text-gray-600">
            📊 Midterm performance report is ready to download.
          </li>
          <li className="bg-white p-4 rounded-xl shadow-sm border text-sm text-gray-600">
            📝 Upcoming parent-teacher conference scheduled for Friday.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
