import { useEffect, useState } from "react";
import axios from "axios";
import './App.css'

function App() {
  const [search, setSearch] = useState("")
  const [currency, setCurrency] = useState([])

  useEffect(()=> {
    axios.get('https://openapiv1.coinstats.app/coins', {
      headers: {'X-API-KEY': '33CrCQIOzywwsC2mxwsRziINcAYJRkzhF660TbYuKa0='}
    }).then(res => setCurrency(res.data.result))
    .catch(err => console.log(err))
  }, [])
  return (
    <div className="App">
      <h2>Crypto Currency App</h2>
      <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Market Cap</th>
            <th>Price</th>
            <th>Available Supply</th>
            <th>Volume (24hr)</th>
          </tr>
        </thead>
        <tbody>
          {currency.filter((val) => {
            return val.name.toLowerCase().includes(search.toLowerCase())
          }).map((val) => {
            return <tr>
              <td className="rank">{val.rank}</td>
              <td className="logo">
                <a href={val.websiteUrl}>
                  <img src={val.icon} alt="" />
                </a>
                <p>{val.name}</p>
              </td>
              <td className="symbol">
                {val.symbol}
              </td>
              <td>${val.marketCap}</td>
              <td>{val.price.toFixed(2)}</td>
              <td>{val.availableSupply}</td>
              <td>{val.volume.toFixed(1)}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App;