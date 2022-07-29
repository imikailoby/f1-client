# F1-client

F1 Seasons statistic powered by [The Ergast Developer API](http://ergast.com/mrd).

## Requirements

- node >= 16.5.1

- yarn >= 3.21.1

## Installation

1. Clone the repository and go into it's folder;
2. Install packages: `yarn`;
3. Run `yarn postinstall` to install Pre-commit Hooks;
4. Create **.env** (already in `.gitignore`) and paste necessary variables:

```zsh
REACT_APP_API_URL="Paste 'Ergast Developer API' url (with provided series). 'http://ergast.com/api/f1' by default"
REACT_APP_FROM_F1_SEASON_YEAR="Paste season year, from the beginning of which statistic required. '2005' by default"
```

## Commands

#### Start application (3000 port):

```zsh
yarn start
```

#### Build application for different environments:

```zsh
yarn build:staging
yarn build:production
```

#### Run tests:

```zsh
yarn test
```

> You can also run `yarn test:coverage` to see current coverage level.

#### Run Prettier:

```zsh
yarn format
```

#### Run linters:

```zsh
yarn lint:eslint
yarn lint:stylelint
```
