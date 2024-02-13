import React, { useRef } from 'react';
import { Modal } from '../Modal';
import css from "./ImageModal.module.scss"

declare interface ViewImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageURL?: string
};

const ViewImageModal = ({isOpen, onClose, imageURL}: ViewImageModalProps) => {
    const ref = useRef<HTMLImageElement>(null)
    const handleOnClose = () => {
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[]}>
            <div className={css.container}>
                <img
                    src={imageURL}
                    className={css.image}
                    ref={ref}
                />
            </div>
        </Modal>
    );
}

export default ViewImageModal;
