# citizen-nft-snapshot

Simple script to snapshot Citizen NFT holders

## Setup

### Node

1.  Install `nvm` ([Node Version Manager](https://github.com/nvm-sh/nvm))
2.  `cd` to the project directory and execute the following:

    ```
    nvm install
    nvm use
    npm install
    ```

### Moralis API

1. Create Moralis account ([Moralis](https://moralis.io/))
2. Create new server ([Create Server](https://admin.moralis.io/servers))
3. Copy server URL and Application ID to .env

   ```
   SERVER_URL="xxx"
   APP_ID="xxx"
   ```

### Create Snapshot

```
npm run snapshot
```

Outputs `snapshot.json` & `total_mints.json` in root directory

### Prettier

This project uses [Prettier](https://prettier.io/), so please run it before checking in:

```
npm run pretty
```

See `.prettierrc` for settings.

Some IDEs and editors have plugins for running Prettier.

### Linting

This project uses [ESLint](https://eslint.org/). Check linting before checking in:

```
npm run lint
```
