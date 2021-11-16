

let buttons =[
   false,
   false,
   false,
   false,
   false,
   false
    
]


let allSelected = false;
let hasAnswerSelected = false;
let answerIDSelected =null;

let correct_answerID = 3;

let questionIndex=null;

let validQuestionsList = [];
let validQuestionsTotal = 0;

let currentQuestion = null;


let questions = [];


async function generateValidQuestionsListAPI(category_ID){

    let fetchData = [];

    switch(category_ID){
        case 0: fetchURL = 'https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple'; break;
        case 1: fetchURL = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple'; break;
        case 2: fetchURL = 'https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple'; break;
        case 3: fetchURL = 'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple'; break;
        case 4: fetchURL = 'https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple'; break;
        case 5: fetchURL = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'; break;
    }

    await fetch(fetchURL)
        .then(response => fetchData=response.json())
        .catch(console.error("error"));

            
   
    return fetchData;
    
}

async function generateValidQuestionsList(){
    questionIndex = 0;
    validQuestionsList.length = 0;
    validQuestionsTotal = 0;
    for(let b =0; b<buttons.length; b++){
        if(buttons[b]){    
            const myPromise = await generateValidQuestionsListAPI(b);
                for(let i=0; i<myPromise.results.length;i++){
                    validQuestionsList.push(myPromise.results[i]);
                }

          
     
        }
    }
    shuffleArray(validQuestionsList);   
    getNextQuestion();           
    checkEmptyQuestionList(validQuestionsList);
}


function checkEmptyQuestionList(list){
    if(list.length == 0){
        $('#category_unselected_text').css("visibility", "visible");
        $(".answer").css("visbility","hidden");
        $("#question_bottom_navbar").css('visiblity','hidden');
        return;
    }
    else{
        $('#category_unselected_text').css("visibility", "hidden");
        $(".answer").css("visbility","visible");
        $("#question_bottom_navbar").css('visiblity','visible');

    }
}


function generateQuestion(){
    hasAnswerSelected = false;
    answerIDSelected = null;
    $(".answer").css("border-color","black");
    $("#display_correctness").css('visibility','hidden');
    
    generateValidQuestionsList();
    
 
    
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function getRandomQuestion(){
    currentQuestion = null;
    let index = getRandomInt(0, validQuestionsList.length-1)
    currentQuestion = validQuestionsList[index];
}

function getNextQuestion(){

    $(".answer").css("border-color", "black");

    currentQuestion = null;
    if(questionIndex < validQuestionsList.length){
        currentQuestion = validQuestionsList[questionIndex];
        questionIndex++;
    }
    else{
        $("#display_correctness").text("End of Quiz")
        $("#display_correctness").css('visibility','visible');
        $('.answer').text(" - ");
        $('#question_wrapper').text(" - ");
        
        return;
    }

    document.getElementById("category_unselected_text").style.visibility = 'hidden';

    let answers_List = [0,0,0,0];
    correct_answerID = getRandomInt(0,3);
    answers_List[correct_answerID] = replaceEscapeCharacters(currentQuestion.correct_answer);
    let indexID = 0;
    for(let i=0; i<answers_List.length; i++){
        if(i != correct_answerID){
            answers_List[i] = replaceEscapeCharacters(currentQuestion.incorrect_answers[indexID]);
            indexID++;
        }
    }


    $("#question_wrapper").css("visibility", "visible");
    $("#question_wrapper").text(replaceEscapeCharacters(currentQuestion.question));

    $(".answer").css("visibility", "visible");
    $("#answer0").text(replaceEscapeCharacters(answers_List[0]));
    $("#answer1").text(replaceEscapeCharacters(answers_List[1]));
    $("#answer2").text(replaceEscapeCharacters(answers_List[2])); 
    $("#answer3").text(replaceEscapeCharacters(answers_List[3])); 
    
    
}


function replaceEscapeCharacters(input){

    input = input.replace(/&#039;/g, "\'")
    input = input.replace(/&quot;/g, "\"");
 

    return input;
}

/* =================CLICKING BUTTONS ===============================*/

$("#button_geography").click(function(){

    if(allSelected){
        return;
    }

  
    if(!buttons[0] == true){
        $(this).css("border-color","black");       
    }
    else{
        $(this).css("border-color","gray");
    }
    buttons[0] = !buttons[0];
    });

 $("#button_science").click(function(){

    if(allSelected){
        return;
    }

     
        if(!buttons[1] == true){
            $(this).css("border-color","black");       
        }
        else{
            $(this).css("border-color","gray");
        }
        buttons[1] = !buttons[1];
        });   


$("#button_history").click(function(){

    if(allSelected){
        return;
    }



        if(!buttons[2] == true){
            $(this).css("border-color","black");       
        }
        else{
             $(this).css("border-color","gray");
        }
         buttons[2] = !buttons[2];
         });  
         
         
 $("#button_animals").click(function(){
    
    if(allSelected){
        return;
    }

         if(!buttons[3] == true){
             $(this).css("border-color","black");       
         }
         else{
             $(this).css("border-color","gray");
          }
      buttons[3] = !buttons[3];
          });


 $("#button_entertainment").click(function(){
        
    if(allSelected){
        return;
    }

             if(!buttons[4] == true){
                 $(this).css("border-color","black");       
                 }
             else{
              $(this).css("border-color","gray");
                }
           buttons[4] = !buttons[4];
   });

$("#button_sports").click(function(){

        if(allSelected){
            return;
        }

        if(!buttons[5] == true){
            $(this).css("border-color","black");       
        }
        else{
             $(this).css("border-color","gray");
        }
         buttons[5] = !buttons[5];
         });




/* =========================CLICKING ALL BUTTON===========================*/
$("#button_all").click(function(){

    $(".selector_button").css("border-color", "gray")

    if(allSelected == false){
        $(this).css("border-color","black");   
        $(".selector_button").css("border-style","dashed");    
    }
    else{
        $(this).css("border-color","gray");
        $(".selector_button").css("border-style","solid");
    }
    
    allSelected = !allSelected;
    for(let i=0; i<buttons.length; i++){
         buttons[i] = allSelected;
    }

    
    
    
    
});


    




/* ======================ANSWER========================*/

    $("#generate_quiz").click(function(){
        generateQuestion();
        $("#generate_quiz").text("Reset Quiz");
        
        });


    $(".answer").click(function (event) {

        let elements = document.getElementsByClassName("answer");    
        for(let i=0; i<elements.length; i++){ 
            if(this.id == elements[i].id){
                answerIDSelected = this.id.charAt(this.id.length-1);
            }
        }

        if(hasAnswerSelected){            
            $(".answer").css("border-color", "black");
            $(this).css("border-color","green");
            answerIDSelected = this.id.charAt(this.id.length-1);
        }
        else{
            $(this).css("border-color","green");
            hasAnswerSelected = !hasAnswerSelected;
            answerIDSelected = this.id.charAt(this.id.length-1);
        }

    }
    );

    
$("#submit_answer").click(function(){
   
    if(correct_answerID == answerIDSelected){

        $("#display_correctness").text("You are Correct!")
        $("#display_correctness").css('visibility','visible');
    }
    else{
        $("#display_correctness").text("You are Incorrect!")
        $("#display_correctness").css('visibility','visible');
        let idvalue = "#answer"+ answerIDSelected;
        $(idvalue).css("border-color","red");
        idvalue = "#answer"+ correct_answerID;
        $(idvalue).css("border-color","green");        
    }

    $("#next_question").css('visibility','visible');
      


});

$("#next_question").click(function(){
    $("#display_correctness").css('visibility','hidden');
    $("#next_question").css('visibility','hidden');

    getNextQuestion();
    


});

function clickButton(button_clicked){
    
    button_clicked = !button_clicked;
}