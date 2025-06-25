import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState("");

  const selectedCoin = coins.find((item) => item.id === id);
  
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then(response => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        setId(json[0]?.id || "")
      });
  }, []);

  const onCoinSelect = (event) => {
    setId(event.target.value);
  };

  const onChange = (event) => {
    setAmount(event.target.value);
  };

  return <div>
    <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
    {loading ? <strong>Loading...</strong> : (
    <div>
      <select onChange={onCoinSelect} value={id}>
        {coins.map((coin) => <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD</option>)}
      </select>

      <hr />

      <div>
        <label htmlFor="usd">USD($) </label>
        <input id="usd" type="number" placeholder="USD" value={amount} onChange={onChange} />
      </div>

      <div>
        <label htmlFor="coin">{selectedCoin.name} ({selectedCoin.symbol}) </label>
        <input id="coin" type="number" disabled={true} value={selectedCoin.quotes.USD.price > 0 ? (amount / selectedCoin.quotes.USD.price).toFixed(5) : 0} />
      </div>
    </div>
    )}
    
  </div>;
}

export default App;