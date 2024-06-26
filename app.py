from flask import Flask, render_template, request, send_file, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.binary import Binary
from PIL import Image
import os, io, time

app = Flask(__name__, template_folder='views')
CORS(app, resources={r"/rotacionar": {"origins": "http://localhost:3000"}})

@app.route('/')
def index():
    return render_template('analise.ejs')

@app.route('/rotacionar', methods=['POST'])
def rotacionar_imagem():
    imagem = request.files['imagem']
    angulo = int(request.form['angulo'])

    img = Image.open(imagem)
    img_rotacionada = img.rotate(angulo)

    img_rotacionada = img_rotacionada.convert('RGB')

    img_buffer = io.BytesIO()
    img_rotacionada.save(img_buffer, format="JPEG")
    img_buffer.seek(0)

    return send_file(img_buffer, mimetype='image/jpeg', as_attachment=True, download_name='imagem_rotacionada.jpg')

@app.route('/imgs/<path:filename>')
def servir_imagem(filename):
    return send_file(f'./static/imgs/{filename}')

if __name__ == '__main__':
    app.run(debug=True)
