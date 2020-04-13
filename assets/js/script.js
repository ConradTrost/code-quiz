var timerEL = document.getElementById("timer-count-id");
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var startButton = document.getElementById('start');
var timeLeft = 60;
var btn = document.createElement("button");
let buttonPressed = true;
var index = 0;
var score = 0;

var questionArr = [
    {q: "Is this true?", 
    ans: {
        1: "True",
        2: "false",
        3: "false"
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
    showQuestion(0);
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
}

function showQuestion(index) {
    var output = [];
    var ans = [];
    buttonNumber = 0

    for (numbers in questionArr[index].ans) {
        var ButtonButtonEL = document.createElement("button");
        ButtonButtonEL.setAttribute("data-button-id", buttonNumber);

        ans.push(
            '<label>'
            + '<input type="button" class="btn theButtons" name="'+numbers+'" value="'+questionArr[index].ans[numbers]+'">'
            + '<label>');

        buttonNumber++;
    }
    output.push(
        '<div class="question">'+questionArr[index].q + '</div>'
        + '<div class="answers">' + ans.join(' ') + '</div>');

    
    quizContainer.innerHTML = output;
    var buttonEL = document.getElementsByClassName("theButtons");

    for (var i = 0; i< buttonEL.length; i++) {
        
            buttonEL[i].onclick = function() {
                console.log(i)
                var selectedButtonEL = ButtonButtonEL
                var selected = ButtonButtonEL.getAttribute("data-button-number");
               // var selected = document.getElementById(this.id);
            index++
            if (index >= buttonEL.length -1) {
                quizResults(selected, index-1);
                showsOver(score);
                return;
            } else {        
                quizResults(selected, index-1);
            showQuestion(index);
            }
        }
    }
}



function quizResults(selected, index) {
    if (selected === (questionArr[index].correctAns)) {
        score++;
        return score;
    }
}


function startQuiz() {
    startButton.onclick = function() {
        startButton.remove(startButton);
        timerFun();
    }
}


function showsOver() {
    quizContainer.style.display = 'none';
    resultsContainer.innerHTML = score;
    console.log(score);
}

startQuiz();
