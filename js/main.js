let numberTry = 6
let numberLetters = 6
let counterTry = 1
//Words list
let gussWord = "";
let words = ["hassan","Delete","shcool","create","Driver","Domain","Couple"]
gussWord = words[Math.floor(Math.random() * words.length)].toUpperCase()
console.log(gussWord);
console.log(counterTry);


//display word
const displayWord = document.getElementById("display")

function generateInputs() {
    const inputContainer = document.querySelector(".inputs")

    //create div
    for (let i = 1; i <= numberTry ; i++) {
        const tryDiv=document.createElement("div")
        tryDiv.classList.add(`try-${i}`)
        tryDiv.classList.add(`d-flex`,`gap-2`,`align-items-center`)
        tryDiv.innerHTML +=`<span class="me-2" >Try ${i}</span>`
        if( i !== counterTry) tryDiv.classList.add("disabled")

        // create input
        for (let j = 1; j <= numberLetters ; j++) {
            const inputLetter = document.createElement(`input`)
            inputLetter.type="text";
            inputLetter.setAttribute("maxlength","1")
            
            inputLetter.style.width="40px"
            tryDiv.appendChild(inputLetter)
        }
        inputContainer.appendChild(tryDiv)
        inputContainer.children[0].children[1].focus()    
    }
    const inputsDisabled=document.querySelectorAll(".disabled input")
    inputsDisabled.forEach((input)  => (input.disabled = true))
    const inputs = document.querySelectorAll("input")
    inputs.forEach((input , index)=>{
        
        input.addEventListener("input",(e)=>{
            //index of letter
            
            const currentIndex = Array.from(inputs).indexOf(e.target)
            
            input.value= input.value.toUpperCase()
            console.log(index);
            const nextInput = inputs[index+1]
            if (nextInput) nextInput.focus()

        })
        input.addEventListener("keydown",(e)=>{
            const currentIndex = Array.from(inputs).indexOf(e.target)
                if(e.key=="ArrowRight"){
                    const nextInput = currentIndex + 1
                    if(nextInput < inputs.length) inputs[nextInput].focus()
                };
                if(e.key=="ArrowLeft"){
                    const backInput = currentIndex - 1
                    if(backInput <= inputs.length && backInput >= 0) inputs[backInput].focus()
                };
                if (e.key=="Backspace") {
                    inputs[currentIndex].value=""
                    
                }
                
        })
        
    })
}
const check =document.getElementById("check-btn")
check.addEventListener("click" , (checkWord) =>{
    let flag = true
    for (let i = 0; i < numberLetters; i++) {
            const inputs = document.querySelectorAll(`.try-${counterTry} input`)
            const letters =   inputs[i].value
            lettersTrue = gussWord[i]
            if (letters=="") {
                displayWord.innerHTML = ` <p class="text-center fw-bold h4 text-danger"> Please Enter Letters</p>`
                inputs[i].classList.add("false")
                console.log("false");
                flag = false;
            }
            else if (lettersTrue == letters && inputs[i].valuey !== "") {
                displayWord.innerHTML = ` <p class="text-center fw-bold h4 text-danger"> Word Is Correct You WIN</p>`
                inputs[i].classList.remove("false")
                inputs[i].classList.remove("true-false")
                inputs[i].classList.add("true-true")
                console.log("true-true");
                // check.disabled = true
                flag = true;

            }else if (gussWord.includes(letters)) {
                displayWord.innerHTML = ` <p class="text-center fw-bold h3 text-danger"> Game Over</p>`
                inputs[i].classList.remove("false")
                inputs[i].classList.remove("true-true")
                inputs[i].classList.add("true-false")
                console.log("true-false");
                flag = false;
            }
            else{
                inputs[i].classList.add("false")
                console.log("false");
        }
    }
    if (flag == false) {

        //disable inputs
        const inputs = document.querySelectorAll(`.try-${counterTry} input`)
        inputs.forEach((input) => {
            input.classList.add("disabled")
            input.disabled = true
        });

        counterTry++ ;

        //enable next try
        const nextTry = document.querySelector(`.try-${counterTry}`)
        const nextInputs = document.querySelectorAll(`.try-${counterTry} input`)
        nextInputs.forEach((input)=> {
            input.disabled = false
        })
        const el = document.querySelector(`.try-${counterTry}`)
        if (el) {
            document.querySelector(`.try-${counterTry}`).classList.remove("disabled")
            el.children[1].focus()
        }else{
            displayWord.innerHTML = ` <p class="text-center fw-bold h3 text-danger"> Game Over</p>`
            check.disabled = true
        }

    }

})   

const hint = document.getElementById("hint")
let numberOfHint = 2 ;
const hintSpan = document.querySelector("#hint span")
hintSpan.innerHTML=`(${numberOfHint})`
const enableInput = document.querySelectorAll(`input:not([disabled])`)
hint.addEventListener("click",(addHint)=>{
    if(numberOfHint > 0){
        hintSpan.innerHTML=`(${--numberOfHint})`
        
        const inputs = document.querySelectorAll(`.try-${counterTry} input`)
        const randomIndex = Math.floor(Math.random() * numberLetters)
        const randomLetter = gussWord[randomIndex]
        inputs[randomIndex].value = randomLetter
        inputs[randomIndex].disabled = true
        inputs[randomIndex].classList.add("hint")
        if (inputs[randomIndex-1].value=="") {
            inputs[0].focus()
            
        }else{
            inputs[randomIndex-1].focus()
        }
    }else{
        hint.disabled = true
    }
    


})
window.onload = ()=>{
    
    generateInputs()
}