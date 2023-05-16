import React, { useEffect } from 'react';
import "./Modal.css";
import { Button } from '../Button/Button';
import { Grid } from "@mui/material"

declare interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    onOpen?: () => void;
    extraButtons?: Array<any>
}

export const Modal = ({isOpen, children, onClose, onOpen=() => {}, extraButtons = []}: ModalProps) => {

    useEffect(() => {
        isOpen && onOpen();
    }, [isOpen])

    return (
        (
            <div className={`modal ${isOpen ? 'active' : 'inactive'}`}>
                <div className='modal-content'>
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
            </div>
        )
    );
};