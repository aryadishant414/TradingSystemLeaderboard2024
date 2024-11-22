// generating mock data of all traders
const mockVolumeByTrader = (symbol) => {
    const tradersVolume = [];
    const numberOfTraders = Math.floor(Math.random() * 100) + 5; // Here we Randomly choose number of traders between (5-104)

    for (let i = 0; i < numberOfTraders; i++) {
        tradersVolume.push({
            traderId: `Trader_${i + 1}`,
            volume: (Math.random() * 1000).toFixed(2), // Here we Generate a random volume up to 1000
            timestamp: new Date().toLocaleString()
        });
    }
    // console.log("Data inside tradersVolume is : ", tradersVolume); // check
    return { symbol, tradersVolume };
}

export { mockVolumeByTrader };