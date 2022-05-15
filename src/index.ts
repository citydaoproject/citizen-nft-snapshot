const Moralis = require('moralis/node');
const { writeFile } = require('fs/promises');
require('dotenv').config();

const CONTRACT_ADDRESS = '0x7eef591a6cc0403b9652e98e88476fe1bf31ddeb';

async function snapshot() {
  await Moralis.start({ serverUrl: process.env.SERVER_URL, appId: process.env.APP_ID });

  let cursor = null;
  let owners = {};
  let mints = {};

  // get all owners
  do {
    const response = await Moralis.Web3API.token.getNFTOwners({
      address: CONTRACT_ADDRESS,
      chain: 'eth',
      limit: 500,
      cursor: cursor,
    });

    console.log(
      `Got page ${response.page} of ${Math.ceil(response.total / response.page_size)}, ${response.total} total`,
    );

    for (const owner of response.result) {
      let tokenType = '';
      let mintQuantity = 0;

      // determine token type and mint quantity
      switch (owner.token_id) {
        case '42':
          tokenType = 'citizenNFTs';
          mintQuantity = 1;
          break;
        case '69':
          tokenType = 'foundingNFTs';
          mintQuantity = 3;
          break;
        case '7':
          tokenType = 'firstNFTs';
          mintQuantity = 10;
          break;
      }

      // build owners object
      owners[owner.owner_of] = owners[owner.owner_of] || {};
      owners[owner.owner_of][tokenType] = owner.amount;

      // build mints object
      const mintAmount = mintQuantity * owner.amount;
      mints[owner.owner_of] = mints[owner.owner_of] + mintAmount || mintAmount;
    }

    // get next page
    cursor = response.cursor;
  } while (cursor != '' && cursor != null);

  console.log('total owners:', Object.keys(owners).length);

  // write owners to file
  try {
    console.log('writing owners to snapshot.json');
    writeFile('snapshot.json', JSON.stringify(owners, null, 2));
    console.log('writing mints to total_mints.json');
    writeFile('total_mints.json', JSON.stringify(mints, null, 2));
  } catch (err) {
    console.error(err);
  }

  console.log('snapshot complete');
}

snapshot();
