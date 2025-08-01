import React, { useState } from "react";
import { predictPerformance } from "../utils/predictPerformance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Reports = () => {
  const [name, setName] = useState("");
  const [inputScores, setInputScores] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [scoreArray, setScoreArray] = useState([]);

  const handlePredict = async () => {
    const scores = inputScores
      .split(",")
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));

    if (scores.length === 0) {
      alert("Please enter valid scores");
      return;
    }

    try {
      const result = await predictPerformance(scores);
      setPrediction(result);
      setScoreArray([...scores, result]); // add predicted score as last
    } catch (err) {
      console.error("Prediction failed", err);
    }
  };

  // Build chart data with labels
  const chartData = scoreArray.map((val, index) => ({
    name: index === scoreArray.length - 1 ? "Predicted" : `Test ${index + 1}`,
    Score: val,
  }));

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Performance Predictor</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Enter scores (e.g., 60, 70, 80)"
        value={inputScores}
        onChange={(e) => setInputScores(e.target.value)}
      />

      <button
        onClick={handlePredict}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Predict
      </button>

      {prediction !== null && (
        <>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Predicted score for <strong>{name || "student"}</strong>:</h3>
            <p className="text-blue-700 font-bold text-xl">{prediction.toFixed(2)}</p>
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-medium mb-2">Score Progress Chart</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Score" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
