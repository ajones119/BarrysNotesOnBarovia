import React from 'react';
import css from "./Button.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFlushed, faFaceGrin, faFaceSadCry } from '@fortawesome/free-solid-svg-icons';

declare interface LoadingButtonProps {
    onClick: () => void
    children: React.ReactNode;
    disabled?: boolean;
    neon?: boolean;
    color?: "success" | "light" | "dark" | "error" | "primary" | "default";
    size?: "small" | "default" | "large";
    isLoading: boolean
    status?: ButtonStatuses
}

export enum ButtonStatuses { Idle = "idle", Error = "error", Success = "success", Loading = "loading" }

const loader = (
    <div className={`${css.loaderContainer} ${css.loader}`}><FontAwesomeIcon icon={faFaceFlushed} /></div>
)
const error = (
    <div className={`${css.loaderContainer} ${css.error}`}><FontAwesomeIcon icon={faFaceSadCry}  /></div>
)
const success = (
    <div  className={`${css.loaderContainer} ${css.success}`}><FontAwesomeIcon icon={faFaceGrin}  /></div>
)

export const LoadingButton = ({ onClick, children, disabled = false, neon = false, color = "default", size = "default", isLoading, status = ButtonStatuses.Idle }: LoadingButtonProps) => {


    return (
        <button onClick={onClick} className={`${css.button} ${neon && css.neon} ${css[color]} ${css[size]} `} disabled={disabled}>
            {isLoading && loader}
            {(!isLoading && status === ButtonStatuses.Idle) && children}
            {(!isLoading && status === ButtonStatuses.Error) && error}
            {(!isLoading && status === ButtonStatuses.Success) && success}

        </button>
    );
};