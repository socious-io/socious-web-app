import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers"; 

task("deploy", "Deploys the indicated contract name")
  .addParam("name", "Name of the contract to be deployed")
  .addParam("params", "In case additional parameters for constructor are needed")
  .setAction(async (taskArgs, hre) => {
    const contractFactory = await hre.ethers.getContractFactory(taskArgs);
    let contract;
    try {
      if (taskArgs.params) {
        contract = await contractFactory.deploy(taskArgs.name, ...taskArgs.params);
      }
      else {
        contract = await contractFactory.deploy(taskArgs.name);
      }
      console.log(`Contract deployed to address: ${contract.address}`)
    } catch (e) {
      alert(e)
    }
});
