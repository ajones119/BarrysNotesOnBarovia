import React, { useEffect, useRef, useState } from 'react';
import "./Modal.css";
import { Button } from '../Button/Button';
import { Grid } from "@mui/material"
import { createPortal } from 'react-dom';
import { animated, useSpring, useTransition } from '@react-spring/web'

declare interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    onOpen?: () => void;
    extraButtons?: Array<any>
}

const ModalComponent = ({children, onClose, extraButtons = []}: ModalProps) => {

    return <div className='modal-content'>
                <div className="modal-content-inner">{children}</div>
                <Grid container spacing={2}>
                    <Grid item xs={extraButtons.length === 0 ? 12 : 12/(extraButtons.length + 1)}>
                        <Button size="large" onClick={onClose}>Close</Button>
                    </Grid>
                    { extraButtons.map((button) => (
                        <Grid item xs={12/(extraButtons.length + 1)}>
                            {button}
                        </Grid>
                        ))
                    }
                </Grid>
            </div>
}

export const Modal = ({isOpen, children, onClose, onOpen=() => {}, extraButtons = []}: ModalProps) => {
    const modalRoot = useRef(document.createElement("div"));

    const transitions = useTransition(isOpen, {
        from: {
            y: 0,
            opacity: 0,
          },
          enter: {
            y: 20,
            opacity: 1,
          },
          leave: {
            y: 0,
            opacity: 0,
          },
        config: {
            duration: 300
        }
      })

    useEffect(() => {
        document.body.appendChild(modalRoot.current);
        console.log("mount")

        return () => {
            document.body.removeChild(modalRoot.current)
        }
    }, [])

    useEffect(() => {
        isOpen && onOpen();
        //setLocalIsOpen(isOpen)
    }, [isOpen])

    return transitions((style, isOpen) => isOpen && createPortal(
            <animated.div style={{opacity: style.opacity}} className={`modal`}>
                <animated.div style={{...style}}>
                    <ModalComponent
                        isOpen={isOpen}
                        children={children}
                        onClose={onClose}
                        onOpen={onOpen}
                        extraButtons={extraButtons}
                    />
                </animated.div>
            </animated.div>,
            modalRoot.current
        ))
};