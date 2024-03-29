import React, { useEffect, useState } from 'react';
import css from "./Button.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFlushed, faFaceGrin, faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import Boop from '../AnimationComponentWrappers/Boop';

declare interface LoadingButtonProps {
    onClick: () => void
    children: React.ReactNode;
    disabled?: boolean;
    neon?: boolean;
    color?: "success" | "light" | "dark" | "error" | "primary" | "default";
    size?: "small" | "default" | "large";
    isLoading: boolean;
    status?: ButtonStatuses;
    animatedHover?: boolean;
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

export const LoadingButton = ({ onClick, children, disabled = false, neon = false, color = "default", size = "default", isLoading, status = ButtonStatuses.Idle, animatedHover = true }: LoadingButtonProps) => {
    const [buttonStatus, setButtonStatus] = useState(status)
    useEffect(() => {
        const timer = setTimeout(() => setButtonStatus(ButtonStatuses.Idle), 2000);
        setButtonStatus(status)
        return () => {
            clearTimeout(timer);
        };
      }, [status]);

    return (
        <Boop rotation={1} disabled={!animatedHover || disabled}>
            <button onClick={onClick} className={`${css.button} ${neon && css.neon} ${css[color]} ${css[size]} `} disabled={disabled}>
                {isLoading && loader}
                {(!isLoading && buttonStatus === ButtonStatuses.Idle) && children}
                {(!isLoading && buttonStatus === ButtonStatuses.Error) && error}
                {(!isLoading && buttonStatus === ButtonStatuses.Success) && success}

            </button>
        </Boop>
    );
};