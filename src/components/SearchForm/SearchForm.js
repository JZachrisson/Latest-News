import React from 'react';
import { InputWithLabel } from '../../components';

const SearchForm = ({ searchTerm, onSearchInput, onSearchSearchSubmit }) => {
  return (
    <div>
      <form onSubmit={onSearchSearchSubmit}>
        <InputWithLabel
          id="search"
          value={searchTerm}
          isFocused
          onInputChange={onSearchInput}
        >
          <strong>Search:</strong>
        </InputWithLabel>

        <button type="submit" disabled={!searchTerm}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
