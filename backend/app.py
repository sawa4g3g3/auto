from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
from decouple import config

app = Flask(__name__)
CORS(app)

# Загрузка конфигурации БД
DB_CONFIG = {
    "host": config('DB_HOST'),
    "database": config('DB_NAME'),
    "user": config('DB_USER'),
    "password": config('DB_PASSWORD'),
    "port": config('DB_PORT', default='5432')
}

def get_db_connection():
    conn = psycopg2.connect(**DB_CONFIG)
    return conn

# 1. Эндпоинт для всех брендов
@app.route('/api/brands', methods=['GET'])
def get_all_brands():
    try:
        conn = get_db_connection()
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT id, name FROM brands ORDER BY name")
            brands = cur.fetchall()
        return jsonify(brands)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if 'conn' in locals():
            conn.close()

# 2. Эндпоинт для моделей конкретного бренда
@app.route('/api/models/<int:brand_id>', methods=['GET'])
def get_models_by_brand(brand_id):
    try:
        conn = get_db_connection()
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            # Проверяем существование бренда
            cur.execute("SELECT 1 FROM brands WHERE id = %s", (brand_id,))
            if not cur.fetchone():
                return jsonify({"error": "Brand not found"}), 404
            
            # Получаем модели
            cur.execute("""
                SELECT id, name, start_year, end_year 
                FROM models 
                WHERE brand_id = %s 
                ORDER BY start_year
            """, (brand_id,))
            models = cur.fetchall()
        return jsonify(models)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if 'conn' in locals():
            conn.close()

# 3. Эндпоинт для годов выпуска конкретной модели
@app.route('/api/model-years/<int:model_id>', methods=['GET'])
def get_model_years(model_id):
    try:
        conn = get_db_connection()
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                SELECT start_year, end_year 
                FROM models 
                WHERE id = %s
            """, (model_id,))
            model = cur.fetchone()
            
            if not model:
                return jsonify({"error": "Model not found"}), 404
            
            result = {
                "start_year": model['start_year'],
                "end_year": model['end_year'],
                "is_current": model['end_year'] is None
            }
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if 'conn' in locals():
            conn.close()
