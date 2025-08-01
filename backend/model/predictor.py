import numpy as np
from sklearn.linear_model import LinearRegression

def predict_performance(scores):
    # Input: [65, 70, 75]
    if not scores or len(scores) < 2:
        return {"error": "Not enough data for prediction."}

    # X = position of each score (like time/order), y = actual scores
    X = np.array(range(len(scores))).reshape(-1, 1)  # [[0], [1], [2]]
    y = np.array(scores)                            # [65, 70, 75]

    # Create and train model
    model = LinearRegression()
    model.fit(X, y)

    # Predict next score (at position len(scores))
    next_index = np.array([[len(scores)]])  # [[3]]
    next_score = model.predict(next_index)[0]  # e.g., 80

    return {"next_score": round(float(next_score), 2)}
