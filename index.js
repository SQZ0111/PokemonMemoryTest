
let chosenCardsType = [];
let score = 0;
const header = document.querySelector("h1");
const doc = document.querySelector("body");

// let date = new Date();
// setInterval(()=> {
//     `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
//     },1000);


function handleInput(form) {
    const typedVal = form.inputTyp.value.toLowerCase();
    if (!(["feuer","stahl","wasser","elektro"].includes(typedVal))){
        throw new Error("Nicht richtiger Typ eingegeben!");
    }
    return form.inputTyp.value;
}

function handleForm(form) {
    try {
        handleInput(form);
    }
    catch(e) {
        alert(`Folgender Fehler ${e}`)
    }
}


//card muss erst drehen
function clickAndGetType(cards) {
    for(const card of cards) {
        card.addEventListener("click",(e) => {
            try {
                const target = e.target;
                const targetText = target.querySelector("h4").textContent;
                chosenCardsType.push(targetText);
                console.log(chosenCardsType);
                if(chosenCardsType.length == 2) {
                    console.log("Running");
                    evaluateCardsClicked()
                }

            }
            catch(e) {
                alert("Please click not on the image of the fully turned card!");
            }
            
        })
    }
}

function evaluateCardsClicked() {
    if(chosenCardsType[0] ===  chosenCardsType[1]) {
        score += 1;
        header.innerText = `POKEMON MEMORY\nScore: ${score}`
        const audio = new Audio(`audio/positiv-${Math.floor(Math.random() * 7)}.wav`)
        doc.classList.add("right");
        audio.play(audio);
        setTimeout(()=> {
            doc.classList.remove("right");
        },1000)
        chosenCardsType = [];
    } else {
        
        const audio = new Audio(`audio/negativ-${Math.floor(Math.random() * 7)}.wav`)
        doc.classList.add("error");
        audio.play(audio);
        setTimeout(()=> {
            doc.classList.remove("error");
        },1000)
        score > 0 ? score -= 1 : null;
        header.innerText = `POKEMON MEMORY \nScore: ${score}`
        chosenCardsType = [];
    }
   
}


const cards = document.querySelectorAll(".card");
clickAndGetType(cards);






