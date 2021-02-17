import './App.css';
import React from 'react';
import { List, InputWithLabel } from './components';
import useSemiPersistentState from './hooks/useSemiPersistentState';

function App() {
  const initialStories = [
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

  const getAsyncStories = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
    );

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'Tesla');
  const [stories, setStories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    getAsyncStories()
      .then((result) => {
        setStories(result.data.stories);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="App">
      <h1>Latest news of the World.</h1>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <hr />

      {isError && 'Error fetchin data.'}

      {isLoading ? <p>Loading... </p> : <List list={searchedStories} />}
    </div>
  );
}

export default App;
