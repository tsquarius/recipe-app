import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Loading = props => {
  return (
    <div className="main-content-row">
      <FontAwesomeIcon icon="spinner" size="6x" className="fa-spin" />;
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
