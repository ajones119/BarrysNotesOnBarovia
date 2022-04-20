import { Col, Container, Row } from "react-bootstrap";
import CharactersListEntry from "./CharactersListEntry";

const containerStyle = { marginTop: "20px" };

export const CharactersList = ({ characters = [] }) => {
  return (
    <div>
      <Container style={containerStyle}>
        <Row xs={1} md={2} className="mt-40">
          {characters.map((character) => (
            <Col>
              <CharactersListEntry character={character} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CharactersList;
