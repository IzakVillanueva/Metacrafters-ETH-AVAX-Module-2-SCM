# Metacrafters-ETH-AVAX-Module-2-SCM

This is a simple static website that uses React and Solidity to demonstrate how to connect your metamask wallet to a website to deposit and withdraw coins.

## Description

This is a Smart Contract Management in Solidity with React as a front end for Metacrafters Assessment Module 2. It uses a preloaded account to test the functions deposit and withdraw. The website will act as an ATM/Bank and users will be able to store their coins. The user can input any amount that they want to store or withdraw from the bank and can also see their current balance.

## Getting Started

### Installing

* Clone this repository and open it on Gitpod or in your local machine.

### Executing program

After cloning the github, you will want to do the following to get the code running on your computer.

* Inside the project directory, in the terminal type: npm i
* Open two additional terminals in your VS code
* In the second terminal type: npx hardhat node
* In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
* Back in the first terminal, type npm run dev to launch the front-end.
* After this, the project will be running on your localhost. Typically at http://localhost:3000/
* The user may go to http://localhost:3000/ to be able to see their changes to the frontend. The website in this link will be the main face of the Bank website.
* Go to the second terminal, when you ran ```npx hardhat node```, you will be given 20 different accounts. Use the first account and link it with you metamask wallet using the given private key.
* Once you linked the account given to your metamask wallet, you may now be able to use the coins inside to see how the bank works.
* Input the desired number and click on Deposit or Withdraw to see the changes to your current balance.

## Authors

Izak

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
