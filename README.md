# Trading System Leaderboard

This is a simple trading system leaderboard application where users can select different market symbols (e.g., trading pairs), and the application will display a leaderboard of top traders based on their trading volume for that specific symbol.

The project is divided into two main parts:

1. **Client**: The frontend built with React.js.
2. **Server**: The backend built with Express.js.

## Table of Contents
- [Client Overview](#client-overview)
- [Server Overview](#server-overview)
- [Project Setup](#project-setup)
- [Running the Project](#running-the-project)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Client Overview

The client is a **React.js** application that fetches the available market symbols and the leaderboard for a selected symbol.

### Key Features:
- **Symbol Selector**: Allows users to select a market symbol (e.g., BTC/USD, ETH/USD) from a list.
- **Leaderboard**: Displays a leaderboard showing the top traders based on their trading volume for the selected symbol.
- **Auto-Refresh**: The leaderboard refreshes every minute to display the most current data.

### Main Components:
1. **App.jsx**: The main entry point of the React app, which manages state (symbol selection, loading state) and renders the components.
2. **SymbolSelector.jsx**: A dropdown component that allows users to select a symbol.
3. **Leaderboard.jsx**: A table displaying the leaderboard for the selected symbol.
4. **Services**: Manages data fetching, such as fetching available symbols and leaderboard data.
5. **Utils**: Contains helper functions, like generating mock data for the leaderboard.

## Server Overview

The server is a **Node.js** backend built using **Express.js**. It handles requests from the client to fetch the available market symbols and generate the leaderboard data for the selected symbol.

### Key Endpoints:
1. **GET /allsymbols**: Returns all available symbols (markets) from the cached trade data.
2. **GET /leaderboard**: Returns the leaderboard for a specified symbol, based on mock data generated for top traders and their trading volumes.

### Backend Logic:
- **Trade Data**: The server fetches trade data from an external API (`https://api.defx.com/v1/open/c/markets?type=perps`) and caches it for a minute to reduce load.
- **Leaderboard Generation**: Generates mock leaderboard data, sorting traders by volume for the selected symbol.

## Project Setup

### Prerequisites
Before running the project, make sure you have the following installed:
- Node.js (for both client and server)
- npm (or yarn) for managing dependencies

### Setting Up the Server
1. Navigate to the `server` folder.
2. Run `npm install` to install the required dependencies.
3. Start the server by running the following command:
   ```bash
   npm run server

### Setting Up the Client
1. Navigate to the `client` folder.
2. Run `npm install` to install the required dependencies.
3. Start the server by running the following command:
   ```bash
   npm run dev