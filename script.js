window.addEventListener("load", setup);

let sentences = "What a big boy he is!\n" + "My dad bought half a cow.\n" + "quick trip back to Tennessee for the weekend!\n" + "Hold on I need at least a few minutes!\n" + "We made it to the club.\n" + "He does everything without aim.\n" + "What a big pumpkin!\n" + "Look at me right now I'm about to fall!\n" + "Walking up to a random stranger is scary.\n" + "I'm home finally.\n" + "What a big dog!\n" + "Very good job, I am so proud of you!\n" + "I wish I had met my uncle yesterday.\n" + "You're so ratchet!\n" + "I don't see what the big deal is.\n" + "Tom is a respectable businessman.\n" + "Let's go out to eat.\n" + "I want to take a nap!\n" + "China is bigger than Japan.\n" + "Don't go there!\n" + "He threw up all over me!\n" + "My small pet mouse escaped from his cage.\n" + "Good morning!\n" + "Your name was deleted from the list.\n" + "Sit down and cross your legs, please!\n" + "Good heavens you’ve grown!\n" + "The gorilla beat his chest.\n" + "We both know that it's no big deal.\n" + "quick trip back to Tennessee for the weekend!\n" + "I had so much hope in the beginning.\n" + "I am doing just wonderful!\n" + "Carl won the spelling bee and got a trophy!\n" + "He caught a big fish.\n" +"Leapin' lizards!\n" +"They speak English at work.\n" +"We can go to Russia.\n" +"What a big truck!\n" +"No problem!\n" + "That's all! Time is up\n" +"Good gracious!\n" + "Ridiculous!\n" +"She went to sleep after twelve.\n" +"What a big pumpkin!\n" +"What a big truck!\n" +"Mind your own business!\n" +"He is a big eater.\n" +"I can't wait to eat dinner!\n" +"My legs feel like noodles!\n" +"Good heavens you’ve grown!\n" +"He threw up all over me!\n" +"Let me see that list.\n" +"What a big dog that is!\n" +"You have a big house.\n" +"What a big house you have!\n" +"All that glitters is not gold.\n" +"My shoes are bigger than yours.\n" +"Look at me right now I'm about to fall!\n" +"I know that there was a big church here.\n" +"Good morning!\n" +"Walking up to a random stranger is scary.\n" +"He worked in a big city hospital.\n" +"More people have been to Russia than I have.\n" +"Tom is looking for a bigger house to live in.\n" + "He threw up in the trash can!\n" + "It's not a big deal.\n" + "I am doing just wonderful!\n" + "Here he comes to save the day!\n" + "Look at me right now I'm about to fall!\n" + "Don’t worry about it!\n" + "A skirt can be fancier than jeans.\n" + "Don’t open the door!\n" + "The castle is on top of a cliff.\n" + "What a big pumpkin!\n" + "I like veggies too.\n" + "Come on down!\n" + "Hurry up I'm not getting any younger!\n" + "No problem !That's all !Time is up\n" +
    "His muscle is so big.\n" + "You can mash them, peel them, or spread them.\n" + "I can't wait to eat dinner!\n" + "These are books.\n" + "My legs feel like noodles!\n" + "He has been a policeman for ten years.\n" + "everything is so expensive.\n" + "It was a big mistake.\n" + "Let’s go I'm sick of waiting!\n" + "Here he comes to save the day!\n" + "I miss my niece.\n" + "Very good job, I am so proud of you!\n" + "I caught a big fish yesterday.\n" + "He is the person to see.\n" + "Hurry up I'm not getting any younger!\n" + "Good heavens you’ve grown!\n" + "Tom took a big bite out of Mary's sandwich.\n" + "That's a big one.\n" + "What a big pumpkin!\n" + "What a big eater he is!\n" + "It felt great to disconnect with technology.\n" + "Cats hate water.\n" + "A red jacket compliments any outfit.\n" + "He's dead, Jim!\n" + "All the swings are empty.";

//Breaks the string into an array of values
let current = sentences.split('\n');

//Gets a random sentence and sets up game variables
let answer = current[Math.floor(Math.random() * 100)].toUpperCase();
let errors = '';
let currentBoard = [];
let errorAmount = 0;
let buttonContainer = document.getElementById('letter-box');
let resetButton = document.getElementById('replay');

//Initializes all buttons with letters and an onclick function for
//the guess method, when a button is clicked the visibility is turned to hidden
function setup(){
    for (let i = 0; i < 26; i++) {
        let letterButton = document.createElement('button');
        letterButton.id = i.toString();
        letterButton.innerHTML = String.fromCharCode(i + 65);
        letterButton.addEventListener("click", ()=>{
            guess(String.fromCharCode(i + 65));
            document.getElementById(i.toString()).style.visibility = 'hidden';
        });
        buttonContainer.appendChild(letterButton);
    }
    setNewBoard();
}

//Converts the answer text to be displayed as a list of underscores, any
//Char that isn't a letter will simply be displayed as is
function setNewBoard() {
    for (let i = 0; i < answer.length; i++) {
        if(/\w| /.test(answer[i]))
        {
            if(answer[i] === ' ')
                currentBoard.push(' ');
            else
                currentBoard.push('_');
        }
        else
            currentBoard.push(answer[i]);
    }
    
    document.getElementById('progress').innerHTML = currentBoard.join('');
}

//If the sentence contains the guess it will be marked in the display, else the tally
//for errors will increase
function guess(letter) {
    if(answer.includes(letter)){
        for (let i = 0; i < answer.length; i++) {
            if(answer[i] === letter)
                currentBoard[i] = letter;
        }
        document.getElementById('progress').innerHTML = currentBoard.join('');
        checkWin();
    }
    else
        error(letter);
    
}

//Checks to see if the board display matches the answer string
function checkWin() {
    if (answer === currentBoard.join(''))
    {
        alert("YOU WIN!");
        resetButton.style.visibility = 'visible';
        for (let i = 0; i < 26; i++)
            document.getElementById(i.toString()).disabled = true;
    }
}

//Increments error count, and adds the incorrect letter to the element
function error(letter) {
    errors += letter;
    errorAmount++;
    document.getElementById('errors').innerHTML = "Guesses: " + errors;
    document.getElementById('incorrectAmount').innerHTML = `Incorrect: ${errorAmount}`;
    
    if(errorAmount === 6)
        gameOver();
}

//Displays an alert, makes the reset option available, and sets all buttons to disabled
function gameOver() {
    alert(`You Lose...\nAnswer: ${answer}`);
    for (let i = 0; i < 26; i++)
        document.getElementById(i.toString()).disabled = true;
    resetButton.style.visibility = 'visible';
}

//Turns the reset button to visible, creates a new answer sentence
// and sets all the buttons to visible again and enables them
function reset() {
    resetButton.style.visibility = 'hidden';
    //Set answer to new puzzle
    answer = current[Math.floor(Math.random() * 100)].toUpperCase();
    
    //Make all buttons visible
    for (let i = 0; i < 26; i++) {
        document.getElementById(i.toString()).style.visibility = 'visible';
        document.getElementById(i.toString()).disabled = false;
    }
    
    //Rest currentBoard
    currentBoard = [];
    errorAmount = 0;
    errors = '';
    document.getElementById('errors').innerHTML = "Guesses: " + errors;
    document.getElementById('incorrectAmount').innerHTML = `Incorrect: ${errorAmount}`;
    
    setNewBoard();
}