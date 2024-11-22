import { fetchCachedTradeData } from "../services/tradeService.js";
import { mockVolumeByTrader } from "../utils/dataMocker.js";



export const getAllSymbols = async (req, res) => {
    
    try {
        // console.log("Inside getALLSymbols"); //check
        
        const tradeData = await fetchCachedTradeData();
        console.log('Fetched trade data:', tradeData);

        if (!tradeData || !tradeData.data || tradeData.data.length === 0) {
            return res.status(500).json({ error: 'Error fetching trade data' });
        }

        // Creating an array to hold the symbols
        const symbols = [];

        // Here we are Looping through the response data
        tradeData.data.forEach(item => {
        
        // pushing market symbols
        symbols.push(item.market);  

        });

        // Remove duplicates by converting to a Set and back to an array
        const uniqueSymbols = [...new Set(symbols)];

        // just to check the data inside symbol
        console.log(uniqueSymbols);

        res.status(200).json(uniqueSymbols);
        
    } catch (error) {
        console.error('Error fetching trade data:', error.message);
    }
}



const generateLeaderboard = (symbol) => {
    const symbolData = mockVolumeByTrader(symbol); // here we are generating mock data of all traders of specified symbol 
    
    if (!symbolData || !symbolData.tradersVolume) {
        console.error('Failed to generate mock data for symbol:', symbol);
        return { symbol, leaderboard: [] }; // We are Returning an empty leaderboard if data is missing
    }


    // Here we are Sorting traders by volume and get top 10
    const topTraders = symbolData.tradersVolume
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 10);
 
    return {
        symbol: symbolData.symbol,
        leaderboard: topTraders
    };
 }


let updateInterval; // Here we are Declaring a variable to hold the interval ID

export const getLeaderboard = (req, res) => {
    try {
        const { symbol } = req.query;
     
        if (!symbol) {
            return res.status(400).json({ error: "Symbol parameter is required." });
        }
    
        // Clearing any existing interval to avoid multiple intervals
        if (updateInterval) {
            clearInterval(updateInterval);
        }
    
        // Starting a new interval to update the leaderboard every minute
        updateInterval = setInterval(() => {
            console.log(`Updating leaderboard for ${symbol}...`);
            const leaderboard = generateLeaderboard(symbol);
            
            console.log(leaderboard); // checking
        }, 60 * 1000); // Updating every minute
        
    
        // this is giving us the current leaderboard data
        const leaderboard = generateLeaderboard(symbol);
        res.status(200).json(leaderboard);

    } catch (error) {
        res.status(500).json({ error: 'Failed to generate leaderboard' });
    }
 };
 

 // we are clearing the interval to avoid any errors or memory leaks
process.on('SIGINT', () => {
    clearInterval(updateInterval);
    console.log('Cleared update interval on server shutdown.');
    process.exit();
});
 
