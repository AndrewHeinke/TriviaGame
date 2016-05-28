//Define my global variables for the Trivia Game
var numCorrect = 0;
var numIncorrect = 0;
var notAnswered = 0;
var qstnCount = 0;
var clockInterval;
var gameTime = 20;
var gameStart;
var clickSelect;

//Array of Questions
var triviaQuestions = ["What year was the National Basketball Association first established?", "What team has won the most NBA titles?", "How did Los Angeles Lakers' superstar Kobe Bryant get his name?", "Michael Jordan was drafted third overall in 1984. Which two players were selected ahead of him?", "Which team lost the most games during the 2003-2004 season?", "How many games are in an NBA season?", "How many teams are in the NBA?", "Whose silhouette serves as the modern day logo of the NBA?", "Who holds the Spurs record for most points in a game?", "Who is the Spurs' all-time leader in assists?"];

//Array of Possible Answer Choices
var answerChoices = [
  ["1935", "1945", "1946", "1958"],
  ["The Chicago Bulls", "The Los Angeles Lakers", "The Boston Celtics", "The Philadelphia 76ers"],
  ["He's named after his Uncle Kobe", "He's named after a type of steak", "He's named after a doctor", "He's named after a city in California"],
  ["Hakeem Olajuwon & Sam Bowie", "Patrick Ewing & Hakeem Olajuwon", "Charles Barkley & Hakeem Olajuwon", "Karl Malone & Sam Bowie"],
  ["The Orlando Magic", "The LA Clippers", "The Chicago Bulls", "The Golden State Warriors"],
  ["82", "84", "86", "88"],
  ["30", "32", "25", "35"],
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

$(document).ready(function() {

function displayGame() {
  $("#countDown-timer").html("<h3>Seconds left: " + gameTime + "</h3>");
  $("#question").html("<h2>" + triviaQuestions[qstnCount] + "</h2>");
  $("#choices").html("<div class='choice'>" + answerChoices[qstnCount][0] + "</div><div class='choice'>" + answerChoices[qstnCount][1] + "</div><div class='choice'>" + answerChoices[qstnCount][2] + "</div><div class='choice'>" + answerChoices[qstnCount][3] + "</div>");
  $("#question-number").html("<h4>Question " + (qstnCount + 1) + " out of " + triviaQuestions.length + "</h4>");
}

function timer() {
	clockInterval = setInterval(timeLimit, 1000);
  function timeLimit() {
    $("#countDown-timer").html("<h3>Seconds left: " + gameTime + "</h3>");
    if (gameTime === 0) {
      clearInterval(clockInterval);
      $("#choices").empty();
      $("#question-number").empty();
      notAnswered++;
    	$("#question").html("<h2>You ran out of time! Correct Answer: " + correctAnswer[qstnCount] + "</h2>");
    	setTimeout(advance, 2500);
      $("#countDown-timer").html("<h3>Time is Up!</h3>");
    }
    if (gameTime > 0) {
      gameTime--;
    }
  }
}

//Function will either advance to the next question or display the trivia game results
function advance() {
	if (qstnCount < 9) {
	qstnCount++;
	gameTime = 20;
  displayGame();
  timer();
	}
	else {
		results();
	}
}

//Displays trivia game results
function results() {
  $(".game-area").html("<h2 class='results'>Quiz Completed!" + "</h2>" + "<p class='results'>Correct Answers: " + numCorrect + "</p>" + "<p class='results'>Wrong Answers: " + numIncorrect + "</p>" + "<p class='results'>Not Answered: " + notAnswered + "</p>" + "<p class='results'><a class='btn btn-primary btn-lg resetBtn' href='#' role='button'>Reset Trivia Challenge</a></p>");
}

//reset game function
function reset() {
	qstnCount = 0;
	numCorrect = 0;
	numIncorrect = 0;
	notAnswered = 0;
	gameTime = 20;
  $('.game-area').html('<div class="col-md-10 col-centered" id="intro"></div>' + '<div class="col-md-10 col-centered" id="start"></div>' + '<div class="col-md-10 col-centered" id="countDown-timer"></div>' +
  '<div class="col-md-10 col-centered" id ="question"></div>' +
  '<div class="col-md-10 col-centered" id="choices"></div>' +
  '<div class="col-md-10 col-centered" id="question-number"></div>');
  introCopy();
  startButton();
}


  function startButton() {
    $("#start").html("<p><a class='btn btn-primary startBtn' href='#'>Start Quiz</a></p>");
  }
  startButton();

  function introCopy() {
  $("#intro").html("<p class='introCopy'>Welcome to the NBA Trivia Challenge! You will be given a series of 10 multiple choice questions with 20 seconds to answer each, Good Luck!</p>");
  }
  introCopy();

  //Once button is clicked game begins and creates html content
  $("body").on("click", ".startBtn", function(event){
	   displayGame();
     timer();
     $("#intro").empty();
     $("#start").empty();
  });

  //Resets the game
  $("body").on("click", ".resetBtn", function(event){
    reset();
  });

  //Compares the string of the selected Answer with the string of the correct answer to determine whether correct or incorrect
  $("body").on("click", ".choice", function(event){
  	clickSelect = $(this).text();
  	if(clickSelect === correctAnswer[qstnCount]) {
  		clearInterval(clockInterval);
      numCorrect++;
      $("#choices").empty();
      $("#question-number").empty();
      $("#countDown-timer").html("<h3>Seconds left: 20</h3>");
      $("#question").html("<h2>Correct! The answer is: " + correctAnswer[qstnCount] + "</h2>");
    	setTimeout(advance, 2500);
  	}
  	else {
  		clearInterval(clockInterval);
      numIncorrect++;
      $("#choices").empty();
      $("#question-number").empty();
      $("#countDown-timer").html("<h3>Seconds left: 20</h3>");
      $("#question").html("<h2>Wrong! The answer is: " + correctAnswer[qstnCount] + "</h2>");
    	setTimeout(advance, 2500);
  	}
  });
});
