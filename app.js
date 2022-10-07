// BUTTONS
const highScoresBtn = document.getElementById("highScoresBtn");
const saveScoreBtn = document.getElementById("saveScoreBtn");

//INPUT
const usernameInput = document.getElementById("username");

//PAGE
const pages = Array.from(document.getElementsByClassName("page"));

//GAME Elements
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice"));
const scoreText = document.getElementById("score");
const questionCounterText = document.getElementById("questionCounter");

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
//TODO: load form json file
let questions = [
  {
    question: "1. What is C++?",
    choice1: "C++ is an object oriented programming language",
    choice2: "C++ is a procedural programming language",
    choice3: "C++ supports both procedural and object oriented programming language",
    choice4: "C++ is a functional programming language",
    answer: 3
  },
  {
    question: "2. Which of the following is the correct syntax of including a user defined header files in C++?",
    choice1: "#include [userdefined]",
    choice2: "#include “userdefined''",
    choice3: "#include <userdefined.h>",
    choice4: "#include <userdefined>",
    answer: 2
  },
  {
    question: "3.Which of the following is used for comments in C++?",
    choice1: "/* comment */",
    choice2: " // comment */",
    choice3: "// comment",
    choice4: "both // comment or /* comment */",
    answer: 4
  },
  {
    question: "4. Who invented C++?",
    choice1: "Dennis Ritchie",
    choice2: "Ken Thompson",
    choice3: "Brian Kernighan",
    choice4: "Bjarne Stroustrup",
    answer: 4
  },
  {
    question: "5. Which of the following user-defined header file extension used in c++?",
    choice1: "hg",
    choice2: "cpp",
    choice3: "h",
    choice4: "hf",
    answer: 3
  }
];

//End Screen Elements
const finalScore = document.getElementById("finalScore");

//High Score Elements
const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Simulated Navigation
navigateTo = pageName => {
  pages.forEach(page => {
    if (page.id === pageName) {
      page.classList.remove("hidden");
    } else {
      page.classList.add("hidden");
    }
  });
};

//GAME Functions

playGame = () => {
  startGame();
  navigateTo("game");
};

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0) {
    //set final score text
    finalScore.innerHTML = score;
    //Go to the end page
    return navigateTo("end");
  }
  questionCounter++;
  questionCounterText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  //Remove question from available questions
  availableQuestions.splice(questionIndex, 1);

  //let users answer now that question is ready
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    //dont let the user attempt to answer until the new question is ready
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    //Add the correct/incorrect animation

    selectedChoice.parentElement.classList.add(classToApply);

    //Increase the score
    incrementScore(classToApply === "correct" ? CORRECT_BONUS : 0);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      //Load New Question
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerHTML = "Score: " + score;
};

//HIGH SCORES

showHighScores = () => {
  highScoresList.innerHTML = highScores
    .map(
      highScore =>
        `<li class="high-score">${highScore.username} - ${highScore.score}</li>`
    )
    .join("");
  navigateTo("highScores");
};

saveHighScore = () => {
  //add the score, sort the array, and splice off starting at position 5
  highScores.push({ score, username: usernameInput.value });
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);
  //Save to local storage for next time
  localStorage.setItem("highScores", JSON.stringify(highScores));
};

usernameInput.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !usernameInput.value;
});

//saves score if appropriate in array of top 5 scores
// saveHighScore = () => {
//make a copy of existing scores
// const scoresCopy = [...highScores];

// //if there is not score yet, then just add the new one and move on
// if (highScores.length < 1) {
//   highScores.push(score);
// } else {
//   //iterate through existing scores and insert score where appropriate
//   for (let i = 0; i < scoresCopy.length; i++) {
//     const savedScore = scoresCopy[i];

//     if (score > savedScore) {
//       highScores.splice(i, 0, score);
//       //if we moved beyond the max number of scores, then remove the last one
//       if (highScores.length > 5) {
//         highScores.splice(highScores.length - 1, 1);
//       }
//       //we are done
//       break;
//     }
//     //if the score was not greater than any saved score but we hve an open slot, add it
//     else if (i === scoresCopy.length - 1 && highScores.length < 5) {
//       highScores.push(score);
//     }
//   }
// }

//Save to local storage for next time
// localStorage.setItem("highScores", JSON.stringify(highScores));
// };