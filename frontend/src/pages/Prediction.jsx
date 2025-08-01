import React, { useState } from "react";
import axios from "axios";

export default function Prediction() {
  const [scores, setScores] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scoreList = scores.split(",").map(Number);

    try {
      const res = await axios.post("http://localhost:5000/api/predict", {
        scores: scoreList,
      });
      setResult(res.data.next_score);
    } catch (err) {
      console.error("Prediction failed", err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Predict Student Performance</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border w-full p-2 mb-2"
          type="text"
          placeholder="Enter scores (e.g. 65,70,75)"
          value={scores}
          onChange={(e) => setScores(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
          Predict
        </button>
      </form>
      {result !== null && (
        <p className="mt-4 text-lg">
          📈 Predicted next score: <strong>{result}</strong>
        </p>
      )}
    </div>
  );
}
