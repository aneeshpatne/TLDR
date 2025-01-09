from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from openai import OpenAI
from dotenv import load_dotenv
app = Flask(__name__)
CORS(app)
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv('OPENROUTER_KEY')
)
@app.route('/extract', methods=['POST'])
def extract():
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400
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
    try:
        response = client.chat.completions.create(
            model="mistralai/mistral-7b-instruct:free",
            messages =[
                {
                    "role": "system",
                    "content": "Extract the key points from the webpage content below"
                },
                    {
                        "role": "user",
                        "content": prompt
                    }
            ]
        )
        print(response.choices[0].message.content.strip())
        return jsonify({'message': response.choices[0].message.content.strip()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)