import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import css from "./CreateCustomTokenModal.module.scss"
import { Modal } from '../Modal';
import { TextInput } from '../../TextInput/TextInput';
import { Button } from '@components/Button/Button';
import { CustomToken } from "@model/CombatMap";
import { useCreateCustomToken, useDeleteCustomTokens, useEditCustomToken } from "@services/CustomTokensService";
import FileInput from "@components/FileInput";
import { Typography } from "@components/Typography/Typography";
import { Spacer } from "@components/Spacer/Spacer";
import GridCanvas from "@components/Canvas/Grid";
import { useElementSize, useWindowSize } from "usehooks-ts";
import { getExtraColorsFilterFromNewColor } from "@views/CombatMap/components/Token/utils";
import { COLORS_MAP } from "@components/ColorPicker/ColorPicker";

declare interface CreateTokenModalProps {
    isOpen: boolean;
    onClose: () => void;
    editToken?: CustomToken;
};
const defaultToken = {height: 1, width: 1, name: "", opacity: 1}
const CreateTokenModal = ({isOpen, onClose, editToken }: CreateTokenModalProps) => {
    const [token, setToken] = useState<CustomToken>(editToken || defaultToken);
    const [imageDisplay, setImageDisplay] = useState("");
    const [tokenSize, setTokenSize] = useState(30);
    const [rotate, setRotate] = useState(0);

    const imageRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [cachedPosition, setCachedPosition] = useState({ x: 0, y: 0 });

    const exampleTokenSize = tokenSize < 20 ? 20 : tokenSize;

    const handleOnClose = () => {
        setToken(defaultToken)
        setPosition({ x: 0, y: 0 });
        setCachedPosition({ x: 0, y: 0 });

        onClose();
    }

    const {mutate: create, isLoading: createLoading} = useCreateCustomToken(handleOnClose);
    const {mutate: edit, isLoading: editLoading} = useEditCustomToken(handleOnClose);
    const {mutate: remove, isLoading: deleteLoading} = useDeleteCustomTokens(handleOnClose);

    const{width} = useWindowSize();

    useEffect(() => {
        if (token?.image instanceof File) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageDisplay(reader.result as string);
            };
            reader.readAsDataURL(token?.image);
        } else if (token?.image) {
            setImageDisplay(token?.image)
        }
    }, [token?.image])

    const handleMouseDown = ({nativeEvent}: BaseSyntheticEvent<MouseEvent>) => {
        if (token?.image && canvasRef?.current) {
            setDragging(true);
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const offsetX = nativeEvent.clientX - rect.left;
            const offsetY = nativeEvent.clientY - rect.top;
            setPosition({ x: offsetX, y: offsetY });
        }
    };

    const handleMouseMove = ({ nativeEvent }: BaseSyntheticEvent<MouseEvent>) => {
        if (dragging && canvasRef.current) {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const offsetX = nativeEvent.clientX - rect.left;
            const offsetY = nativeEvent.clientY - rect.top;
            setPosition({ x: offsetX, y: offsetY });
        }
    };

    const handleMouseUp = () => {
        if (Math.abs(position.x - cachedPosition.x) < 5 && Math.abs(position.y - cachedPosition.y) < 5){
            setRotate(rotate + 45)
        }
        setCachedPosition({...position})
        setDragging(false);
    };

    const isNameValid = token?.name && true;
    const isWidthScaleValue = token?.width > 0 && token?.width < 100;
    const isLengthScaleValue = token?.height > 0 && token?.height < 100;
    const isOpacityValid = token?.opacity && token?.opacity > 0 && token?.opacity <= 1;
    const isTokenImageValid = !!token?.image;

    useEffect(() => {
        setToken(editToken || defaultToken);
    }, [isOpen])

    const buttons = [
        <Button
            color="success"
            size="large"
            isLoading={editLoading || createLoading}
            onClick={() => {
                if (token?.name) {
                    editToken ? edit(token) : create(token)
                    console.log(token)
                }
            }}
            disabled={!(isNameValid && isWidthScaleValue && isLengthScaleValue && isTokenImageValid && isOpacityValid)}
        >Save Token</Button>
    ];

    if (editToken) {
        buttons.unshift(
            <Button
                color="error"
                size="large"
                isLoading={deleteLoading}
                onClick={() => {
                    if (token?.name) {
                        remove(token?.docId || "")
                    } else {
                    }
                }}
                disabled={!(isNameValid && isWidthScaleValue && isLengthScaleValue && isTokenImageValid && isOpacityValid)}
            >Delete Token</Button>
        )
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={buttons}>
                <div className={css.inputForm}>
                    <div className={css.inputRow}>
                        <div className={css.nameInput}>
                            <TextInput error={!isNameValid} placeholder="Name" value={token.name} onChange={(value) => setToken({ ...token, name: String(value)})} />
                        </div>
                        <FileInput
                            value={typeof token?.image === "string" ? token?.image : token?.image?.name}
                            onChange={(value) =>
                                setToken({ ...token, image: value || ""})
                            }
                            title="Token"
                        />
                    </div>
                    <div className={css.inputRow}>
                        <TextInput error={!isWidthScaleValue} number placeholder="Width Scale" value={token.width} onChange={(value) => setToken({ ...token, width: Number(value)})} />
                        <TextInput error={!isLengthScaleValue} number placeholder="Height Scale" value={token.height} onChange={(value) => setToken({ ...token, height: Number(value)})} />
                        <TextInput error={!isOpacityValid} number placeholder="Opacity %" value={(token?.opacity || 0) * 100} onChange={(value) => setToken({ ...token, opacity: Number(value)/100})} />
                        <Button
                            onClick={() => setToken({...token, canChangeColor: !token?.canChangeColor})}
                            color={token?.canChangeColor ? "secondary" : "tertiary"}>
                                <Typography color="default">{token?.canChangeColor ? "Can Change Color" : "Use Original Graphic"}</Typography>
                        </Button>
                        <TextInput number placeholder="Preview Token Size" value={tokenSize} onChange={(value) => setTokenSize(Number(value || 0))} />
                    </div>
                </div>
                <Spacer height={16}/>
                <div className={css.example}>
                    <canvas
                        width={width * 0.9}
                        height={450}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        ref={canvasRef}
                        style={{position: "absolute"}}
                    />
                    <GridCanvas gridColor="white" width={width * 0.9} height={450} sideLength={exampleTokenSize} />

                    { token?.image && 
                        <img
                            width={exampleTokenSize * token?.width}
                            height={exampleTokenSize * token?.height}
                            src={imageDisplay}
                            className={css.tokenPreview}
                            style={{
                                left: position.x,
                                top: position.y,
                                pointerEvents: 'none',
                                filter: token?.canChangeColor ? getExtraColorsFilterFromNewColor(COLORS_MAP.Gray) : undefined,
                                transform: `rotate(${rotate}deg)`,
                                opacity: token?.opacity,
                                cursor: "grab"
                            }}
                            ref={imageRef}
                        />
                    }
                </div>
            </Modal>
        </div>
    );
}

export default CreateTokenModal;