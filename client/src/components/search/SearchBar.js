import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';

const SearchContainer = styled.form`
  display: flex;
  flex-direction: row;
`;

const Input = styled.input`
  margin: 0 5px;
  width: 100%
`;

const SearchBar = props => {
  const [params, setParams] = useState("");
  const [searchType, setSearchType] = useState("any");

  const handleParamsInput = e => {
    setParams(e.target.value);
  };

  const selectSearchType = e => {
    setSearchType(e.target.value);
  };

  const submitSearch = e => {
    e.preventDefault();
    props.history.push(`/search?${params}#${searchType}`);
  };

  return (
    <SearchContainer onSubmit={submitSearch}>
      <select defaultValue={searchType} onChange={selectSearchType}>
        <option value="all">Match all</option>
        <option value="any">Match any</option>
      </select>
      <Input
        type="text"
        title="Search ingredients, separate with comma"
        value={params}
        onChange={handleParamsInput}
        placeholder="Search by ingredients. Separate with a ','"
      />
      <button type="submit">
        <FontAwesomeIcon
          title="search for recipes"
          icon="search"
        />
      </button>
    </SearchContainer>
  );
};

export default withRouter(SearchBar);
