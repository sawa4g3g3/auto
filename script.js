let selectedCar = null;
let models = {
    Toyota: [{ model: "Camry", year: "2015" }, { model: "Corolla", year: "2018" }, { model: "RAV4", year: "2020" }],
    BMW: [{ model: "3 Series", year: "2017" }, { model: "5 Series", year: "2019" }],
    Mercedes: [{ model: "C-Class", year: "2016" }, { model: "E-Class", year: "2020" }],
    Honda: [{ model: "Civic", year: "2018" }, { model: "Accord", year: "2019" }],
    Ford: [{ model: "Focus", year: "2017" }, { model: "Mustang", year: "2020" }],
    Audi: [{ model: "A4", year: "2016" }, { model: "A6", year: "2019" }]
};

function selectCar(car) {
    // Убираем выделение с предыдущего выбранного автомобиля
    document.querySelectorAll(".car-item").forEach(item => item.classList.remove("selected"));

    // Выделяем текущий выбранный автомобиль
    const selectedCarElement = document.querySelector(`.car-item[onclick="selectCar('${car}')"]`);
    selectedCarElement.classList.add("selected");

    selectedCar = car;
    document.getElementById("choose-car").style.display = "inline-block";
}

function showModelSelection() {
    if (!selectedCar) return;
    document.getElementById("car-selection").style.display = "none";
    document.getElementById("model-selection").style.display = "block";
    updateModelList();
}

function updateModelList() {
    const modelList = document.getElementById("model-list");
    modelList.innerHTML = "";
    models[selectedCar].forEach(item => {
        const modelItem = document.createElement("div");
        modelItem.className = "model-item";
        modelItem.textContent = `${item.model} (${item.year})`;
        modelItem.onclick = () => selectModel(item);
        modelList.appendChild(modelItem);
    });
}

function filterModels() {
    const searchTerm = document.getElementById("model-search").value.toLowerCase();
    const modelList = document.getElementById("model-list");
    modelList.innerHTML = "";
    models[selectedCar].forEach(item => {
        if (item.model.toLowerCase().includes(searchTerm) || item.year.includes(searchTerm)) {
            const modelItem = document.createElement("div");
            modelItem.className = "model-item";
            modelItem.textContent = `${item.model} (${item.year})`;
            modelItem.onclick = () => selectModel(item);
            modelList.appendChild(modelItem);
        }
    });
}

function selectModel(item) {
    document.getElementById("model-search").value = item.model;
    document.getElementById("next").style.display = "inline-block";
}

function proceedToNext() {
    alert(`Вы выбрали: ${selectedCar} ${document.getElementById("model-search").value}`);
}
