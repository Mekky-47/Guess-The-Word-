let numberTry = 6;
let numberLetters = 6;
let counterTry = 1;

// Word list
let gussWord = "";
let words = ["hassan", "delete", "shcool", "create", "driver", "domain", "couple"];
gussWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
console.log(gussWord);
console.log(counterTry);

// Display message
const displayWord = document.getElementById("display");

// Generate input fields
function generateInputs() {
    const inputContainer = document.querySelector(".inputs");

    for (let i = 1; i <= numberTry; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`, "d-flex", "gap-2", "align-items-center");
        tryDiv.innerHTML += `<span class="me-2">Try ${i}</span>`;
        if (i !== counterTry) tryDiv.classList.add("disabled");

        for (let j = 1; j <= numberLetters; j++) {
            const inputLetter = document.createElement("input");
            inputLetter.type = "text";
            inputLetter.setAttribute("maxlength", "1");
            inputLetter.style.width = "40px";
            tryDiv.appendChild(inputLetter);
        }

        inputContainer.appendChild(tryDiv);
    }

    document.querySelectorAll(".disabled input").forEach(input => input.disabled = true);
    document.querySelector(`.try-${counterTry} input`)?.focus();

    const inputs = document.querySelectorAll("input");

    inputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {
            input.value = input.value.toUpperCase();
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
        });

        input.addEventListener("keydown", (e) => {
            const currentIndex = Array.from(inputs).indexOf(e.target);
            if (e.key === "ArrowRight") {
                const nextInput = inputs[currentIndex + 1];
                if (nextInput) nextInput.focus();
            } else if (e.key === "ArrowLeft") {
                const backInput = inputs[currentIndex - 1];
                if (backInput) backInput.focus();
            } else if (e.key === "Backspace") {
                inputs[currentIndex].value = "";
            }
        });
    });
}

// Check button logic
const check = document.getElementById("check-btn");
check.addEventListener("click", () => {
    const inputs = document.querySelectorAll(`.try-${counterTry} input`);
    let flag = true;
    let correctLetters = 0;

    for (let i = 0; i < numberLetters; i++) {
        const letter = inputs[i].value.toUpperCase();
        const correctLetter = gussWord[i];

        if (letter === "") {
            inputs[i].classList.add("false");
            displayWord.innerHTML = `<p class="text-center fw-bold h4 text-danger">Please enter all letters</p>`;
            flag = false;
        } else if (letter === correctLetter) {
            inputs[i].classList.remove("false", "true-false");
            inputs[i].classList.add("true-true");
            correctLetters++;
        } else if (gussWord.includes(letter)) {
            inputs[i].classList.remove("false", "true-true");
            inputs[i].classList.add("true-false");
            flag = false;
        } else {
            inputs[i].classList.add("false");
            flag = false;
        }
    }

    if (correctLetters === numberLetters) {
        displayWord.innerHTML = `<p class="text-center fw-bold h4 text-success">Word is correct! You WIN!</p>`;
        check.disabled = true;
        return;
    }

    if (!flag) {
        // Disable current inputs
        inputs.forEach((input) => {
            input.classList.add("disabled");
            input.disabled = true;
        });

        counterTry++;

        // Check if more tries are available
        const nextTry = document.querySelector(`.try-${counterTry}`);
        if (nextTry) {
            nextTry.classList.remove("disabled");
            const nextInputs = document.querySelectorAll(`.try-${counterTry} input`);
            nextInputs.forEach((input) => input.disabled = false);
            nextInputs[0]?.focus();
        } else {
            displayWord.innerHTML = `<p class="text-center fw-bold h3 text-danger">Game Over</p>`;
            check.disabled = true;
        }
    }
});

// Hint logic
const hint = document.getElementById("hint");
let numberOfHint = 2;
const hintSpan = document.querySelector("#hint span");
hintSpan.innerHTML = `(${numberOfHint})`;

hint.addEventListener("click", () => {
    if (numberOfHint <= 0) {
        hint.disabled = true;
        return;
    }

    const inputs = document.querySelectorAll(`.try-${counterTry} input`);
    const emptyIndexes = Array.from(inputs)
        .map((input, idx) => input.value === "" ? idx : null)
        .filter(index => index !== null);

    if (emptyIndexes.length > 0) {
        const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
        inputs[randomIndex].value = gussWord[randomIndex];
        inputs[randomIndex].disabled = true;
        inputs[randomIndex].classList.add("hint");

        // Focus next empty input
        const nextEmpty = Array.from(inputs).find(input => !input.disabled && input.value === "");
        nextEmpty?.focus();

        numberOfHint--;
        hintSpan.innerHTML = `(${numberOfHint})`;
    }

    if (numberOfHint <= 0) {
        hint.disabled = true;
    }
});

// Run game on load
window.onload = () => {
    generateInputs();
};
