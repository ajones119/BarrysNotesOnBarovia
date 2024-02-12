import React, { useEffect, useState } from 'react';
import css from "./Button.module.scss"
import Spinner from '@components/Spinner';

export declare interface ButtonProps {
    onClick?: () => void
    children: React.ReactNode;
    disabled?: boolean;
    animatedHover?: boolean;
    color?: "success" | "light" | "dark" | "error" | "primary" | "default" | "secondary";
    borderColor?: "success" | "light" | "dark" | "error" | "primary" | "default" | "secondary";
    size?: "small" | "default" | "large";
    hollow?: boolean;
    round?: boolean;
    isLoading?: boolean;
}

export const Button = ({
    onClick,
    children,
    disabled = false,
    animatedHover = false,
    borderColor = "default",
    hollow = false,
    color = "default",
    size = "default",
    isLoading = false
  }: ButtonProps) => {
    const [coordinates, setCoordinates] = useState({x: -1, y: -1});
    const [isRippling, setIsRippling] = useState(false);

    useEffect(() => {
        if (coordinates.x !== -1 && coordinates.y !== -1) {
          setIsRippling(true);
          setTimeout(() => setIsRippling(false), 300);
        } else setIsRippling(false);
      }, [coordinates]);

      React.useEffect(() => {
        if (!isRippling) {
            setCoordinates({ x: -1, y: -1 });
        }
      }, [isRippling]);
    
    return (
        <button
            onClick={(event: any) => {
                const rect = event?.target?.getBoundingClientRect();
                setCoordinates({x: event.clientX - rect.left, y: event.clientY - rect.top});
                (onClick && !isLoading) && onClick();
            }}
            className={`
                ${css.button}
                ${animatedHover && css.animatedHover}
                ${css[color]}
                ${css[`borderColor-${borderColor}`]}
                ${css[size]}
                ${hollow && css.hollow}
            `}
            disabled={disabled}
        >
            {isRippling ? (
        <span
          className={css.ripple}
          style={{
            left: coordinates.x,
            top: coordinates.y
          }}
        />
      ) : null}
            <span className="content">{
              isLoading ?
                <div className={css.spinnerContainer}><Spinner /></div>
                : children
              }</span>
        </button>
    );
};