//"use strict";

let turnedServer;
let connection = new XMLHttpRequest();
connection.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    turnedServer = JSON.parse(connection.responseText);
    displayQuestions();
  }
  return turnedServer;
};
connection.open("GET", "data.json", true);
connection.send();

const questionPlace = document.getElementsByClassName("question__place")[0];
const question = document.getElementById("question");
//inputs got with name
const choices = document.getElementsByName("choice");

//label so answers
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const optionC = document.getElementById("optionC");
const optionD = document.getElementById("optionD");

const send = document.getElementById("send");

let score = 0;
let order = 0;

//sorulari goster
function displayQuestions() {
  cleanInherit();
  console.log(turnedServer);
  let nextQuestion = turnedServer.questions[order];
  question.innerHTML = nextQuestion.question;
  optionA.innerText = nextQuestion.choiceA;
  optionB.innerText = nextQuestion.choiceB;
  optionC.innerText = nextQuestion.choiceC;
  optionD.innerText = nextQuestion.choiceD;
}

function cleanInherit() {
  choices.forEach((option) => (option.checked = false));
}

function takeAnswer() {
  let answer;

  choices.forEach((choice) => {
    if (choice.checked) {
      answer = choice.id;
    }
  });
  return answer;
}
send.addEventListener("click", function () {
  const answer = takeAnswer();
  console.log(answer);
  if (answer) {
    if (answer === turnedServer.questions[order].answer) {
      score++;
    }
  }
  order++;
  if (order < turnedServer.questions.length) {
    displayQuestions();
  } else {
    questionPlace.innerHTML = `<h2>In ${turnedServer.questions.length} questions, you could ${score} correctly answered</h2>`;

    send.setAttribute("onClick", "location.reload()");
    send.innerHTML = "Try Again";
  }
});
