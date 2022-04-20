import React from "react";
import { Container, Row } from "react-bootstrap";
import InvalidInput from "./InvalidInput";

export const TextInput = ({
  title,
  setTextFromParent,
  invalidInputText,
  isValidText,
  size = 50,
  defaultValue = "",
}) => {
  return (
    <Container>
      <Row>
        <h4>{title}</h4>
      </Row>
      <Row>
        <input
          size={size}
          type="text"
          title={invalidInputText}
          onChange={(e) => setTextFromParent(e.target.value)}
          defaultValue={defaultValue}
        ></input>
        <InvalidInput invalidInputText={isValidText ? "" : invalidInputText} />
      </Row>
    </Container>
  );
};

export default TextInput;
