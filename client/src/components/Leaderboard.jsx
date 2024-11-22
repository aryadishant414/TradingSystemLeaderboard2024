import React, { useState, useEffect } from "react";

const Leaderboard = ({ symbol }) => {
    console.log("INSIDE SYMBOL IN leaderboard is : ", symbol);
    
    const [leaderboard, setLeaderboard] = useState(null);

    useEffect(() => {
        fetchLeaderboard();
        const interval = setInterval(fetchLeaderboard, 60000); // Update every minute
        return () => clearInterval(interval); // Cleanup on component unmount
    }, [symbol]);

    const fetchLeaderboard = async () => {
        try {
            const response = await fetch(`http://localhost:8000/leaderboard?symbol=${symbol}`);
            const data = await response.json(); // converting JSON response(send by backend) into JavaScript Object
            console.log("Inside Leaderboard data : ", data);
            setLeaderboard(data);
            
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        }
    };

    if (!leaderboard) return <p>Loading leaderboard...</p>;

    return (
        <div>
            <h2>Leaderboard for {symbol}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Trader ID</th>
                        <th>Volume</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.leaderboard.map((trader, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{trader.traderId}</td>
                            <td>{trader.volume}</td>
                            <td>{trader.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
