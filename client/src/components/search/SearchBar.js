import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = props => {
  const [params, setParams] = useState("");

  const handleParamsInput = e => {
    setParams(e.target.value);
  };

  return (
    <div>
      <input type="text" value={params} onChange={handleParamsInput} />
      <Link to={`/search/${params}`}
        // to={{
        //   pathname: "/search",
        //   state: {
        //     params: params
        //   }
        // }}
      >Search!</Link>
    </div>
  );
};

export default SearchBar;
