var timerEL = document.getElementById("timer-count-id");
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var startButton = document.getElementById('start');
var timeLeft = 59;
var index = 0;
var score = 0;

// For local Storage
var formContainer = document.querySelector("#input-group");


var questionArr = [
    {q: "Which of these is not an HTML element?", 
    ans: {
        1: "Javascript",
        2: "<h1>",
        3: "<p>",
        4: "<title>"
    },
    correctAns: 1
}, 
    {q: "What does CSS stand for?", 
    ans: {
        1: "Central System Software",
        2: "Cascading Style Sheets",
        3: "Control Styling Software"
    },
    correctAns: 2
    }];


function timerFun() {
    var timerHolderEL = document.createElement("h2");
    timerHolderEL.className = "timer-item";
    countFromSixty = setInterval(function() {
        if (timeLeft === 0) {
            clearInterval(countFromSixty);
            timerEL.textContent = "GAME OVER!";
            return;
        } else {        
            timerEL.textContent = timeLeft + " seconds remaining";
            timeLeft--;
        }
    }, 1000) 
    showQuestion(0);
}

function showQuestion(index) {
    var bigBoyContainer = document.createElement("ul");
    quizContainer.innerHTML = ""

    buttonNumber = 0

    // creates and places question in quiz container
    if (index >= questionArr.length) {
        showsOver(score);
    } else {
    var questionEL = document.createElement("div");
    var currentQuestion = questionArr[index]
    questionEL.innerHTML = '<div class="question">'+currentQuestion.q + '</div>'
    bigBoyContainer.appendChild(questionEL)

    for (numbers in questionArr[index].ans) {
        var ButtonButtonEL = document.createElement("li");
        // ButtonButtonEL.setAttribute("data-button-id", buttonNumber);

        
        ButtonButtonEL.innerHTML = (
            '<input type="button" class="btn bigButtons" name="'+numbers+'" value="'+questionArr[index].ans[numbers]+'">'
            );

        bigBoyContainer.appendChild(ButtonButtonEL);
        quizContainer.appendChild(bigBoyContainer);
        buttonNumber++;
    }

    var buttons = document.getElementsByClassName('bigButtons');

    for (var i = 0; i< buttons.length; i++) {
        buttons[i].id = i;
        buttons[i].addEventListener("click", function() {
            console.log(this);
            var selected = parseInt(this.id);
            if ((selected + 1) === questionArr[index].correctAns) {
                console.log("correct")
                score++;
                timeLeft += 10;
            } else {
                timeLeft -= 20;
            }
                index++;
                showQuestion(index);
            });
        }; return score;
    }
}


function startQuiz() {
    // hides input form

    startButton.onclick = function() {
        startButton.remove(startButton);
        timerFun();
    }
}


function showsOver(score) {
    quizContainer.style.display = 'none';
    resultsContainer.innerHTML = '<p id="endgame">Your score is '+score+'!</p>'
    initialForm();

}

startQuiz();

// Stuff for the local storage / save user initials and score

function initialForm() {
    formContainer.innerHTML = (
    '<label for="initials">Enter Your Initials</label>'
    + '<input type="text" name="initials" id="initials" placeholder="CT"/>'
    + '<button class="btn" id="submit">Submit to Scoreboard!</button>');

    // Sets the DOM elements to save score and name

    var submitButton = document.querySelector("#submit");
    var userInput = document.querySelector("#initials");


    submitButton.addEventListener("click", function(event) {
        event.preventDefault();

        if (userInput === "") {
            initialForm();
    //    } else if (userInput.length >= 2) {
      //      displayMessage("error", "Must be up to 2 characters");
        } else {
        localStorage.setItem("input", userInput);
        localStorage.setItem("score", score);
        console.log(localStorage.getItem("input"));
        console.log(localStorage.getItem("score"));
        }
    })
}


