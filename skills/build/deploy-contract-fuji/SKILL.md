---
name: deploy-contract-fuji
description: Compile, test, and deploy a Solidity contract to the Avalanche Fuji testnet C-Chain with Hardhat 3 and Hardhat Ignition. Keeps the deployer key in the Hardhat keystore.
journey: build
network: fuji
status: draft
owner: "@Radeonares32"
version: 0.1.0
requires: []
tools: []
tags: [fuji, hardhat, ignition, deploy, solidity, c-chain]
---

# Deploy a contract to Fuji

## When to use

Use this skill when the reader has a Solidity contract and wants it on the Fuji testnet C-Chain.

Do not use it for mainnet. Do not use it to verify a contract on a block explorer. Explorer verification for Fuji is `unverified` here and needs its own skill.

## Prerequisites

- Node.js 22.13.0 or newer. Source: [Hardhat getting started](https://hardhat.org/docs/getting-started).
- A testnet-only account with Fuji AVAX. Never use an account that holds mainnet funds.
- The Fuji network facts used below: chain ID `43113`, RPC URL `https://api.avax-test.network/ext/bc/C/rpc`. Source: [Fuji testnet reference](https://build.avax.network/docs/quick-start/networks/fuji-testnet).

## Steps

1. Create a Hardhat 3 project with the sample contract.

   ```bash
   npx hardhat --init --template node-test-runner-viem
   ```

   Expected result: the folder contains `contracts/Counter.sol`, `ignition/modules/Counter.ts`, and `hardhat.config.ts`.

2. Add the Fuji network to `hardhat.config.ts`, inside `networks`. Remove the `sepolia` entry if you do not need it.

   ```ts
   fuji: {
     type: "http",
     chainType: "l1",
     url: "https://api.avax-test.network/ext/bc/C/rpc",
     chainId: 43113,
     accounts: [configVariable("FUJI_PRIVATE_KEY")],
   },
   ```

   Expected result: the file keeps the `configVariable` import from `hardhat/config`. The config holds no key.

3. Compile the contract.

   ```bash
   npx hardhat compile
   ```

   Expected result: `Compiled 2 Solidity files`.

4. Run the tests.

   ```bash
   npx hardhat test
   ```

   Expected result: `5 passing`. Do not continue if a test fails.

5. Rehearse the deployment on the built-in simulated network. This costs nothing.

   ```bash
   npx hardhat ignition deploy ignition/modules/Counter.ts
   ```

   Expected result: `successfully deployed` and one `Counter` address.

6. Store the deployer key in the Hardhat keystore. Run the command yourself in your own terminal. Paste the key at the prompt. Do not paste it into a chat, a file, or a shell command.

   ```bash
   npx hardhat keystore set FUJI_PRIVATE_KEY
   ```

   Expected result: Hardhat asks for a keystore password, then for the value.

7. **Confirm:** this step sends a transaction to the Fuji testnet (chain ID 43113) and spends testnet AVAX for gas. State the network and the contract name to the reader and wait for a yes. Then run:

   ```bash
   npx hardhat ignition deploy ignition/modules/Counter.ts --network fuji
   ```

   Expected result: Hardhat asks for the keystore password and for a deployment confirmation. After you confirm, it prints `successfully deployed` and the contract address. On 2026-10-07 we checked that the Fuji RPC accepts the compiled `Counter` bytecode: `eth_estimateGas` returned about 166,000 gas. A full funded deploy is `unverified` in this draft.

## Verification

Replace `CONTRACT_ADDRESS` with the address from step 7.

```bash
curl -s -X POST -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","id":1,"method":"eth_getCode","params":["CONTRACT_ADDRESS","latest"]}' https://api.avax-test.network/ext/bc/C/rpc
```

Expected result: a `result` value longer than `0x`. An empty account returns `0x`.

## Common failures

| Symptom | Cause | Fix |
| --- | --- | --- |
| `Error HHE7: Configuration Variable "FUJI_PRIVATE_KEY" not found` | The key is not in the keystore | Run step 6 |
| Deploy fails with an insufficient funds error | The account has no Fuji AVAX | Fund the account. Use a separate skill for funding |
| Node.js version error | Node.js is older than 22.13.0 | Install a newer Node.js |
| Deploy hangs or times out | The RPC endpoint is unreachable | Run the `eth_chainId` check against the RPC URL. Expect `0xa869` |
