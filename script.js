let hunger = 50;
let energy = 50;
let happiness = 50;
let life = 100;
let lastPlayTime = Date.now();

function updateStats() {
    document.getElementById('hunger').textContent = hunger;
    document.getElementById('energy').textContent = energy;
    document.getElementById('happiness').textContent = happiness;
    document.getElementById('life').textContent = life;

    const lifeElement = document.getElementById('life');
    if (life > 80) {
        lifeElement.className = 'life-green';
    } else if (life > 20) {
        lifeElement.className = 'life-yellow';
    } else {
        lifeElement.className = 'life-red';
    }

    if (life <= 0) {
        alert("Your pet has died.");
        clearInterval(lifeInterval);
        clearInterval(happinessInterval);
    }

    // Reiniciar vida si todas las funciones están al máximo
    if (hunger === 100 && energy === 100 && happiness === 100) {
        life = 100;
    }
}

function feed() {
    if (hunger < 100) {
        hunger += 10;
        if (hunger > 100) hunger = 100;
        happiness += 5;
        if (happiness > 100) happiness = 100;
        updateStats();
    }
}

function sleep() {
    if (energy < 100) {
        energy += 10;
        if (energy > 100) energy = 100;
        hunger -= 5;
        if (hunger < 0) hunger = 0;
        updateStats();
    }
}

function play() {
    if (happiness < 100) {
        happiness += 10;
        if (happiness > 100) happiness = 100;
        energy -= 5;
        if (energy < 0) energy = 0;
        hunger -= 5;
        if (hunger < 0) hunger = 0;
        lastPlayTime = Date.now();
        updateStats();
    }
}

function decreaseHappiness() {
    if (Date.now() - lastPlayTime > 5000) { // 5 segundos sin jugar
        happiness -= 5;
        if (happiness < 0) happiness = 0;
        updateStats();
        lastPlayTime = Date.now();
    }
}

function decreaseLife() {
    life -= 1;
    updateStats();
}

let happinessInterval = setInterval(decreaseHappiness, 1000); // Disminuir felicidad cada segundo si no se juega
let lifeInterval = setInterval(decreaseLife, 1000); // Disminuir vida cada segundo

updateStats();

