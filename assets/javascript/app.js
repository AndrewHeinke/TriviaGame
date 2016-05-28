//Define my global variables for the Trivia Game
var numCorrect = 0;
var numIncorrect = 0;
var notAnswered = 0;
var qCount = 0;
var clockInterval;
var gameTime = 30;
var gameStart;
var clickSelect;

//Array of Questions
var triviaQuestions = ["What year was the National Basketball Association first established?", "What team has won the most NBA titles?", "How did Los Angeles Lakers' superstar Kobe Bryant get his name?", "Michael Jordan was drafted third overall in 1984. Which two players were selected ahead of him?", "Which team lost the most games during the 2003-2004 season?", "How many games are in an NBA season?", "How many teams are in the NBA?", "Whose silhouette serves as the modern day logo of the NBA?", "Who holds the Spurs record for most points in a game?", "Who is the Spurs' all-time leader in assists?"];

//Array of Possible Answer Choices
var answerChoices = [
  ["1935", "1945", "1946", "1958"],
  ["The Chicago Bulls", "The Los Angeles Lakers", "The Boston Celtics", "The Philadelphia 76ers"],
  ["He's named after his Uncle Kobe", "He's named after a type of steak", "He's named after the doctor who delivered him.", "He's named after a city in Southern California where his parents met"],
  ["Hakeem Olajuwon & Sam Bowie", "Patrick Ewing & Hakeem Olajuwon", "Charles Barkley & Hakeem Olajuwon", "Karl Malone & Sam Bowie"],
  ["The Orlando Magic", "The LA Clippers", "The Chicago Bulls", "The Golden State Warriors"],
  ["82", "84", "86", "88"],
  ["30", "40", "25", "35"],
  ["Michael Jordan", "Bill Cousy", "Jerry West", "Pat Riley"],
  ["George Gervin", "David Robinson", "Tim Duncan", "Terry Cummings"],
  ["Tony Parker", "Johnny Moore", "Alvin Robertson","Avery Johnson"]
];

//Array of the correct answers
var correctAnswer = [
  "1946",
  "The Boston Celtics",
  "He's named after a type of steak",
  "Hakeem Olajuwon & Sam Bowie",
  "The Orlando Magic",
  "82",
  "30",
  "Bill Cousy",
  "David Robinson",
  "Tony Parker"
];

function displayGame() {
  $("#question").html("<h2>" + triviaQuestions[qCount] + "</h2>");
  $("#choices").html("<p class='choice'>" + answerChoices[qCount][0] + "</p><p class='choice'>" + answerChoices[qCount][1] + "</p><p class='choice'>" + answerChoices[qCount][2] + "</p><p class='choice'>" + answerChoices[qCount][3] + "</p>");
}

function timer() {
	var i = 30;
  clockInterval = setInterval(function() {
    $("#countDown-timer").html("<h3>Seconds left: " + i + "</h3>");
    if (i === 0) {
      clearInterval();
      timeoutLoss();
      $("#countDown-timer").empty();
      //qCount++;
    }
    if (i > 0) {
      i--;
    }
  }, 1000);
}

//If player runs out of time, increment not answered count and display correct answer
function timeoutLoss() {
	notAnswered++;
	$("#question").html("<h2>Time's Up! Correct Answer: " + correctAnswer[qCount] + "</h2>");
	setTimeout(advance, 2500);
}

//Function will either advance to the next question or display the trivia game results
function advance() {
	if (qCount < 9) {
	qCount++;
	gameTime = 30;
  displayGame();
  timer();
	}
	else {
		results();
	}
}

function results() {
  $(".game-area").html("<h2 class='results'>Quiz Completed!" + "</h2>" + "<p>Correct Answers: " + numCorrect + "</p>" + "<p>Wrong Answers: " + numIncorrect + "</p>" + "<p>Not Answered: " + notAnswered + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>");
}

function reset() {
	qCount = 0;
	numCorrect = 0;
	numIncorrect = 0;
	notAnswered = 0;
	gameTime = 30;
	displayGame();
  timer();
}

$(document).ready(function() {
  function startButton() {
    $("#start").html("<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>");
  }
  startButton();

  //Once button is clicked game begins and creates html content
  $("body").on("click", ".start-button", function(event){
	   displayGame();
     timer();
     $("#start").empty();
  });

  //Resets the game
  $("body").on("click", ".reset-button", function(event){
  	resetGame();
  });

  //Compares the string of the selected Answer with the string of the correct answer to determine whether correct or incorrect
  $("body").on("click", ".choice", function(event){
  	clickSelect = $(this).text();
  	if(clickSelect === correctAnswer[qCount]) {
  		clearInterval(clockInterval);
      numCorrect++;
      $("#question").html("<h2>Correct! The answer is: " + correctAnswer[qCount] + "</h2>");
    	setTimeout(advance, 2500);
  	}
  	else {
  		clearInterval(clockInterval);
      numIncorrect++;
      $("#question").html("<h2>Wrong! The answer is: " + correctAnswer[qCount] + "</h2>");
    	setTimeout(advance, 2500);
  	}
  });
});
