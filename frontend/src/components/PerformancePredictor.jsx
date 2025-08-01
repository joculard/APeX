import React, { useState } from "react";
import { predictPerformance } from "../utils/predictPerformance";

function PerformancePredictor() {
  const [scores, setScores] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setPrediction(null);
    try {
      const scoreArray = scores
        .split(",")
        .map((s) => parseFloat(s.trim()))
        .filter((n) => !isNaN(n));

      if (scoreArray.length === 0) {
        setError("Please enter valid scores.");
        return;
      }

      const result = await predictPerformance(scoreArray);
      setPrediction(result);
    } catch (err) {
      console.error(err);
      setError("Prediction failed. Server may be down.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto rounded-xl shadow-md space-y-4 bg-white">
      <h2 className="text-xl font-bold">Performance Predictor</h2>
      <input
        type="text"
        placeholder="Enter past scores (e.g., 65,70,75)"
        value={scores}
        onChange={(e) => setScores(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Predict
      </button>

      {prediction !== null && (
        <p className="text-green-600 font-semibold">
          Predicted Next Score: {prediction.toFixed(2)}
        </p>
      )}

      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}

export default PerformancePredictor;
