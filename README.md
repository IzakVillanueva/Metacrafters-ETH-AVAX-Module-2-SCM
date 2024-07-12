# Metacrafters-ETH-AVAX-Module-2-SCM

This is a simple static website created for the Trusty Tavern which uses blockchain and ETH to purchase liquors.

## Description

![image](https://github.com/user-attachments/assets/9f68fc8e-1af3-4efa-aff6-b4b206799edc)

This is a Smart Contract Management in Solidity called Tavern with React as a front end for Metacrafters Assessment Module 2. It uses a preloaded account to test the functions. The website will act as Tavern and users will be able to deposit using ETH. The user can input any amount that they want to deposit in their tab and can also see their current tab. Users will also be able to purchase different types of liquor with different prices for each. As the user buys liquor, their blood alcohol concentration (BAC) will increase. They will be able to keep track of their BAC as well all throughout their sessions.

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
