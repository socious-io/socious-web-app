import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers"; 

task("accounts", "Prints the list of accounts")
    .setAction(async (_, hre) => {
        const accounts = await hre.ethers.getSigners();
        
        for (var account in accounts) {
            console.log(account)
        }
    });