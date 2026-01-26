from google import genai
from app.config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)

def run_fake_detection(crisis):
    prompt = f"""
You are an AI system that detects fake or misleading emergency reports.

Return STRICT JSON with:
- is_fake (boolean)
- confidence (0-1)
- risk_level ("LOW","MEDIUM","HIGH", "CRITICAL")
- reasons (array)
- flags (array)

Crisis Data:
{crisis}
"""

    contents = [prompt]

    if crisis.get("image_url"):
        contents.append({
            "type": "image_url",
            "image_url": crisis["img_url"]
        })

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=contents,
        config={
            "temperature": 0.2,
            "max_output_tokens": 1024
        }
    )


    print("response .text ",response.text)

    return response.text
