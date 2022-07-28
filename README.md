# F1-client

## Requirements

* node >= 16.5.1

* yarn >= 3.21.1

## Installation

1. Clone the repository and go into it's folder;
2. Install packages: `yarn`;
3. Create **.env** (already in `.gitignore`) and paste necessary variables:

```zsh
REACT_APP_API_URL="Paste 'Ergast Developer API' url (with provided series). 'http://ergast.com/api/f1' by default"
REACT_APP_FROM_F1_SEASON_YEAR="Paste season year, from the beginning of which statistic required. '2005' by default"
```

## Commands
#### Start server:

```zsh
yarn start
```

#### Build application for staging environment:
```zsh
yarn build:staging
```

#### Build application for production environment:
```zsh
yarn build:production
```

#### Run linters:

```zsh
yarn lint
```

#### Run tests:

```zsh
yarn test
```
