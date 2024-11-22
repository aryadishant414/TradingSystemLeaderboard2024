import React from "react";

const SymbolSelector = ({ symbols, setSymbol }) => {
    return (
        <div>
            <label>Select Symbol: </label>
            <select onChange={(e) => setSymbol(e.target.value)}>
                <option value="">Choose a symbol</option>
                {symbols.map((symbol, index) => (
                    <option key={index} value={symbol}>
                        {symbol}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SymbolSelector;
