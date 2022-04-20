import React from "react";

const style = { color: "red" };

export const InvalidInput = ({ invalidInputText }) => {
  return <div style={style}>{invalidInputText}</div>;
};

export default InvalidInput;
