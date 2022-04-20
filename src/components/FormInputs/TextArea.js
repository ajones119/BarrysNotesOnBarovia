import React from "react";
import { Container, Row } from "react-bootstrap";
import InvalidInput from "./InvalidInput";

export const TextArea = ({
  title,
  setTextFromParent,
  rows,
  cols,
  invalidInputText,
  isValidText,
  defaultValue = "",
}) => {
  return (
    <Container>
      <Row>
        <h4>{title}</h4>
      </Row>
      <Row>
        <textarea
          cols={cols}
          rows={rows}
          type="text"
          title={invalidInputText}
          onChange={(e) => setTextFromParent(e.target.value)}
          defaultValue={defaultValue}
        />
        <InvalidInput invalidInputText={isValidText ? "" : invalidInputText} />
      </Row>
    </Container>
  );
};

export default TextArea;
