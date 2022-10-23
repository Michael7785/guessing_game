const readline = require("node:readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log("INSTRUCTIONS: Welcome to this unbelievably fun, creative, terminal-based number guessing game that will keep you entertained for, I don't know, several minutes? Depending on how bored you are?  I don't know your life. First you'll need to enter a minimum and maximum number. The wider the range you choose, the harder the game will be. Then I'll ask you for how many guesses you want. Fewer guesses makes it harder, more guesses makes things easier. It's up to you. Once you've done that, I'll start thinking of a secret number between those two numbers. You'll have to guess it. If you guess it right, you win!  What do you win? Why, your own smug sense of accomplishment, of course!")
askRange();

function askRange() {
    rl.question("Enter a minimum number: ", answer => {
        let min = Number(answer);

        rl.question("Enter a maximum number: ", answer => {
            let max = Number(answer);
            const secretNumber = randomInRange(min, max);

            rl.question("Enter number of guesses: ", answer => {
                const numAttempts = Number(answer);
                console.log("Ok, great. I'm thinking of a number between " + min + " and " + max + "...");
                askGuess(secretNumber, numAttempts, min, max);
            })
        });
    });
}

function askGuess(secretNumber, numAttempts, min, max) {
    let counter = numAttempts;
    rl.question("Guess a number: ", function(answer) {
        let num = Number(answer);
        if (checkGuess(num, secretNumber, min, max) === true) {
            console.log("Ding ding ding!  You win!!");
            rl.close();
        }
        else {
            counter--;
            if (counter !== 0) {
                askGuess(secretNumber, counter, min, max);
            }
            else {
                console.log("Well, you're out of guesses, so you lose. Sucks to be you.");
                rl.close();
            }
        }
    });
}


function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkGuess(num, secretNumber, min, max) {

    if (num === secretNumber) {
        console.log("Correct! You got it right you beautiful wizard!");
        return true;
    }
    else if (num < min) {
        console.log("The number you guessed is less than the minimum number. Seriously are you even paying attention?");
        return false;
    }
    else if (num > max) {
        console.log("That number is bigger than the max you put in. Math is hard.");
        return false;
    }
    else if (num < 0) {
        console.log("What part of 'greater than zero' do you not understand?");
        return false;
    }
    else if (num < secretNumber) {
        console.log("Too low. Were you raised by hedgehogs?!?!?");
        return false;
    }
    else if(num > secretNumber) {
        console.log("Too high.  Is that seriously your best guess?");
        return false;
    }
    else {
        console.log("That's not a number?!? What are you even doing???");
        return false;
    }
}
