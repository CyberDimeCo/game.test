const chalk = require('chalk')
const readline = require('readline-sync')
const username = readline.question(chalk.blue("Enter your name: "))
console.log("Hi " + chalk.green(username) + "!")
let menu = readline.question("Do you want to start a game?\n1 - Yes\nAny other key - No\n")
const n = 12
switch(menu){
    case "1":
        console.log("\nHere we go!")
        game()
        break;
    default:
        console.log("\nBye!")
        break;
}

function game(){
    let player = []
    let AI = []
    let playerDamage = 0
    let AIDamage = 0
    let currentPlayer = null
    let prevPlayer = null
    let currentAI = null
    let round = 0
    for (let i = 0; i < n; i++){
        AI[i] = i
        player[i] = i
    }
    do{
        let check = false;
        round++
        console.log(chalk.green("\nRound " + round))
        console.log(chalk.red("\nFIGHT!"))
            do{
                currentPlayer = readline.question("\nChoose card: ")
                if(player[currentPlayer] == null){
                    console.log("\nYou don't have this card!")
                }
                else{
                    check = true
                }
        }while(!check)
        if (round%2 != 0 && round > 1){
            currentAI = bot(prevPlayer, AI)
            if(currentAI < currentPlayer){
                AIDamage += currentPlayer - currentAI
            }
        }
        else if (round == 1){
            currentAI = n/2-1
            if(currentAI < currentPlayer){
                AIDamage += currentPlayer - currentAI
            }
        }
        else{
            currentAI = bot(prevPlayer, AI)
            if(currentAI > currentPlayer){
                playerDamage += currentAI - currentPlayer
            }
        }
        console.log("\nPlayer card: " + chalk.green(currentPlayer) + "\nBot card: " + chalk.green(currentAI))
        console.log("\nPlayer damage: " + chalk.red(playerDamage) + "\nBot damage: " + chalk.red(AIDamage))
        prevPlayer = currentPlayer
        AI[currentAI] = null
        player[currentPlayer] = null
    }while(round < n)
    if (playerDamage > AIDamage){
        console.log(chalk.red("Bot ")+ "wins!")
    }
    else if(playerDamage == AIDamage){
        console.log(chalk.yellowBright("Draw!"))
    }
    else
    console.log(chalk.green(username) + " wins!")
}

function bot(prevPlayer, AI = []){
    let i
    if(prevPlayer <= n/2 && prevPlayer >= 0){
        while(AI[i] == null)
            i = Math.floor(Math.random( ) * n/2+1)
        return(i)
    }
    else{
        while (AI[i] == null){
        i = Math.floor(Math.random( ) * (n - n/2+1)) + n/2
        }
        return(i)   
    }   
}