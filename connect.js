// Load SecretJS components
const { CosmWasmClient } = require('secretjs');

// Load environment variables
require('dotenv').config();

const main = async () => {
  if (!process.argv || process.argv.length != 3) {
    console.log("wrong command or missing apiKey")
    return
  }
  const fs = require("fs")
  const apiKey = process.argv[2]
  fs.writeFileSync("./.env", `SECRET_REST_URL='https://secret-holodeck-2--lcd--full.datahub.figment.io/apikey/${apiKey}/'\n`)
  fs.appendFileSync("./.env", `SECRET_CHAIN_ID=holodeck-2\n`)
  // Create connection to DataHub Secret Network node
  const client = new CosmWasmClient(process.env.SECRET_REST_URL);

  // Query chain ID
  const chainId = await client.getChainId()
    .catch((err) => { throw new Error(`Could not get chain id: ${err}`); });

  // Query chain height
  const height = await client.getHeight()
    .catch((err) => { throw new Error(`Could not get block height: ${err}`); });

  console.log('ChainId:', chainId);
  console.log('Block height:', height);

  console.log('Successfully connected to Secret Network');
};

main().catch((err) => {
  console.error(err);
});
