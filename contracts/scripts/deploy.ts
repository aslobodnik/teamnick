import hre from 'hardhat'

async function main() {
  const contractName = 'Registry'
  const args = []

  const contract = await hre.viem.deployContract(contractName, args)

  console.log(`${contractName} deployed to ${contract.address}`)

  try {
    // Wait 10 seconds for Etherscan to index the contract
    await new Promise((resolve) => setTimeout(resolve, 10_000))

    await hre.run('verify:verify', {
      address: contract.address,
      constructorArguments: args,
    })
  } catch (error) {
    console.error(error)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
