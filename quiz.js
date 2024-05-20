// quiz.js

//three variables are created
//one holds the score, another holds the number of user attempts and the last one checks if the user is still guessing
let score = 0;
let attempt = 0;
let still_guessing = true;

//array that holds the question, answer and the image of the animal
//all three are placed in an object
let questions = [
    { 
        question: "Which bear lives at the North Pole?", 
        answer: "polar bear",
        image: "C:/Users/petix/Downloads/polar_bear.jpg"
    },
    { 
        question: "What is the fastest mammal?", 
        answer: "cheetah",
        image: "C:/Users/petix/Downloads/cheetah.jpg"
    },
    { 
        question: "What is the largest animal in the world?", 
        answer: "blue whale",
        image: "C:/Users/petix/Downloads/blue_whale.jpg"
    },
	{
		question: "What is the tallest land animal in the world?", 
        answer: "giraffe",
        image: "C:/Users/petix/Downloads/giraffe.jpg"
	},
	{
        question: "What is the only mammal that can fly?", 
        answer: "bat",
        image: "C:/Users/petix/Downloads/bat.jpg"
	}
];

//this variable holds the current question number
//which will be used as an index for each object in the questions array
let currentQuestion = 0;

//this line makes displays the current question in the question div 
document.getElementById('question').innerText = questions[currentQuestion].question;

//a function for when the user presses the submit button
function submitAnswer() {
    //the value of the userAnswer variable will show in the input box
    let userAnswer = document.getElementById('answer').value;
    //if still_guessing is still true and number of attempts is less than three
    if (still_guessing && attempt < 3) {
	//if the text in the input box is equal to the value of the answer kwy in the questions array
	//you can do console.log(questions[currentQuestion].answer.toLowerCase()) and see the answer
        if (userAnswer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
	    //Show this message in the feedback div
            document.getElementById('feedback').innerText = 'Correct Answer!';
	    //add 1 to the value of score
            score++;
	    //display the score in the score div
            document.getElementById('score').innerHTML = 'Score: ' + score;
            // Show popup for correct answer with a button to proceed
            showPopup('You\'re correct! Click to continue.');
			
	//if the user's answer is incorrect 
        } else {
	    //if the value of attempt is less than 2
            if (attempt < 2) {
		//display this message on the feeback div
                document.getElementById('feedback').innerText = 'Sorry wrong answer. Try again.';
		//add one to the value of attempt
                attempt++;
		console.log(attempt)
	    //if the value of attempt is no longer less than 2
            } else {
		//display this message in the feedback div
                showPopup(`Sorry, the correct answer is ${questions[currentQuestion].answer}.`);
            }
        }
    }
}

// Add event listener to the input field to detect Enter key press
document.getElementById('answer').addEventListener('keyup', function(event) {
    //if the user presses the enter key
    if (event.key === 'Enter') {
	//call submitAnswer function
        submitAnswer();
    }
});

// Function to update question and image
function updateQuestionAndImage() {
    //if the value of currentQuestion is less than the number of objects in questions
    if (currentQuestion < questions.length) {
	//display a question
        document.getElementById('question').innerText = questions[currentQuestion].question;
	//display an image
        document.getElementById('questionImg').src = questions[currentQuestion].image; // Set image source
	//the inpuy box will now be empty
        document.getElementById('answer').value = '';
	//the value of the feedback div will now be ''
	//basically it removes the feedback message
        document.getElementById('feedback').innerText = '';
}

// Display the first question and image when the page loads
//so call the updateQuestionANd Image() function
updateQuestionAndImage();

//create nextQuestion() function
function nextQuestion() {
    //set the value of attempt back to zero so that the game will continue
    attempt = 0;
    //add one to the value of currentQuestion
    currentQuestion++;
    //if the value of currentQuestion is less than the number of objects in questions array
    //basically if there are still questions
    if (currentQuestion < questions.length) {
	//call updateQuestionAndImage function
	updateQuestionAndImage();
    //basically if the game reaches the final question
    } else {
	//display this 
        document.getElementById('quiz').innerHTML = `<h1>Quiz Completed</h1>Your score is ${score}/${questions.length}`;
    }
	
}

function showPopup(message) {
	attempt = 0;
    // Create a variable that takes a div element
    let popup = document.createElement('div');
	//give the div a class name - popup
    popup.className = 'popup'; // Add the class name to the popup
	//the content on the popup will be the message's value
    popup.textContent = message;
	
	//create a variable that takes a button element
    let continueButton = document.createElement('button');
	
	//put this text on the button
    continueButton.textContent = 'Next';
	//once the button is clicked call a function
    continueButton.onclick = function() {
		//remove the popup
        document.body.removeChild(popup);
		//call the nextQuestion function
        nextQuestion();
    };
	
	//Add a line break
    popup.appendChild(document.createElement('br'));
	
	//the popup div gets the continueButton button element
    popup.appendChild(continueButton);
	//add the popup div element to the html body 
    document.body.appendChild(popup);
}

//display this text in the score div
document.getElementById('score').innerText = `Score: ${score}`;

