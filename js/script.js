
let containerDiv = document.createElement("div");
let flexDiv = document.createElement("div");
let rightDiv = document.createElement("div");
let leftDiv = document.createElement("div");
let imgOfLeft = document.createElement("img");
let imgUnderTitle = document.createElement("h1");
let inputAnswer = document.createElement("div");
let questionDiv = document.createElement("div");
let incorectField = document.createElement("div");
let keyBoardArea = document.createElement("div");
let modalTabCon = document.createElement("div");
let playAgainBtn = document.createElement("button");
let incorectCount = 0;
let winSound = new Audio("audio/3.mp3");
winSound.volume = 0.3;
let userLose = new Audio("audio/4.mp3")

// Add class
modalTabCon.classList = "madal_con";
playAgainBtn.classList = "loose_btn"
containerDiv.classList = "container";
flexDiv.classList = "flex_con";
rightDiv.classList = "right";
leftDiv.classList = "left";
imgUnderTitle.classList = "left_title";
questionDiv.classList = "question";
questionDiv.id = "question_field";
keyBoardArea.classList = "keyboard_con";
incorectField.classList = "icorect_field";
imgOfLeft.classList = "left_img";
inputAnswer.classList = "answer_field";

// append
document.body.append(containerDiv);
document.body.append(modalTabCon);
containerDiv.append(flexDiv);
flexDiv.append(leftDiv);
flexDiv.append(rightDiv);
leftDiv.append(imgOfLeft);
leftDiv.append(imgUnderTitle);
rightDiv.append(inputAnswer);
rightDiv.append(questionDiv);
rightDiv.append(incorectField);
incorectField.innerHTML = `Incorect guesses: <span id="incorect_count"> ${incorectCount}/6 </span>`;
rightDiv.append(keyBoardArea);
imgOfLeft.alt = "hangImg";
imgOfLeft.src = "img/1.jpg";
imgUnderTitle.innerText = "HANGMAN GAME";

// add keyboard buttons
for (let index = 1; index < 27; index++) {
  keyBoardArea.append(document.createElement("div"));
}

// get all keys
let arr = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
let keys = document.querySelectorAll(".keyboard_con div");
function addClickForKeys() {
keys.forEach((el, i) => {
  el.innerText = `${arr[i]}`;
  el.classList = "key_btn";
  el.addEventListener("click", () => {
    if (el.style.opacity !== "0.5") {
      searchLetter(arr[i]);
      console.log(el.style);
    }
    if (incorectCount <= 6) el.style.opacity = "0.5";
  });
});
}
addClickForKeys();
// Game process

let questions = [
  { question: "What is the apple company logo?", answer: "APPLE" },
  {
    question: "What operating system was developed by Microsoft?",
    answer: "WINDOWS",
  },
  {
    question: "The most popular operating systems are Windows, MacOS and ...?",
    answer: "LINUX",
  },
  { question: "What is the name of Apple smartphones?", answer: "IPHONE" },
  {
    question: "What is the name of the program for editing the software code?",
    answer: "VSCODE",
  },
  { question: "The name of the most popular preprocessor?", answer: "SCSS" },
  {
    question:
      "The name of the school where you will be taught to programing for free?",
    answer: "RSSCHOOL",
  },
  { question: "The most famous place on earth?", answer: "EVERYWHERE" },
  {
    question: "This is a well-known brand of American electric cars?",
    answer: "TESLA",
  },
  { question: "Who invented the light bulb?", answer: "EDISON" },
  { question: "Which country has the largest population?", answer: "CHINA" },
  { question: "Where is the Eiffel Tower located?", answer: "PARIS" },
];
let randomArr = [];
function generateNonRepeat(num) {
  let random = (Math.random() * num).toFixed();
    random = Number(random);
    if(!randomArr.includes(random)) {
        randomArr.push(random);
        return random;
    } else {
        if(randomArr.length < num) {
         return  generateNonRepeat(num);
        } else {
          return false;
        }
    }
}

// Add random question when page reload
let i;
let answerArr;
function pastPhrase() {
  i = generateNonRepeat(questions.length -2);
  if( i.toString() === localStorage.getItem("randomIn")) i++;
  localStorage.setItem("randomIn", i);
  questionDiv.innerText = `${questions[i].question}`;
  // add world for input field
  for (let index = 0; index < questions[i].answer.length; index++) {
    inputAnswer.append(document.createElement("div"));
  }
  answerArr = questions[i].answer.split("");
}
pastPhrase();
let checkIsExist = false;
let checkArrForSearch = [1];
let winnerCounter = 0;
let answerLetter = document.querySelectorAll(".answer_field div");
let memoryArr = [1];
let checkIfUserWin = false;
function searchLetter (letterName) {
  checkArrForSearch.forEach((el) => {
    if(el === letterName) {
      checkIsExist = true;
    }
  });
  if(checkIsExist) {
    checkIsExist = false;
    return;
  }
  checkArrForSearch.push(letterName);
  answerLetter = document.querySelectorAll(".answer_field div");
  let currentPosition;
  answerArr.forEach((a,b) => {
    if(a === letterName) {
      currentPosition = b;
      answerLetter[b].style.color = "green";
      answerLetter[b].innerText = letterName;
      answerLetter[b].style.border = "none";
      winnerCounter ++;
    }
  });
  // USER WINS
  if(winnerCounter  === answerArr.length) {
    console.log("User wins !!");
    checkIfUserWin = true;
    winSound.play();
    winnerCounter = 0;
    modalTabCon.style.display = "flex";
    modalTabCon.innerHTML = `<h2 class="loose_title">You win :) </h2> 
      <span class="secretWord">Secret word is: ${answerArr.join("")}</span>`;
      playAgainBtn.innerText = "Play again";
      modalTabCon.append(playAgainBtn);
  }
  if (answerArr[currentPosition] === letterName && memoryArr[memoryArr.length-1] !== letterName) {
    let whileI = 0;
    while (whileI < memoryArr.length) {
      if (memoryArr[whileI] === letterName) return;
      whileI ++;
    }
    let doneSound = new Audio("audio/2.mp3");
    if (incorectCount <= 6) {
      doneSound.play();
    }
    memoryArr.push(letterName);
  }
  if (answerArr[currentPosition] !== letterName &&  memoryArr[memoryArr.length-1] !== letterName) {
    let whileIndex = 0;
    while (whileIndex < memoryArr.length) {
      if (memoryArr[whileIndex] === letterName) return;
      whileIndex ++;
    }
    incorectCount++;
    incorectField.innerHTML = `Incorect guesses: <span id="incorect_count"> ${incorectCount}/6 </span>`;
    if (incorectCount <= 6) {
      imgOfLeft.src = `icons/${incorectCount}.svg`;
    } 
    memoryArr.push(letterName);

    // sound effect
    let errorSound = new Audio("audio/1.mp3");
    errorSound.volume = 0.3;
    if (incorectCount <= 6 ) {
      errorSound.play();
    }

    // when user loose all your attempts
    if(incorectCount === 6) {
      winnerCounter = 0;
      answerLetter.forEach((el, index) => {
        if (el.innerText) {
          el.style.color = "green";
        }
        if (!el.innerText) {
          el.innerText = answerArr[index];
          el.style.color = "red";
          el.style.border = "none";
        }
      });
      userLose.play();
      console.log("User loose");
      modalTabCon.style.display = "flex";
      modalTabCon.innerHTML = `<h2 class="loose_title">You loose :(</h2>
      <span class="secretWord">Secret word is: ${answerArr.join("")}</span>`;
      playAgainBtn.innerText = "Play again";
      modalTabCon.append(playAgainBtn);
    }
  }
}

// Physical Keyboard Event
document.addEventListener("keydown", (e) => {
  // remove some keyboard keys
  if(checkIfUserWin) {
    return;
  }
  if(incorectCount === 6) return;
  if(e.key === "CapsLock") return;
  if(e.key === "Shift") return;
  if(e.key === "Control") return;

  searchLetter(e.key.toUpperCase());
  keys.forEach((el) => {
    if(el.innerText === e.key.toUpperCase()) {
      if (incorectCount <= 6) el.style.opacity = "0.5";
    }
  });
});


// game again
function showModal() {
  checkArrForSearch = [1];
  modalTabCon.style.display = "none";
  incorectCount = 0;
  imgOfLeft.src = "img/1.jpg";
  incorectField.innerHTML = `Incorect guesses: <span id="incorect_count"> ${incorectCount}/6 </span>`;
  answerLetter.forEach((el) => {
    el.innerHTML = "";
  });
  memoryArr = [1];
  keys.forEach((el) => {
    el.style.opacity = "1";
  });
  inputAnswer.innerText = "";
  checkIfUserWin = false;
  pastPhrase();
}
playAgainBtn.addEventListener("click", showModal);