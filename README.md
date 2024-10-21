Buzzkill Hatchlings DApp

This is a Next.js project bootstrapped with create-next-app.

Getting Started

1. Install Dependencies

First, install all project dependencies by running:

npm install

# or

yarn install

# or

pnpm install

# or

bun install

2. Environment Variables

Create a .env file in the root of the project with the following environment variables (if not already present):

NEXT_PUBLIC_HATCHLINGS_ADDRESS=0x603a23682ae999c5A33BaC9a15216521c9f32Cd8

3. Run the Development Server

To run the development server, use:

npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev

Once the server is running, open http://localhost:3000 in your browser to see the application.

4. Generate WAGMI Hooks

If you've made changes to your smart contract's ABI or need to update the generated hooks, follow these steps:

1. Ensure that your ABI files are up-to-date. Get the latest ABIs from your smart contract repo and paste them into src/app/libs/abi.

2. Run the WAGMI CLI tool to regenerate the hooks:

npx wagmi generate

This will use the configuration in wagmi.config.ts to generate the hooks for your smart contract(s) and place them in src/hooks/BuzzkillHatchlingsNFT.ts.

5. Update ABI Files

To update the ABI files used in the project:

1. Navigate to your smart contract repository.
2. Copy the ABI JSON file from the build folder (usually after compiling with Hardhat, Foundry, or Truffle).
3. Paste the ABI JSON into src/app/libs/abi/.
4. Re-run the wagmi-cli tool as described above to regenerate the hooks.

Learn More

To learn more about Next.js, take a look at the following resources:

Next.js Documentation - Learn about Next.js features and API.
Learn Next.js - An interactive Next.js tutorial.

You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out the Next.js deployment documentation for more details.
