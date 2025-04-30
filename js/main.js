let numberTry = 6;
let numberLetters = 6;
let counterTry = 1;

// Random word from list
let gussWord = "";
let words = ["hassan", "delete", "shcool", "create", "driver", "domain", "couple"];
gussWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
console.log("Guess Word:", gussWord);

const displayWord = document.getElementById("display");

function generateInputs() {
    const inputContainer = document.querySelector(".inputs");

    for (let i = 1; i <= numberTry; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`, "d-flex", "gap-2", "align-items-center");
        tryDiv.innerHTML = `<span class="me-2">Try ${i}</span>`;
        if (i !== counterTry) tryDiv.classList.add("disabled");

        for (let j = 0; j < numberLetters; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;
            input.style.width = "40px";
            tryDiv.appendChild(input);
        }

        inputContainer.appendChild(tryDiv);
    }

    document.querySelectorAll(".disabled input").forEach(input => input.disabled = true);
    document.querySelector(`.try-${counterTry} input`)?.focus();

    addInputListeners();
}

function addInputListeners() {
    const inputs = document.querySelectorAll(`.try-${counterTry} input`);

    inputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {
            e.target.value = e.target.value.toUpperCase();
            if (e.target.value && inputs[index + 1]) {
                inputs[index + 1].focus();
            }
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight" && inputs[index + 1]) {
                inputs[index + 1].focus();
            } else if (e.key === "ArrowLeft" && inputs[index - 1]) {
                inputs[index - 1].focus();
            } else if (e.key === "Backspace") {
                inputs[index].value = "";
                if (index > 0) inputs[index - 1].focus();
            }
        });
    });
}

document.getElementById("check-btn").addEventListener("click", () => {
    const inputs = document.querySelectorAll(`.try-${counterTry} input`);
    let win = true;

    for (let i = 0; i < numberLetters; i++) {
        const input = inputs[i];
        const userLetter = input.value.toUpperCase();
        const correctLetter = gussWord[i];

        input.classList.remove("false", "true-false", "true-true");

        if (userLetter === "") {
            input.classList.add("false");
            displayWord.innerHTML = `<p class="text-center fw-bold h4 text-danger">Please complete all letters.</p>`;
            return;
        }

        if (userLetter === correctLetter) {
            input.classList.add("true-true");
        } else if (gussWord.includes(userLetter)) {
            input.classList.add("true-false");
            win = false;
        } else {
            input.classList.add("false");
            win = false;
        }
    }

    if (win) {
        displayWord.innerHTML = `<p class="text-center fw-bold h4 text-success">Word is correct! You WIN!</p>`;
        document.getElementById("check-btn").disabled = true;
        document.getElementById("hint").disabled = true;
        return;
    }

    // Move to next try
    counterTry++;
    if (counterTry > numberTry) {
        displayWord.innerHTML = `<p class="text-center fw-bold h4 text-danger">Game Over! The word was: ${gussWord}</p>`;
        document.getElementById("check-btn").disabled = true;
        document.getElementById("hint").disabled = true;
        return;
    }

    // Disable current row
    inputs.forEach(input => input.disabled = true);
    const nextInputs = document.querySelectorAll(`.try-${counterTry} input`);
    nextInputs.forEach(input => input.disabled = false);
    document.querySelector(`.try-${counterTry}`)?.classList.remove("disabled");
    nextInputs[0]?.focus();
    addInputListeners();
});

// Hint logic
let numberOfHint = 2;
const hintBtn = document.getElementById("hint");
const hintSpan = document.querySelector("#hint span");
hintSpan.innerHTML = `(${numberOfHint})`;

hintBtn.addEventListener("click", () => {
    if (numberOfHint <= 0) {
        hintBtn.disabled = true;
        return;
    }

    const inputs = document.querySelectorAll(`.try-${counterTry} input`);
    const emptyIndexes = Array.from(inputs)
        .map((input, i) => input.value === "" && !input.classList.contains("hint") ? i : null)
        .filter(i => i !== null);

    if (emptyIndexes.length === 0) return;

    const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    inputs[randomIndex].value = gussWord[randomIndex];
    inputs[randomIndex].disabled = true;
    inputs[randomIndex].classList.add("hint");

    numberOfHint--;
    hintSpan.innerHTML = `(${numberOfHint})`;

    if (numberOfHint === 0) {
        hintBtn.disabled = true;
    }

    const nextInput = Array.from(inputs).find(input => !input.disabled && input.value === "");
    nextInput?.focus();
});

window.onload = () => {
    generateInputs();
};
