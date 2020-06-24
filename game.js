// import {getClue as getClueFromCallback} from "./callback-version.js";
import getClueFromCallback from "./callback-version.js";
import getClueFromPromise from "./promise-version.js";
import getClueFromAsyncFunction from "./async-await-version.js"


const cbButton = document.getElementById("use-callback");
const questionDiv = document.getElementById("question");
const answerDiv = document.getElementById("answer");
const valueDiv = document.getElementById("value");
const categoryTitleDiv = document.getElementById("category-title");
const invalidCountDiv = document.getElementById("invalid-count");
const scoreDiv = document.getElementById("score");
scoreDiv.innerHTML = Number(0);

const promiseButton = document.getElementById("use-promise");

const asyncButton = document.getElementById("use-async-await");
const checkResponseButton = document.getElementById("check-response");
const response = document.getElementById("player-response");


cbButton.addEventListener("click", e => {
    getClueFromCallback((errStatus, clue) => {
        if(errStatus !== null) {
            console.error(errStatus);
        } else {
            clueHelper(clue);
        }
    })
})

promiseButton.addEventListener("click", e => {
    getClueFromPromise()
        .then(clue => clueHelper(clue))
        .catch(err => console.error(err));
})

function clueHelper(clue) {
    questionDiv.innerHTML = clue.question;
    answerDiv.innerHTML = clue.answer;
    valueDiv.innerHTML = clue.value;
    categoryTitleDiv.innerHTML = clue.category.title;
    console.log(clue);
        if(clue.invalidCount > 0){
            invalidCountDiv.innerHTML = "invalid"
        } else{
            invalidCountDiv.innerHTML = "valid"
        }
    checkResponseButton.classList.remove("is-hidden");
    answerDiv.classList.add("is-hidden");
    response.value = "";
}

asyncButton.addEventListener("click", async e =>{
    try{
        const clue = await getClueFromAsyncFunction()
        clueHelper(clue)
    } catch(e){
        console.error(e)
    }
})
//Need to fix this for the score to update//
checkResponseButton.addEventListener("click", e => {
    const ans = response.value.trim();
    const answer = answerDiv.innerHTML.trim();
    console.log(ans, answer)
    const value = valueDiv.innerHTML;
    if(ans === answer) {
        let current = Number(scoreDiv.innerHTML);
        scoreDiv.innerHTML = Number(value) + current;
    } else {
        scoreDiv.innerHTML -= Number(value);
    }
    answerDiv.classList.remove("is-hidden");
    checkResponseButton.classList.add("is-hidden");

})
