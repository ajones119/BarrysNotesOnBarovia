import { Button, ListGroup } from "react-bootstrap";
import { openNewTab } from "../../service/SharedFunctions";

const STYLE = {
  backgroundColor: "blue",
  color: "white",
};

export const ToolsListEntry = ({ tool }) => {
  return (
    <div>
      <ListGroup.Item>
        <Button
          size="block"
          variant="outline-dark"
          onClick={() => {
            openNewTab(tool.link);
          }}
        >
          <h2>{tool.name}</h2>
        </Button>
      </ListGroup.Item>
    </div>
  );
};

export default ToolsListEntry;
