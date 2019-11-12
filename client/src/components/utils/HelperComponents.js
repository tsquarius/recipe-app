import React from "react";

export const Loading = props => {
  return (
    <div className="main-content-row">
      <p>Loading...</p>
    </div>
  );
};

export const ErrorMsg = props => {
  return (
    <div className="main-content-row">
      <p>Unexpected error has occurred</p>
    </div>
  );
};
