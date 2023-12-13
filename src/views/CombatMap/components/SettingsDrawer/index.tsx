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
import { faCopy, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import ColorPicker, { COLORS_MAP } from "@components/ColorPicker/ColorPicker";
import { Checkbox } from "@mui/material";

declare interface SettingsDrawerProps extends DrawerProps {
    map: CombatMap,
    setMap: (_newMap: CombatMap) => void
};

const ROTATION_RESULTS = [
    {value: 0, label: 0},
    {value: 15, label: 15},
    {value: 30, label: 30},
    {value: 45, label: 45},
    {value: 60, label: 60},
    {value: 90, label: 90},
    {value: 115, label: 115},
]

const SettingsDrawer = ({
    isOpen,
    onClose,
    map,
    setMap
}: SettingsDrawerProps) => {
    const [localMapSettings, setLocalMapSettings] = useState<CombatMap>(map || {extraTokens: []})
    const [isAddTokensDrawerOpen, setIsAddTokensDrawerOpen] = useState(false)
    const [animateRef] = useAutoAnimate();

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
        const token = {
            id: `${uniqueID}`,
            data: {
              position: {
                x: 100,
                y: 100
              },
              image: newToken.image,
              length: newToken.height,
              width: newToken.width,
              name: newToken.name,
              color: "",
              opacity: 0,
              rotation: 0,
              canRotate: newToken?.canRotate || false
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
                        <ColorPicker width={48} label="Color" value={localMapSettings?.mapColor || COLORS_MAP.White} onChange={(value) => setLocalMapSettings({...localMapSettings, mapColor: String(value)})} />
                    </div>
                </div>

                <div className={css.settingsRow}>
                    <Typography color="primary">Grid Color</Typography>
                    <div>
                        <ColorPicker width={48} label="Color" value={localMapSettings?.gridColor || COLORS_MAP.Black} onChange={(value) => setLocalMapSettings({...localMapSettings, gridColor: String(value)})} />
                    </div>
                </div>

                <div className={css.settingsRow}>
                    <Typography color="primary">Hide Grid</Typography>
                    <Checkbox checked={localMapSettings?.hideGrid} placeholder="Map Image" onChange={(value) => setLocalMapSettings({...localMapSettings, hideGrid: !localMapSettings.hideGrid})} />
                </div>
                <Spacer height={24} />

                <Button onClick={() => setIsAddTokensDrawerOpen(true)}>ADD Token</Button>
                <div ref={animateRef}>
                {
                    (localMapSettings?.extraTokens || []).map(({id, data: token}, index) => (
                        <div className={css.addTokenEntry} key={id}>
                            <div className={css.addTokenInfo}>
                                
                                <Typography>{token.name}</Typography>
                            
                                {
                                    token?.color && 
                                        <ColorPicker width={48} label="Color" value={token?.color} onChange={value => {
                                            const newToken = {id, data: {...token, color: value}}
                                            const newTokens = [...localMapSettings.extraTokens || []]
                                            newTokens[index] = newToken
                                            setLocalMapSettings({...localMapSettings, extraTokens: newTokens})
                                        }} />
                                }
                                {
                                    token?.canRotate && 
                                        <TextInput placeholder="Rotate" number value={token?.rotation} onChange={value => {
                                            const newToken = {id, data: {...token, rotation: Number(value)}}
                                            const newTokens = [...localMapSettings.extraTokens || []]
                                            newTokens[index] = newToken
                                            setLocalMapSettings({...localMapSettings, extraTokens: newTokens})
                                        }} />
                                }
                            </div>
                            <Button borderColor="error" color='dark' onClick={() => handleDeleteToken(id)}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <Button borderColor="success" color='dark' onClick={() => handleAddToken({...token, height: token?.length})}>
                                <FontAwesomeIcon icon={faCopy} />
                            </Button>
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