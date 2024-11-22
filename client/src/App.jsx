import React, { useState, useEffect } from "react";
import Leaderboard from "./components/Leaderboard";
import SymbolSelector from "./components/SymbolSelector";
import "./App.css";

const App = () => {
    const [symbol, setSymbol] = useState("");
    const [symbols, setSymbols] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSymbols();
    }, []);

    const fetchSymbols = async () => {
        setLoading(true); 
        try {
            // console.log("INSIDE FETCH SYMBOLS"); // check
            
            const response = await fetch("http://localhost:8000/allsymbols");
            const data = await response.json();
            console.log("Inside data : ", data); // check

            if(!data) {
                console.log("Error fetching all symbols at Frontend Side");
                return;
            }
            
            setSymbols(data);
            // console.log("INside symbols : ", symbols); // check

            setSymbol(data[0]);  // setting default value of symbol so the UI should not look empty
            
        } catch (error) {
            console.error("Error fetching symbols:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        // Display a loading spinner or message while data is being fetched
        return <div className="loading-spinner">Loading...</div>;
    }

    return (
        <div className="App">
            <h1>Trading Leaderboard</h1>
            <SymbolSelector symbols={symbols} setSymbol={setSymbol} />
            {symbol && <Leaderboard symbol={symbol} />}
        </div>
    );
};

export default App;
