import React from "react";
import { Container, Row } from "react-bootstrap";
import InvalidInput from "./InvalidInput";

const style = { whiteSpace: "pre-line" };

export const TextArea = ({
  title,
  setTextFromParent,
  rows,
  cols,
  invalidInputText,
  isValidText,
  defaultValue = "",
  value = "",
}) => {
  return (
    <Container>
      <Row>
        <h4>{title}</h4>
      </Row>
      <Row>
        <textarea
          style={style}
          cols={cols}
          rows={rows}
          type="text"
          title={invalidInputText}
          onChange={(e) => setTextFromParent(e.target.value)}
          defaultValue={defaultValue}
          value={value}
        />
        <InvalidInput invalidInputText={isValidText ? "" : invalidInputText} />
      </Row>
    </Container>
  );
};

export default TextArea;
