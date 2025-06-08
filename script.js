let selectedCar = null;
let models = [];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('js-status').style.display = 'block';
    document.getElementById('js-status').textContent = 'JavaScript успешно подключен!';
    console.log("DOM loaded");  // Проверяем, что событие срабатывает
    loadBrands();
});

// Загружаем список марок с сервера
function loadBrands() {
    fetch("https://flyaks.pythonanywhere.com/brands")
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
    fetch(`https://flyaks.pythonanywhere.com/models/${encodeURIComponent(car)}`)
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
    document.getElementById("model-search").value = item.name;
    document.getElementById("next").style.display = "inline-block";
}

function proceedToNext() {
    const modelName = document.getElementById("model-search").value;
    if (!selectedCar || !modelName) return;
    loadServices(selectedCar, modelName);
}

function loadServices(brand, model) {
    fetch(`https://flyaks.pythonanywhere.com/services/${encodeURIComponent(brand)}/${encodeURIComponent(model)}`)
        .then(response => response.json())
        .then(data => {
            showServices(data);
        });
}

function showServices(services) {
    document.getElementById("model-selection").style.display = "none";
    document.getElementById("service-section").style.display = "block";

    const tableBody = document.querySelector("#service-list tbody");
    tableBody.innerHTML = "";

    services.forEach((service, index) => {
        const row = document.createElement("tr");

        const checkboxCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.dataset.price = service.price;
        checkbox.onchange = updateTotal;
        checkboxCell.appendChild(checkbox);

        const nameCell = document.createElement("td");
        nameCell.textContent = service.service;

        const priceCell = document.createElement("td");
        priceCell.textContent = `${service.price} ₸`;
        priceCell.style.textAlign = "right";

        row.appendChild(checkboxCell);
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        tableBody.appendChild(row);
    });

    updateTotal();
}

function updateTotal() {
    const checkboxes = document.querySelectorAll("#service-list input[type='checkbox']");
    let total = 0;
    checkboxes.forEach(cb => {
        if (cb.checked) total += parseInt(cb.dataset.price);
    });
    document.getElementById("total").textContent = `Итого: ${total} ₸`;
}

function submitOrder() {
    const selected = [];
    const checkboxes = document.querySelectorAll("#service-list input[type='checkbox']");
    const names = document.querySelectorAll("#service-list td:nth-child(2)");
    checkboxes.forEach((cb, i) => {
        if (cb.checked) selected.push(names[i].textContent);
    });

    if (selected.length === 0) {
        alert("Вы не выбрали ни одной услуги.");
    } else {
        alert("Вы выбрали:\n" + selected.join(", "));
    }
}

