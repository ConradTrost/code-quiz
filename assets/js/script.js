var timerEL = document.getElementById("timer-count-id");
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var startButton = document.getElementById('start');
var timeLeft = 59;
let buttonPressed = true;
var index = 0;
var score = 0;

var questionArr = [
    {q: "What is the capital of California?", 
    ans: {
        1: "Sacramento",
        2: "Los Angeles",
        3: "Denver"
    },
    correctAns: 1
}, 
    {q: "This is false", 
    ans: {
        1: "true",
        2: "false",
        3: "true"
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
                console.log("wrong");
            }
                index++;
                showQuestion(index);
            });
        }; return score;
    }
}


function startQuiz() {
    startButton.onclick = function() {
        startButton.remove(startButton);
        timerFun();
    }
}


function showsOver(score) {
    quizContainer.style.display = 'none';
    resultsContainer.innerHTML = '<p id="endgame">Your score is '+score+'!</p>'
}

startQuiz();
