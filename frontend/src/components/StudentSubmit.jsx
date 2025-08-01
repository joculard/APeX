import React, { useState } from "react";

const StudentSubmit = () => {
  const [assignmentId, setAssignmentId] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async () => {
    await fetch("http://localhost:5000/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assignment_id: assignmentId,
        student_id: 2, // hardcoded
        file_url: fileUrl,
      }),
    });
    alert("Submitted!");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Submit Work</h2>
      <input
        type="text"
        placeholder="Assignment ID"
        className="border p-2 mb-2 w-full"
        onChange={(e) => setAssignmentId(e.target.value)}
      />
      <input
        type="text"
        placeholder="File URL"
        className="border p-2 mb-2 w-full"
        onChange={(e) => setFileUrl(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2"
        onClick={handleSubmit}
      >
        Submit Work
      </button>
    </div>
  );
};

export default StudentSubmit;
