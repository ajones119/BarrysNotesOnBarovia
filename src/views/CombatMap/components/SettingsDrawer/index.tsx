import { Button } from "@components/Button/Button";
import Drawer, { DrawerProps } from "@components/Drawer";
import { Spacer } from "@components/Spacer/Spacer";
import { TextInput } from "@components/TextInput/TextInput";
import { CombatMap } from "@model/Combat";
import React, { useEffect, useState } from "react";
import css from "./SettingsDrawer.module.scss"
import AddTokenDrawer from "./components/AddTokensDrawer";
import { InternalToken } from "@views/CombatMap/TokensConfig";
import { Typography } from "@components/Typography/Typography";
import { faCopy, faLock, faLockOpen, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import ColorPicker, { COLORS_MAP } from "@components/ColorPicker/ColorPicker";
import { Checkbox } from "@mui/material";
import useCombatMapStore from "@views/CombatMap/CombatMapStore";

declare interface SettingsDrawerProps extends DrawerProps {
    map: CombatMap,
    setMap: (_newMap: CombatMap) => void,
    isPlayer?: boolean
};

const SettingsDrawer = ({
    isOpen,
    onClose,
    map,
    setMap,
    isPlayer = false
}: SettingsDrawerProps) => {
    const [localMapSettings, setLocalMapSettings] = useState<CombatMap>(map || {extraTokens: []})
    const [isAddTokensDrawerOpen, setIsAddTokensDrawerOpen] = useState(false)
    const [showLocked, setShowLocked] = useState(true);
    const [animateRef] = useAutoAnimate();
    const currentMapCoordinates = useCombatMapStore(state => state.currentMapCoordinates);

    useEffect(() => {
        if (isOpen) {
            setLocalMapSettings(map)
        }
    }, [isOpen])

    const handleDeleteToken = (id: string) => {
        const updatedTokens = localMapSettings?.extraTokens?.filter((token) => token.id !== id) || [];
        setLocalMapSettings({...localMapSettings, extraTokens: updatedTokens})
    }

    const handleAddToken = (newToken: InternalToken) => {
        const extraTokens = localMapSettings?.extraTokens || [];
        const uniqueID = Date.now() + Math.random()
        console.log(currentMapCoordinates.x + 200)
        const token = {
            id: `${uniqueID}`,
            disabled: false,
            data: {
              position: {
                x: currentMapCoordinates.x + 200,
                y: currentMapCoordinates.y + 200
              },
              image: newToken.image,
              length: newToken.height,
              width: newToken.width,
              name: newToken.name,
              color: "",
              opacity: 0,
              rotation: 0,
              canRotate: newToken?.canRotate || false,
              playerAdded: isPlayer
            }
          }
        if (newToken?.color) {
            token.data = {...token.data, color: newToken.color}
        }
        if (newToken?.opacity) {
            token.data = {...token.data, opacity: newToken.opacity}
        }
        if (newToken?.canRotate) {
            token.data = {...token.data, rotation: newToken.rotation || 0}
        }

        extraTokens.push(token)

        setLocalMapSettings({...localMapSettings, extraTokens: extraTokens})
        setIsAddTokensDrawerOpen(false);
      }

      let extraTokensToDisplay = isPlayer ? localMapSettings?.extraTokens?.filter(token => token?.data?.playerAdded) || [] : localMapSettings?.extraTokens;
      extraTokensToDisplay = showLocked ? extraTokensToDisplay : extraTokensToDisplay?.filter(token => !token?.disabled)

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            side="left"
        >
            <div className={css.settingsDrawerContainer}>
                <TextInput value={localMapSettings?.columns} placeholder="cols" number onChange={(value) => setLocalMapSettings({...localMapSettings, columns: Number(value)})} />
                <Spacer height={24} />

                <TextInput value={localMapSettings?.rows} placeholder="rows" number onChange={(value) => setLocalMapSettings({...localMapSettings, rows: Number(value)})} />
                <Spacer height={24} />

                <TextInput value={localMapSettings?.tokenSize} placeholder="base token size" number onChange={(value) => setLocalMapSettings({...localMapSettings, tokenSize: Number(value)})} />
                <Spacer height={24} />

                <TextInput value={localMapSettings?.mapImage} placeholder="Map Image" onChange={(value) => setLocalMapSettings({...localMapSettings, mapImage: String(value)})} />
                <Spacer height={24} />

                <div className={css.settingsRow}>
                    <Typography color="primary">Background Color</Typography>
                    <div>
                        <ColorPicker outlined width={48} value={localMapSettings?.mapColor || COLORS_MAP.White} onChange={(value) => setLocalMapSettings({...localMapSettings, mapColor: String(value)})} />
                    </div>
                </div>

                <div className={css.settingsRow}>
                    <Typography color="primary">Grid Color</Typography>
                    <div>
                        <ColorPicker outlined width={48} value={localMapSettings?.gridColor || COLORS_MAP.Black} onChange={(value) => setLocalMapSettings({...localMapSettings, gridColor: String(value)})} />
                    </div>
                </div>

                <div className={css.settingsRow}>
                    <Typography color="primary">Hide Grid</Typography>
                    <Checkbox checked={localMapSettings?.hideGrid} placeholder="Map Image" onChange={() => setLocalMapSettings({...localMapSettings, hideGrid: !localMapSettings.hideGrid})} />
                </div>
                <Spacer height={24} />

                <Button onClick={() => setIsAddTokensDrawerOpen(true)}>ADD Token</Button>
                <Spacer height={8} />
                <Button onClick={() => setShowLocked(!showLocked)}>{showLocked ? "Hide" : "Show"} Locked</Button>
                <div ref={animateRef}>
                {
                    (extraTokensToDisplay || []).map(({id, data: token, disabled}, index) => (
                        <div className={css.addTokenEntry} key={id}>
                            <div className={css.addTokenInfo}>
                                
                                <Typography>{token.name}</Typography>
                            
                                {
                                    token?.color && 
                                        <ColorPicker outlined width={48} value={token?.color} onChange={value => {
                                            const tokenIndex = localMapSettings?.extraTokens?.findIndex(token => token.id === id) || 0;
                                            const newToken = {id, data: {...token, color: value}}
                                            const newTokens = [...localMapSettings.extraTokens || []]
                                            newTokens[tokenIndex] = newToken
                                            setLocalMapSettings({...localMapSettings, extraTokens: newTokens})
                                        }} />
                                }
                            </div>
                            <div className={css.tokenButtons}>
                            <Button borderColor="primary" color='dark' onClick={() => {
                                    const tokenIndex = localMapSettings?.extraTokens?.findIndex(token => token.id === id) || 0;
                                    const newToken = {id, data: {...token}, disabled: !disabled}
                                    const newTokens = [...localMapSettings.extraTokens || []]
                                    newTokens[tokenIndex] = newToken
                                    setLocalMapSettings({...localMapSettings, extraTokens: newTokens})
                                }}>
                                    <FontAwesomeIcon icon={disabled ? faLock : faLockOpen} />
                                </Button>
                                <Button borderColor="error" color='dark' onClick={() => handleDeleteToken(id)}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </Button>
                                <Button borderColor="success" color='dark' onClick={() => handleAddToken({...token, height: token?.length})}>
                                    <FontAwesomeIcon icon={faCopy} />
                                </Button>
                            </div>
                        </div>
                    ))
                }
                </div>
                <Spacer height={24} />
                <Button onClick={() => {
                    setMap(localMapSettings);
                    onClose && onClose();
                }}>SUBMIT</Button>
                <AddTokenDrawer
                    isOpen={isAddTokensDrawerOpen}
                    onClose={() => setIsAddTokensDrawerOpen(false)}
                    onAddToken={handleAddToken}
                />
            </div>
        </Drawer>
    );
}

export default SettingsDrawer;