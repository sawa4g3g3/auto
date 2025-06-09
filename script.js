let selectedCar = null;
let models = [];
let selectedModel = null;

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    loadBrands();
});

// Загружаем список марок с сервера
function loadBrands() {
    fetch("https://cosaric.suprisemake.workers.dev/api/brands")
        .then(response => response.json())
        .then(data => {
            const carGrid = document.querySelector(".car-grid");
            carGrid.innerHTML = "";
            data.forEach(brand => {
                const div = document.createElement("div");
                div.className = "car-item";
                div.innerHTML = `<img src="${brand.name.toLowerCase()}-logo.png" alt="${brand.name}"><span>${brand.name}</span>`;
                div.onclick = () => selectCar(brand.name);
                carGrid.appendChild(div);
            });
        });
}

function selectCar(car) {
    document.querySelectorAll(".car-item").forEach(item => item.classList.remove("selected"));
    const selectedCarElement = Array.from(document.querySelectorAll(".car-item")).find(item =>
        item.textContent.trim() === car
    );
    if (selectedCarElement) selectedCarElement.classList.add("selected");

    selectedCar = car;
    document.getElementById("choose-car").style.display = "inline-block";
}

function showModelSelection() {
    if (!selectedCar) return;
    document.getElementById("car-selection").style.display = "none";
    document.getElementById("model-selection").style.display = "block";
    fetchModels(selectedCar);
}

function fetchModels(car) {
    fetch(`https://cosaric.suprisemake.workers.dev/api/models/${encodeURIComponent(car)}`)
        .then(response => response.json())
        .then(data => {
            models = data;
            updateModelList();
        });
}

function updateModelList() {
    const modelList = document.getElementById("model-list");
    modelList.innerHTML = "";
    models.forEach(item => {
        const modelItem = document.createElement("div");
        modelItem.className = "model-item";
        modelItem.textContent = `${item.name} (${item.year})`;
        modelItem.onclick = () => selectModel(item);
        modelList.appendChild(modelItem);
    });
}

function filterModels() {
    const searchTerm = document.getElementById("model-search").value.toLowerCase();
    const modelList = document.getElementById("model-list");
    modelList.innerHTML = "";
    models.forEach(item => {
        if (item.name.toLowerCase().includes(searchTerm) || item.year.includes(searchTerm)) {
            const modelItem = document.createElement("div");
            modelItem.className = "model-item";
            modelItem.textContent = `${item.name} (${item.year})`;
            modelItem.onclick = () => selectModel(item);
            modelList.appendChild(modelItem);
        }
    });
}

function selectModel(item) {
    selectedModel = item; // Сохраняем весь объект
    document.getElementById("model-search").value = `${item.name} (${item.year})`;
    document.getElementById("next").style.display = "inline-block";
}

function showSelectionResult() {
    if (!selectedCar || !selectedModel) {
        alert("Пожалуйста, выберите модель");
        return;
    }
    
    // Скрываем текущий раздел
    document.getElementById("model-selection").style.display = "none";
    
    // Показываем результат
    const resultSection = document.getElementById("result-section");
    resultSection.style.display = "block";
    
    // Отображаем выбранный автомобиль
    document.getElementById("selected-car-info").textContent = 
        `Вы выбрали: ${selectedCar} ${selectedModel.name} (${selectedModel.year})`;
}

function resetSelection() {
    // Сбрасываем выбор
    selectedCar = null;
    selectedModel = null;
    models = [];
    
    // Очищаем поля
    document.getElementById("model-search").value = "";
    
    // Показываем начальный экран
    document.getElementById("result-section").style.display = "none";
    document.getElementById("car-selection").style.display = "block";
    
    // Сбрасываем выделение брендов
    document.querySelectorAll(".car-item").forEach(item => item.classList.remove("selected"));
    document.getElementById("choose-car").style.display = "none";
        }
