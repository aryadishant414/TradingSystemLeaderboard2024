import axios from "axios";


// here we are creating a cached trade data for temporary storing the trade data
let cachedTradeData = null;
let lastFetchedTime = 0;



// Function to fetch trade data from the external API
const fetchTradeData = async () => {
    try {
        const response = await axios.get('https://api.defx.com/v1/open/c/markets?type=perps');
        return response.data; // Returning the fetched data to be used by other functions
    } catch (error) {
        console.error('Error fetching trade data:', error.message);
        return null; // Return null in case of an error, so we can handle it in calling functions
    }
}

const fetchCachedTradeData = async () => {
    const ONE_MINUTE = 60 * 1000;
    const now = Date.now();

    if (!cachedTradeData || now - lastFetchedTime > ONE_MINUTE) {
        cachedTradeData = await fetchTradeData();
        lastFetchedTime = now;
    }
    return cachedTradeData;
}

export { fetchCachedTradeData };