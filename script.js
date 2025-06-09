/* Основные стили */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    background-color: #f5f5f5;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

#car-selection, #model-selection, #result-section {
    text-align: center;
    max-width: 90vw;
    width: 100%;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.car-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
}

.car-item {
    flex: 0 1 30%;
    max-width: 150px;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease, border 0.3s ease;
    cursor: pointer;
    border: 1px solid #ddd;
}

.car-item img {
    width: 100%;
    opacity: 0.8;
    transition: opacity 0.3s;
}

.car-item:hover img, .car-item.selected img {
    opacity: 1;
}

.car-item.selected {
    background-color: #f0f0f0;
    border: 2px solid blue;
    padding: 8px;
}

.car-item span {
    display: block;
    margin-top: 8px;
    font-weight: bold;
}

/* Стили кнопок */
#choose-car, #next, .btn-primary {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;
}

/* Эффект при наведении и нажатии на кнопки */
#choose-car:hover, #next:hover, .btn-primary:hover {
    background-color: blue;
    transform: scale(1.1);
}

#choose-car:active, #next:active, .btn-primary:active {
    background-color: darkblue;
    transform: scale(1.05);
}

/* Стили для списка моделей */
.model-list {
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ddd;
    margin-top: 10px;
    padding: 5px;
    border-radius: 5px;
}

.model-item {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-bottom: 1px solid #eee;
}

.model-item:last-child {
    border-bottom: none;
}

.model-item:hover {
    background-color: #f0f0f0;
}

#model-search {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
}

/* Стили для раздела результата */
#result-section h2 {
    color: #2c3e50;
}

#selected-car-info {
    font-size: 20px;
    color: #27ae60;
    margin: 20px 0;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 5px;
    border-left: 4px solid #27ae60;
}

/* Адаптивный стиль */
@media (max-width: 600px) {
    .car-item {
        flex: 0 1 40%;
    }
    
    body {
        padding: 10px;
    }
}
