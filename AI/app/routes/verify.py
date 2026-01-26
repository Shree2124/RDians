from flask import Blueprint, request, jsonify
from app.services.supabase_service import fetch_crisis_by_id
from app.services.gemini_service import run_fake_detection

verify_bp = Blueprint("verify", __name__)

@verify_bp.route("/verify-crisis", methods=["POST"])
def verify_crisis():
    body = request.json
    crisis_id = body.get("crisis_id")

    if not crisis_id:
        return jsonify({"error": "crisis_id is required"}), 400

    crisis = fetch_crisis_by_id(crisis_id)

    if not crisis:
        return jsonify({"error": "Crisis not found"}), 404

    ai_result = run_fake_detection(crisis)

    return jsonify({
        "crisis_id": crisis_id,
        "ai_verification": ai_result
    })
