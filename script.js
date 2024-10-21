// Three variables are created
let score = 0;
let attempt = 0;
let still_guessing = true;

// An array holding the quiz questions
let questions = [
    { 
        question: "What bear lives at the North Pole?", 
        answer: "polar bear",
        image: 'images/polar_bear.jpg'
    },
    { 
        question: "What is the fastest land mammal?", 
        answer: "cheetah",
        image: 'images/cheetah.jpg'
    },
    { 
        question: "What is the largest animal in the world?", 
        answer: "blue whale",
        image: 'images/blue_whale.jpg'
    },
    {
        question: "What is the tallest land animal?", 
        answer: "giraffe",
        image: 'images/giraffe.jpg'
    },
    {
        question: "What is the only mammal that can fly?", 
        answer: "bat",
        image: 'images/bat.jpg'
    }
];

// This variable holds the current question number
let currentQuestion = 0;

// Preload question images
let preloadedImages = {};

//create a function that preloads the images
function preloadImages(imageUrls) {
	//The forEach() method calls a function for each element in an array.
	//so basically it Iterates over each URL in the imageUrls array
    imageUrls.forEach(url => {
		// Create a new Image object (an HTML <img> element)
		let img = new Image();
    
		// Set the src attribute of the Image object to the current URL, starting the image loading process
		img.src = url;
    
		// Store the Image object in the preloadedImages object using the URL as the key
		preloadedImages[url] = img;
    
		// Log a message to the console indicating that the image is being preloaded
		console.log(`Preloading image: ${url}`);
    });
}

// A flag to track whether the popup is currently shown
let isPopupActive = false;

// Function to update question and image
function updateQuestionAndImage() {
	//if the value of current question is less than the number of objects in questions
    if (currentQuestion < questions.length) {
		//in the question div in the HTML file display the current question
        document.getElementById('question').innerText = questions[currentQuestion].question;
		//create a variable called questionImg that stores the img HTML element
        let questionImg = document.getElementById('questionImg');
		//create a variable called imageUrl that stores the image of the current question
        let imageUrl = questions[currentQuestion].image;

        // Check if the image is in the preloadedImages object
		if (preloadedImages[imageUrl]) {
			// Check if the preloaded image has fully loaded
			if (preloadedImages[imageUrl].complete) {
				// If the image is fully loaded, set the src of questionImg to display it
				questionImg.src = imageUrl;
			} else {
				// If the image is not fully loaded, set an onload handler
				preloadedImages[imageUrl].onload = () => {
				// When the image finishes loading, set the src of questionImg to display it
				questionImg.src = imageUrl;
				};
			}
		// If the image is not in the preloadedImages object, log an error
	} else {
		console.error(`Image not preloaded: ${imageUrl}`);
	}

	//make the input box display nothing
    document.getElementById('answer').value = '';
	//remove the text in the 'feedback' div
    document.getElementById('feedback').innerText = '';
	
	//for the last two images in the questions array
	//set their width to 80% and height to auto
	//this is for personal preference meaning it's not mandatory
    if (currentQuestion >= questions.length - 2) {
        questionImg.style.width = '80%';
        questionImg.style.height = 'auto';
        }
    }
}

// A function called submitAnswer is created
function submitAnswer() {
	//create a variable called userAnswer that stores the text the user enters 
	//in the input box ('answer') in the html file
    let userAnswer = document.getElementById('answer').value;
	//if still_guessing is still true and the value of attempt is less than 3
    if (still_guessing && attempt < 3) {
		//if the user's answer is equal to the currentQuestion's answer
        if (userAnswer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
            console.log(questions[currentQuestion].answer.toLowerCase());
			//display this text in the 'feedback' div
            document.getElementById('feedback').innerText = 'Correct Answer!';
			//add 1 to the score
            score++;
			//display this text in the 'score' div
            document.getElementById('score').innerHTML = 'Score: ' + score;
			//call showPopup() function with the string 'Correct' as it's argument
            showPopup('Correct!');
        } else {
			//if attempt is less than 2
            if (attempt < 2) {
				//display this text in the 'feedback' div
                document.getElementById('feedback').innerText = 'Sorry wrong answer. Try again.';
				//add 1 to the value of attempt
                attempt++;
                console.log(attempt);
            } else {
				//call the showPopup function with the text below as it's argument
                showPopup(`The correct answer was ${questions[currentQuestion].answer.toUpperCase()}.`, true);
            }
        }
    }
}

// Create nextQuestion() function
function nextQuestion() {
	//set the value of attempt back to zero
    attempt = 0;
	//add 1 to the value of currentQuestion
    currentQuestion++;
	//if the value of currentQuestion is less than the amount of objects in questions
    if (currentQuestion < questions.length) {
		//call the updateQuestionAndImage() function
        updateQuestionAndImage();
    } else {
		//display the text below in the 'quiz' div
        document.getElementById('quiz').innerHTML = `<h1>Quiz Completed</h1>Your score is ${score}/${questions.length}`;
    }
}

// Create a function called showPopup with two parameters 
function showPopup(message, isWrongAnswer = false) {
	//set the value of isPopupActive to true
    isPopupActive = true;
	
	//create a div element and store it in the variable popup
    let popup = document.createElement('div');
	//set the class name of the popup div to 'popup'
    popup.className = 'popup';
	//the text in the 'popup' is set as the value of message
    popup.textContent = message;

	//create a variable called imageSrc that stores the value of isWrongAnswer
    let imageSrc = isWrongAnswer
		//if isWrongAnswer is true, use the thumbs down image
        ? 'C:/Users/petix/OneDrive/Desktop/my_javascript_games/animal_quiz/images/thumbs_down.jpg'
        //if isWrongAnswer is false, use the thumbs up image
		: 'C:/Users/petix/OneDrive/Desktop/my_javascript_games/animal_quiz/images/thumbs_up.jpg';
	
	//set the popup backgroundImage to whichever image
	//that satisfy the condition above
    popup.style.backgroundImage = `url(${imageSrc})`;

	
    // Check if the image is in the preloadedImages object
	if (preloadedImages[imageSrc]) {
		// Check if the preloaded image has fully loaded
		if (preloadedImages[imageSrc].complete) {
			// If the image is fully loaded, display the popup immediately
			displayPopup(popup);
		} else {
			// If the image is not fully loaded, set an onload handler
			preloadedImages[imageSrc].onload = () => displayPopup(popup);
	}
	// If the image is not in the preloadedImages object, log an error
	} else {
		console.error(`Image not preloaded: ${imageSrc}`);
		// Display the popup anyway
		displayPopup(popup);
	}
}

//create a displayPopup function that takes the one parameter 'popup'
function displayPopup(popup) {
	//add 'popup' to the HTML file
    document.body.appendChild(popup);
	//set a timer
    setTimeout(() => {
		//if the HTML body has the 'popup' div element
        if (document.body.contains(popup)) {
			//remove the 'popup' div element
            document.body.removeChild(popup);
			//call the nextQuestion() function
            nextQuestion();
        }
		//set the value of isPopupActive to false
        isPopupActive = false;
	//this is the amount of time the popup will be displayed
    }, 1175);
}

// Add event listener to disable keyboard input when popup is active
document.addEventListener('keydown', function(event) {
    if (isPopupActive) {
        event.preventDefault();
    }
});

// Add event listener to the input field to detect Enter key press
document.getElementById('answer').addEventListener('keyup', function(event) {
    if (event.key === 'Enter' && !isPopupActive) {
        submitAnswer();
    }
});

// Add event listener to the submit button
document.getElementById('button').addEventListener('click', function() {
    if (!isPopupActive) {
        submitAnswer();
    }
});

// Display this text in the score div
document.getElementById('score').innerText = `Score: ${score}`;

// Initialize quiz and preload question images when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create an array of image URLs from the questions array
    let questionImageUrls = questions.map(question => question.image);
    
    // Define an array of popup image URLs for feedback images
    let popupImageUrls = [
        'images/thumbs_up.jpg',
        'images/thumbs_down.jpg'
    ];
    
    // Preload all question and popup images
    preloadImages([...questionImageUrls, ...popupImageUrls]);
    
    // Initialize the quiz with the first question and its image
    updateQuestionAndImage();
});

