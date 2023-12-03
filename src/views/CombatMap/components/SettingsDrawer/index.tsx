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
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAutoAnimate } from '@formkit/auto-animate/react'

declare interface SettingsDrawerProps extends DrawerProps {
    map: CombatMap,
    setMap: (_newMap: CombatMap) => void
};

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
        extraTokens.push({
          id: `${uniqueID}`,
          data: {
            position: {
              x: 100,
              y: 100
            },
            image: newToken.image,
            length: newToken.height,
            width: newToken.width,
            name: newToken.name
          }
        })

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

                <Button onClick={() => setIsAddTokensDrawerOpen(true)}>ADD Token</Button>
                <div ref={animateRef}>
                {
                    (localMapSettings?.extraTokens || []).map(({id, data: token}) => (
                        <div className={css.addTokenEntry} key={id}>
                            <div className={css.addTokenInfo}>
                                
                                <Typography>{token.name}</Typography>
                            </div>
                            <Button borderColor="error" color='dark' onClick={() => handleDeleteToken(id)}>
                                <FontAwesomeIcon icon={faMinus} />
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