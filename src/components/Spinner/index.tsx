import React from "react";
import css from "./Spinner.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = () => {
    return (
        <div className={css.spinner}>
            <FontAwesomeIcon icon={faSpinner} />
        </div>
    );
}

export default Spinner;