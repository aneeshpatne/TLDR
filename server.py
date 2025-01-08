from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
app = Flask(__name__)
@app.router('/extract', methods=['POST'])
def extract():
    data = request.get_json()
    html = data['html']
    if not html:
        return jsonify({'error': 'No HTML provided'}), 400
    soup = BeautifulSoup(html, 'html.parser')
    title = soup.title.string if soup.title else 'No title found'
    paragraphs = [p.get_text(strip=True) for p in soup.find_all('p')]
    content = '\n'.join(paragraphs)

    return jsonify({
        'title': title,
        'content': content
    })