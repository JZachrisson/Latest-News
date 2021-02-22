import './App.css';
import React from 'react';
import axios from 'axios';

import { List, InputWithLabel, SearchForm } from './components';
import useSemiPersistentState from './hooks/useSemiPersistentState';
import storiesReducer from './reducers/storiesReducer';

const API_ENDPOINT = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=f9e7a9eb35ed4702afcfb89b68190ff1`;

function App() {
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'Tesla');
  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const [url, setUrl] = React.useState(
    `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=f9e7a9eb35ed4702afcfb89b68190ff1`
  );

  const handleFetchStories = React.useCallback(async () => {
    if (!searchTerm) return;
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const result = await axios.get(url);
      console.log('RESULT', result);
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.articles,
      });
    } catch {
      dispatchStories({ TYPE: 'STORIES_FETCH_FAILURE' });
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    setUrl(
      `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=f9e7a9eb35ed4702afcfb89b68190ff1`
    );

    event.preventDefault();
  };

  return (
    <div className="App">
      <h1>Latest news of the World.</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSearchSubmit={handleSearchSubmit}
      />
      <hr />

      {stories.isError && 'Something went wrong.'}

      {stories.isLoading ? <p>Loading... </p> : <List list={stories.data} />}
    </div>
  );
}

export default App;
