#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// My player class starts
class Player {
    name;
    fuel = 100;
    constructor(myPlayerName) {
        this.name = myPlayerName;
    }
    fuelDecrease() {
        this.fuel = this.fuel - 25;
    }
    fuelIncrease() {
        this.fuel = this.fuel + 25;
    }
}
// My player class ends
// Opponent class starts
class Opponent {
    name;
    fuel = 100;
    constructor(opponentName) {
        this.name = opponentName;
    }
    fuelDecrease() {
        this.fuel = this.fuel - 25;
    }
}
// Opponent class ends
// Ask user name and opponent name
let userInput = await inquirer.prompt([
    {
        type: 'input',
        name: 'myName',
        message: "Enter your Name:"
    },
    {
        type: 'list',
        name: 'opponentName',
        message: "Select your opponent",
        choices: ["Skeleton", "Alien", "Zombie"]
    }
]);
let { myName, opponentName } = userInput;
console.log(`${chalk.bold.green(myName)} VS ${chalk.bold.red(opponentName)}`);
// Now make objects from the classes created above:
let myPlayer = new Player(myName);
let myOpponent = new Opponent(opponentName);
// While loop Starts
while (true) {
    let startMatch = await inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: "Select your options!",
            choices: ["Attack", "Increase Health", "Run for Life..."]
        }
    ]);
    let { options } = startMatch;
    // Conditions
    if (options === "Attack")
        attackFun();
    if (options === "Increase Health")
        increaseHealthFun();
    if (options === "Run for Life...")
        runForLifeFun();
    // AttackFun starts
    function attackFun() {
        // Generate random number 0 and 1
        let number = Math.floor(Math.random() * 2);
        // When random number is equal to 0, decrease the fuel of my Player!
        if (number === 0) {
            myPlayer.fuelDecrease();
            console.log(`${myPlayer.name}'s fuel is ${chalk.bold.red(myPlayer.fuel)}`);
            console.log(`${myOpponent.name}'s fuel is ${chalk.bold.green(myOpponent.fuel)}\n`);
            if (myPlayer.fuel === 0) {
                console.log(`${chalk.bold.red(myPlayer.name)} lost! Better luck next time\n`);
                process.exit();
            }
        }
        // When random number is equal to 1, decrease the fuel of opponent!
        if (number === 1) {
            myOpponent.fuelDecrease();
            console.log(`${myPlayer.name}'s fuel is ${chalk.bold.green(myPlayer.fuel)}`);
            console.log(`${myOpponent.name}'s fuel is ${chalk.bold.red(myOpponent.fuel)}\n`);
            if (myOpponent.fuel === 0) {
                console.log(`Congratulations ${chalk.bold.green(myPlayer.name)}! You won the Game.\n`);
                process.exit();
            }
        }
    }
    // AttackFun ends
    // IncreaseHealthFun starts
    function increaseHealthFun() {
        myPlayer.fuelIncrease();
        console.log(`${myPlayer.name}'s fuel is increased to ${chalk.bold.green(myPlayer.fuel)}`);
    }
    // IncreaseHealthFun ends
    // RunForLifeFun starts
    function runForLifeFun() {
        console.log(`${chalk.bold.red(myPlayer.name)} Lost! Better luck next time.`);
        process.exit();
    }
    // RunForLifeFun ends
}
// While loop ends
