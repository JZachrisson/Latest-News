import './App.css';
import React from 'react';
import { List } from './components';

function App() {
  const list = [
    {
      author: 'Jon Fingas',
      title: 'Tesla buys $1.5 in Bitcoin, will soon accept it as payment',
      url:
        'https://www.endgadget.com/tesla-to-take-bitcoin-payments-140109988.html',
      publishedAt: '2021-02-08',
    },
    {
      author: 'Gregory Barber',
      title: 'Would you trade a Bitcoin for a Tesla?',
      url: 'https://www.wired.com/story/would-you-trade-bitcoin-tesla',
      publishedAt: '2021-02-09',
    },
    {
      author: 'Manish Singh',
      title:
        'Jack Dorsey and Jay Z invest $23.6 million to fund Bitcoin development',
      url:
        'http://techcrunch.com/2021/02/12/jack-dorsey-and-jay-z-invest-23-6-million-to-fund-bitcoin-development',
      publishedAt: '2021-02-12',
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      <h1>Latest news of the World.</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />

      <hr />
      <List list={list} />
      <p>{searchTerm}</p>
    </div>
  );
}

export default App;
