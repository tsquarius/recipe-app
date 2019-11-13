import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';

const SearchContainer = styled.form`
  display: flex;
  flex-direction: row;
  span {
    font-size: 12px;
  }
  @media (min-width: 700px) {
    font-size: inherit;
  }
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
        placeholder="Search by ingredients. Separate with a comma"
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


//   const [sortOn, setSortOn] = useState("");
//   const [sortDir, setSortDir] = useState(-1);

//   const handleSortParamChange = e => {
//     setSortOn(e.target.value);
//   };

//   const handleSortDirChange = e => {
//     setSortDir(e.target.value);
//   };


//       <span>Sort by:</span>
//       <Select defaultValue={sortOn} onChange={handleSortParamChange}>
//         <option value="">Default</option>
//         <option value="viewCount">Views</option>
//         <option value="averageRate">Rating</option>
//       </Select>

//       <Select defaultValue={sortDir} onChange={handleSortDirChange}>
//         <option value={-1}>Desc</option>
//         <option value={1}>Asc</option>
//       </Select>
      

//       const Select = styled.select`
//   margin-right: 2px;
//   font-size: 12px;
//   width: 20%;
//   @media (min-width: 700px) {
//     font-size: inherit;
//   }
// `;