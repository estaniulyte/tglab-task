import React from 'react';
import styled from 'styled-components';

const SearchIcon = styled.svg`
  width: 16px;
  height: 16px;
  fill: white;
  margin-right: 8px;
`;

const ClearIcon = styled.svg`
  width: 16px;
  height: 16px;
  fill: red;
  margin-left: 8px;

  &:hover {
    opacity: 0.7;
  }
`;

const Search = styled.form`
  border: 1px solid white;
  width: 50%;
  border-radius: 20px;
  margin: 20px auto;
  padding: 4px 15px;
  display: flex;
  align-items: center;

  @media (max-width: 1200px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 90%;
  }

  input {
    all: unset;
    width: 100%;
    text-align: left;
    margin-left: 10px;
  }

  button {
    all: unset;
    display: flex;
    justify-content: center;
  }

  button:hover {
    color: white;
    cursor: pointer;
  }
`;

interface SearchFormProps {
  search: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClearSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  search,
  onSearchChange,
  onSearchSubmit,
  onClearSearch,
}) => {
  return (
    <Search onSubmit={onSearchSubmit}>
      <SearchIcon viewBox='0 0 24 24'>
        <path d='M10 2a8 8 0 016.32 12.9l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z' />
      </SearchIcon>
      <input
        type='text'
        value={search}
        onChange={onSearchChange}
        placeholder='Search by name or description...'
      />

      <button type='button' onClick={onClearSearch}>
        <ClearIcon viewBox='0 0 24 24'>
          <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
        </ClearIcon>
      </button>
    </Search>
  );
};

export default SearchForm;
