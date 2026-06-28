import hre from "hardhat";

async function main() {
  console.log("Mulai deploy TodoList Contract...");

  const TodoList = await hre.ethers.getContractFactory("TodoList");
  const todoList = await TodoList.deploy();

  await todoList.waitForDeployment();
  const address = await todoList.getAddress();

  console.log(`\n✅ TodoList berhasil di-deploy!`);
  console.log(`📌 Contract Address: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});