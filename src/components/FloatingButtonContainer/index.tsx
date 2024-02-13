import React, { ReactNode } from "react";
import css from "./FloatingButtonContainer.module.scss"

type FloatingButtonContainerProps = {
    children: ReactNode
}

const FloatingButtonContainer = ({children}: FloatingButtonContainerProps) => {
    return (
        <div className={css.container}>
            {children}
        </div>
    )
}

export default FloatingButtonContainer;