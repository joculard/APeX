from flask import Blueprint, request, jsonify
from model.predictor import predict_performance

bp = Blueprint("predict", __name__)

@bp.route("/predict", methods=["POST"])
def predict():
    data = request.get_json() or {}
    scores = data.get("scores", [])
    result = predict_performance(scores)
    return jsonify(result)
