import React, { useState } from "react";
import { withRouter } from "react-router-dom";

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
    <form onSubmit={submitSearch}>
      <select defaultValue={searchType} onChange={selectSearchType}>
        <option value="all">Match all</option>
        <option value="any">Match any</option>
      </select>
      <input
        type="text"
        value={params}
        onChange={handleParamsInput}
        placeholder="Search by ingredients. Separate with a ','"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default withRouter(SearchBar);
