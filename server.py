from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from openai import OpenAI
from dotenv import load_dotenv
import os
load_dotenv()
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_KEY")
)

app = Flask(__name__)
CORS(app)
@app.route('/extract', methods=['POST'])
def extract():
    try:
        
        data = request.get_json()
        if not data or "text" not in data:
            return jsonify({'error': 'Invalid input. "text" is required.'}), 400

 
        prompt = f'''
                Webpage content:
                {data}

                Rules:
                - Maximum 4-5 bullet points only
                - Each bullet must be exactly one short sentence
                - Capture only the most important point
                - No explanations or details

                Format required:
                - Key point 1
                - Key point 2
                '''
        response = client.chat.completions.create(
            model="meta-llama/llama-3.1-405b-instruct:free", 
            messages=[
                {"role": "system", "content": "You are a helpful assistant summarizing webpage content."},
                {"role": "user", "content": prompt}
            ]
        )
        print(response)
        
        assistant_message = response.choices[0].message.content.strip()

        
        return jsonify({'message': assistant_message}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': 'An error occurred', 'details': str(e)}), 500
if __name__ == "__main__":
    app.run(debug=True)