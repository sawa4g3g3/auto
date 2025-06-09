from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app, origins=["https://sawa4g3g3.github.io"])

def get_db_connection():
    conn = sqlite3.connect('/home/flyaks/auto/backend/cars.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/brands')
def brands():
    conn = get_db_connection()
    rows = conn.execute('SELECT * FROM brands').fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@app.route('/models/<brand>')
def models(brand):
    conn = get_db_connection()
    brand_row = conn.execute('SELECT id FROM brands WHERE name = ?', (brand,)).fetchone()
    if not brand_row:
        return jsonify({'error': 'Brand not found'}), 404
    rows = conn.execute('SELECT name, year FROM models WHERE brand_id = ?', (brand_row['id'],)).fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])
