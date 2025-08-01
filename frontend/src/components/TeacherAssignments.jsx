import React, { useState } from "react";

const TeacherAssignments = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async () => {
    await fetch("http://localhost:5000/api/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        due_date: dueDate,
        teacher_id: 1, // hardcoded for now
      }),
    });
    alert("Assignment created");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Create Assignment</h2>
      <input
        type="text"
        placeholder="Title"
        className="border p-2 mb-2 w-full"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="border p-2 mb-2 w-full"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="border p-2 mb-2 w-full"
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default TeacherAssignments;
