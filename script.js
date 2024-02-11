const questions =[
    {
      question : "What is the largest animal in the world?",
      answers :[
        { text :"Shark",correct :false },
        { text :"Blue Whale",correct :true },
        { text :"Elephant",correct :false },
        { text :"Giraffee",correct :false },
      ]
   },
   {
    question : "What is the smallest country in the world?",
    answers :[
      { text :"Vatican City",correct :true },
      { text :"Bhutan",correct :false },
      { text :"Nepal",correct :false },
      { text :"Sri Lanka",correct :false },
    ]
   },
   {
    question : "What is the largest desert in the world?",
    answers :[
      { text :"Kalahari",correct :false},
      { text :"Gobi",correct :false },
      { text :"Sahara",correct :false },
      { text :"Antarctica",correct :true },
    ]
   },
   {
    question : "What is the smallest continent in the world?",
    answers :[
      { text :"Asia",correct :false },
      { text :"Australia",correct :true },
      { text :"Arctic",correct :false },
      { text :"Africa",correct :false },
    ]
   }
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex+ 1;
    questionElement.innerHTML = questionNumber +". "+ currentQuestion.question;

    let correctAnswer;
    for(var i=0; i< currentQuestion.answers.length; i++){
        if(currentQuestion.answers[i].correct === true ){
            correctAnswer = currentQuestion.answers[i].text;
            break;
        }
    }

    currentQuestion.answers.forEach(answer => {
        const button= document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        button.addEventListener("click",(event)=>{
          console.log("Button clicked-1!");
           let selectedBtn = event.target;
           let answerChoosen = selectedBtn.textContent;

           if(answerChoosen === correctAnswer ){
                selectedBtn.className = "btn correct";
                score++;
           }
           else{
               selectedBtn.classList.add("incorrect");
           }
           //Disable the buttons for the rest of the course.
           const disableButton = document.querySelectorAll(".btn");
           disableButton.forEach(btn => {
            btn.disabled = true;
           });

           //add the next button again
           nextButton.style.display ="block";
           
           //proceeds to next Question
           currentQuestionIndex++;
           
       });
})
      nextButton.addEventListener("click",()=>{
         if(currentQuestionIndex > (questions.length-1)){
              resetState();
               const h2= document.querySelector("h2");
               h2.innerHTML = "Quiz Score - " + score+ "/"+ questions.length;
               h2.style.textAlign ="center";
           }
          else{
            showQuestion();   
          }
         })
};

function resetState(){
     nextButton.style.display = "none";
     while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
     }
}

startQuiz();
