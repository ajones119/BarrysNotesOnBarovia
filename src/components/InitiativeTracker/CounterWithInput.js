import { Col, Container, Row, Button } from "react-bootstrap";
import { GiDeathSkull, GiBiceps } from "react-icons/gi";

const style = { margin: "3px" };

export const CounterWithInput = ({ value, size = 10, onChange, index }) => {
  return (
    <div>
      <Container>
        <Button variant="danger">
          <GiDeathSkull />
        </Button>
        <input
          size={size}
          style={style}
          onChange={onChange}
          defaultValue={value}
        />
        <Button variant="success">
          <GiBiceps />
        </Button>
      </Container>
    </div>
  );
};

export default CounterWithInput;
