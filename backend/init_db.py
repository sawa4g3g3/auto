import sqlite3

data = {
    "Toyota": [("Camry", "2015"), ("Corolla", "2018"), ("RAV4", "2020")],
    "BMW": [("3 Series", "2017"), ("5 Series", "2019")],
    "Mercedes": [("C-Class", "2016"), ("E-Class", "2020")],
    "Honda": [("Civic", "2018"), ("Accord", "2019")],
    "Ford": [("Focus", "2017"), ("Mustang", "2020")],
    "Audi": [("A4", "2016"), ("A6", "2019")]
}

conn = sqlite3.connect('cars.db')
c = conn.cursor()

c.execute('DROP TABLE IF EXISTS brands')
c.execute('DROP TABLE IF EXISTS models')

c.execute('''
    CREATE TABLE brands (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
    )
''')

c.execute('''
    CREATE TABLE models (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        year TEXT,
        FOREIGN KEY (brand_id) REFERENCES brands (id)
    )
''')

for brand, models in data.items():
    c.execute('INSERT INTO brands (name) VALUES (?)', (brand,))
    brand_id = c.lastrowid
    for model, year in models:
        c.execute('INSERT INTO models (brand_id, name, year) VALUES (?, ?, ?)', (brand_id, model, year))

conn.commit()
conn.close()