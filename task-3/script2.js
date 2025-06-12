document.getElementById("start-quiz").addEventListener("click", startQuiz);

const clang = [
  { question: "What is C programming?", options: ["Query language", "Procedural Language", "Object oriented language"], answer: "Procedural Language" },
  { question: "How to print statements?", options: ["Println", "Print", "printf"], answer: "printf" },
  { question: "Which data type represents numbers?", options: ["int", "double", "float"], answer: "int" },
  { question: "Which operator performs a binary shift?", options: ["++", "--", ">>"], answer: ">>" },
  { question: "How are comments represented in C?", options: ["#", "///", "//"], answer: "//" }
];

const plang = [
  { question: "What is Python programming?", options: ["Query language", "Procedural Language", "Object oriented language"], answer: "Object oriented language" },
  { question: "How to print statements?", options: ["println", "print", "printf"], answer: "print" },
  { question: "Which data type represents an integer?", options: ["int", "double", "float"], answer: "int" },
  { question: "Which operator performs a binary shift?", options: ["++", "--", ">>"], answer: ">>" },
  { question: "How are comments represented in Python?", options: ["#", "///", "//"], answer: "#" }
];

const jlang = [
  { question: "What is Java programming?", options: ["Query language", "Procedural Language", "Object oriented language"], answer: "Object oriented language" },
  { question: "How to print statements after System.out?", options: ["println", "print", "printf"], answer: "println" },
  { question: "Which data type represents an integer?", options: ["int", "double", "float"], answer: "int" },
  { question: "Which operator performs a binary shift?", options: ["++", "--", ">>"], answer: ">>" },
  { question: "How are comments represented in Java?", options: ["#", "///", "//"], answer: "//" }
];
let score = 0;
let currentQuestionIndex = 0;
let selectedQuiz = [];

function startQuiz() {
    const languageChoice = document.getElementById("language").value;
    selectedQuiz = languageChoice === "clang" ? clang :
                   languageChoice === "plang" ? plang :
                   languageChoice === "jlang" ? jlang : [];

    let quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";

    score = 0;
    currentQuestionIndex = 0;
    selectedQuiz.forEach(q => q.answered = false);
    updateScoreDisplay();
    displayQuestion();
}

function displayQuestion() {
    let quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; 

    let currentQuestion = selectedQuiz[currentQuestionIndex];
    fetchJoke();
    quizContainer.innerHTML = `<p>${currentQuestionIndex + 1}. ${currentQuestion.question}</p>`;

    let optionsContainer = document.createElement("div");
    optionsContainer.classList.add("quiz-options-container");

    currentQuestion.options.forEach(option => {
        let button = document.createElement("button");
        button.innerText = option;
        button.classList.add("quiz-option");
        button.onclick = () => checkAnswer(option, currentQuestion);
        optionsContainer.appendChild(button);
    });

    quizContainer.appendChild(optionsContainer);

    let nextButton = document.createElement("button");
    nextButton.innerText = currentQuestionIndex === selectedQuiz.length - 1 ? "Finish" : "Next";
    nextButton.classList.add("next");
    nextButton.onclick = () => {
        if (currentQuestionIndex < selectedQuiz.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            checkCompletion();
        }
    };
    quizContainer.appendChild(nextButton);
}

function checkAnswer(selected, currentQuestion) {
    if (!currentQuestion.answered) {
        if (selected === currentQuestion.answer && score < 5) {
            score++;
        }
        currentQuestion.answered = true; // Mark as answered
    }
    updateScoreDisplay();
}

function updateScoreDisplay() {
    document.getElementById("scoreDisplay").innerText = `Score: ${score}`;
}

function checkCompletion() {
    let quizContainer = document.getElementById("quiz-container");

    if (score >= 5) {
        quizContainer.innerHTML = `<h2>🎉 Congrats! You got 5/5! 🎉</h2>`;
    } else if (currentQuestionIndex === selectedQuiz.length - 1 && score < 5) {
        quizContainer.innerHTML = `<h2>😢 Score below 5! Try again.</h2>`;
    }
}

 function fetchJoke() {
  fetch('https://official-joke-api.appspot.com/random_joke')
    .then(response => response.json()) 
    .then(data => {
      document.getElementById('quizJoke').innerHTML = `<p><strong>${data.setup}</strong> — ${data.punchline}</p>`;
    }) 
    .catch(error => console.error('Error fetching joke:', error));
}



