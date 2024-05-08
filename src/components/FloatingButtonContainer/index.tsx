import React, { ReactNode } from "react";
import css from "./FloatingButtonContainer.module.scss"

type FloatingButtonContainerProps = {
    children: ReactNode
    bottom?: number
}

const FloatingButtonContainer = ({children, bottom = 16}: FloatingButtonContainerProps) => {
    return (
        <div className={css.container} style={{bottom}}>
            {children}
        </div>
    )
}

export default FloatingButtonContainer;