import React from "react";
import "./Spinner.scss";

const Spinner = ({ loading }) => {
  return <div className={`spinner ${loading ? "show" : "hide"}`} />;
};
export default Spinner;
