import React from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import NewCharacterForm from "../../components/NewCharacterForm/NewCharacterForm";

export const EditCharacter = () => {
  const { Id: docId } = useParams();

  return (
    <div className="App">
      <div className="content">
        <NewCharacterForm docId={docId} forEdit />
      </div>
    </div>
  );
};

export default EditCharacter;
