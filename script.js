const loginContainer = document.getElementById("login-container");
const languageContainer = document.getElementById("language-container");
const quizContainer = document.getElementById("quiz-container");
const startBtn = document.getElementById("start-btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const timerEl = document.getElementById("time");
const questionEl = document.querySelector(".question");
const optionsEl = document.querySelector(".options");
const resultEl = document.querySelector(".result");
const scoreEl = document.getElementById("score");
const restartBtn = document.querySelector(".restart-btn");

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
let quizData = [];
const questions = {
  java: [
    { question: "What is JVM?", options: ["Java Virtual Machine", "Java Variable Method", "Joint Virtual Memory", "Java Verified Mode"], answer: "Java Virtual Machine" },
    { question: "Which keyword is used to inherit a class?", options: ["implements", "extends", "inherits", "instanceof"], answer: "extends" },
    { question: "Which method is the entry point of Java program?", options: ["start()", "main()", "run()", "execute()"], answer: "main()" },
    { question: "Which data type is used for decimal values?", options: ["int", "double", "char", "boolean"], answer: "double" },
    { question: "Which is not OOP concept?", options: ["Encapsulation", "Polymorphism", "Abstraction", "Compilation"], answer: "Compilation" },
    { question: "Which package contains Scanner class?", options: ["java.io", "java.util", "java.lang", "java.sql"], answer: "java.util" },
    { question: "Which keyword is used for constants?", options: ["const", "final", "static", "constant"], answer: "final" },
    { question: "Default value of int?", options: ["0", "null", "1", "undefined"], answer: "0" },
    { question: "Which collection doesn’t allow duplicates?", options: ["List", "Set", "Map", "Array"], answer: "Set" },
    { question: "Which exception is unchecked?", options: ["IOException", "SQLException", "NullPointerException", "ClassNotFoundException"], answer: "NullPointerException" }
  ],
  javascript: [
    { question: "Which company developed JavaScript?", options: ["Microsoft", "Netscape", "Oracle", "IBM"], answer: "Netscape" },
    { question: "Which symbol is used for comments?", options: ["//", "/* */", "#", "<!-- -->"], answer: "//" },
    { question: "Which method is used to print in console?", options: ["console.log()", "print()", "document.write()", "log.print()"], answer: "console.log()" },
    { question: "Which type is NaN?", options: ["Number", "String", "Boolean", "Undefined"], answer: "Number" },
    { question: "Which keyword declares variable?", options: ["var", "let", "const", "All of the above"], answer: "All of the above" },
    { question: "Which operator checks both value and type?", options: ["==", "===", "=", "!="], answer: "===" },
    { question: "Which function converts JSON to object?", options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "parse.JSON()"], answer: "JSON.parse()" },
    { question: "Which loop executes at least once?", options: ["for", "while", "do...while", "forEach"], answer: "do...while" },
    { question: "Which is not a primitive type?", options: ["String", "Number", "Boolean", "Object"], answer: "Object" },
    { question: "Which symbol is for template literals?", options: ["''", "\"\"", "``", "()"], answer: "``" }
  ],
  htmlcss: [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Mark Language", "Home Tool Markup Language"], answer: "Hyper Text Markup Language" },
    { question: "Which tag is used for the largest heading?", options: ["<h1>", "<h6>", "<head>", "<heading>"], answer: "<h1>" },
    { question: "Which attribute sets image source?", options: ["src", "href", "alt", "link"], answer: "src" },
    { question: "Which tag is used for line break?", options: ["<br>", "<hr>", "<p>", "<lb>"], answer: "<br>" },
    { question: "Which CSS property changes text color?", options: ["background-color", "font-color", "color", "text-color"], answer: "color" },
    { question: "Which unit is relative to parent font-size?", options: ["em", "px", "%", "rem"], answer: "em" },
    { question: "Which position places element relative to viewport?", options: ["static", "relative", "absolute", "fixed"], answer: "fixed" },
    { question: "Which selector is used for id?", options: [".classname", "#idname", "element", "*"], answer: "#idname" },
    { question: "Which property makes text bold?", options: ["font-weight", "font-style", "text-decoration", "font-bold"], answer: "font-weight" },
    { question: "Which tag creates a hyperlink?", options: ["<a>", "<link>", "<href>", "<url>"], answer: "<a>" }
  ],
  python: [
    { question: "Who created Python?", options: ["Dennis Ritchie", "Guido van Rossum", "James Gosling", "Bjarne Stroustrup"], answer: "Guido van Rossum" },
    { question: "Which keyword defines a function?", options: ["func", "define", "def", "function"], answer: "def" },
    { question: "Which symbol is used for comments?", options: ["//", "/* */", "#", "<!-- -->"], answer: "#" },
    { question: "Which data type is mutable?", options: ["tuple", "list", "string", "int"], answer: "list" },
    { question: "Which method adds element to list?", options: ["append()", "add()", "push()", "insert()"], answer: "append()" },
    { question: "Which library is for data analysis?", options: ["NumPy", "Pandas", "Matplotlib", "TensorFlow"], answer: "Pandas" },
    { question: "Which keyword handles exceptions?", options: ["try", "except", "catch", "finally"], answer: "except" },
    { question: "Which operator is exponentiation?", options: ["^", "**", "exp()", "pow()"], answer: "**" },
    { question: "Which keyword creates a class?", options: ["class", "struct", "object", "define"], answer: "class" },
    { question: "Which function gets input?", options: ["scan()", "input()", "read()", "get()"], answer: "input()" }
  ]
};

function handleLogin() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address!");
    return;
  }

  if (!email || !password) {
    alert("Please enter both email and password!");
    return;
  }

  if (password !== "bec") {
    alert("Invalid password!");
    return;
  }

  loginContainer.style.display = "none";
  languageContainer.style.display = "flex";
}

startBtn.addEventListener("click", handleLogin);

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleLogin();
  }
});

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    quizData = questions[btn.dataset.lang];
    languageContainer.style.display = "none";
    quizContainer.style.display = "block";
    currentQuestion = 0;
    score = 0;
    loadQuestion();
  });
});

function loadQuestion() {
  if (currentQuestion >= quizData.length) {
    endQuiz();
    return;
  }

  clearInterval(timerInterval);
  timeLeft = 30;
  timerEl.textContent = timeLeft;
  startTimer();

  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = `Q${currentQuestion + 1}. ${currentQuiz.question}`;
  optionsEl.innerHTML = "";

  currentQuiz.options.forEach(option => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = option;
    button.onclick = () => checkAnswer(option, button);
    optionsEl.appendChild(button);
  });
}

function checkAnswer(selectedOption, button) {
  const correctAnswer = quizData[currentQuestion].answer;

  if (selectedOption === correctAnswer) {
    score++;
    button.classList.add("correct"); 
  } else {
    button.classList.add("wrong"); 
    const optionButtons = document.querySelectorAll(".option");
    optionButtons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct"); 
      }
    });
  }

  const optionButtons = document.querySelectorAll(".option");
  optionButtons.forEach(btn => (btn.disabled = true));

  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 1500);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  resultEl.style.display = "none";
  restartBtn.style.display = "block";

  let comment = "";

  if (score === 10) {
    comment = "Excellent! 🎉 You got all answers correct!";
  } else if (score > 7) {
    comment = "Nice! 👏 You did really well!";
  } else if (score > 4) {
    comment = "Ok, fine 🙂 You can improve more.";
  } else {
    comment = "Try again! 💪 Keep practicing.";
  }

  const popup = document.getElementById("resultPopup");
  const popupMessage = document.getElementById("popupMessage");
  const popupCelebration = document.getElementById("popupCelebration");

  popupMessage.innerHTML = `
    <h2>Your Score: ${score}/10</h2>
    <p>${comment}</p>
  `;

  if (score > 8) {
    popupCelebration.style.display = "block";
  } else {
    popupCelebration.style.display = "none";
  }

  popup.style.display = "flex";

  document.getElementById("closePopup").onclick = () => {
    popup.style.display = "none";
  };

  const stars = document.querySelectorAll(".user-rating span");
  const feedback = document.getElementById("userFeedback");

  stars.forEach(star => {
    star.addEventListener("click", () => {
      const rating = star.getAttribute("data-value");

      stars.forEach(s => s.style.color = "#ccc");

      for (let i = 0; i < rating; i++) {
        stars[i].style.color = "gold";
      }

      feedback.textContent = `You rated this quiz ${rating} out of 5 stars ⭐`;
    });
  });
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  timeLeft = 30;
  questionEl.style.display = "block";
  optionsEl.style.display = "flex";
  resultEl.style.display = "none";
  restartBtn.style.display = "none";
  loadQuestion();
});
