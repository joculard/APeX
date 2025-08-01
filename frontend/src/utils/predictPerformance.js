export async function predictPerformance(scores) {
  const response = await fetch("http://localhost:5000/api/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ scores }),
  });

  if (!response.ok) {
    throw new Error("Prediction request failed");
  }

  const data = await response.json();
  return data.next_score;
}
