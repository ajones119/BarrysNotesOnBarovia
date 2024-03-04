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
import FileInput from "@components/FileInput";
import { mutateCombatToken, useAddCombatToken, useCombatMap, useCombatMapTokens, useDeleteCombatToken, useUpdateCombatMap } from "@services/CombatMapService";

declare interface SettingsDrawerProps extends DrawerProps {
    combatId: string,
    isPlayer?: boolean
};

const SettingsDrawer = ({
    isOpen,
    onClose,
    combatId,
    isPlayer = false
}: SettingsDrawerProps) => {
    const { combatMap, isLoading: isMapLoading, isRefetching: isMapRefetching } = useCombatMap(combatId);
    const [localMapSettings, setLocalMapSettings] = useState<CombatMap>(combatMap)
    const [isAddTokensDrawerOpen, setIsAddTokensDrawerOpen] = useState(false)
    const [showLocked, setShowLocked] = useState(true);
    const [animateRef] = useAutoAnimate();
    const currentMapCoordinates = useCombatMapStore(state => state.currentMapCoordinates);
    const {mutate: setMap} = useUpdateCombatMap(combatMap?.docId || "");
    const {mutate: addCombatToken} = useAddCombatToken(combatMap?.docId || "")
    const {tokens: combatTokens} = useCombatMapTokens(combatMap?.docId || "")
    const {mutate: deleteToken} = useDeleteCombatToken();

    useEffect(() => {
        if (isOpen) {
            setLocalMapSettings({...combatMap})
        }
    }, [isOpen])

    const handleAddToken = (newToken: InternalToken) => {
        const token = {
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

        addCombatToken(token);

        setIsAddTokensDrawerOpen(false);
    }

    let extraTokensToDisplay = isPlayer ? combatTokens.filter(token => token?.data?.playerAdded) || [] : combatTokens;
    extraTokensToDisplay = showLocked ? extraTokensToDisplay : extraTokensToDisplay?.filter(token => !token?.disabled)

    let overMaxRows = (localMapSettings?.rows || 0) > 200;
    let overMaxColumns = (localMapSettings?.columns || 0) > 200;
    let overMaxTokenSize = (localMapSettings?.tokenSize || 0) > 200;

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            side="left"
        >
            <div className={css.settingsDrawerContainer}>
                { !isPlayer &&
                    <div>
                        <TextInput error={overMaxColumns} value={localMapSettings?.columns} placeholder="cols" max={200} number onChange={(value) => setLocalMapSettings({...localMapSettings, columns: Number(value)})} />
                        <Spacer height={24} />

                        <TextInput error={overMaxRows} value={localMapSettings?.rows} placeholder="rows" max={200} number onChange={(value) => setLocalMapSettings({...localMapSettings, rows: Number(value)})} />
                        <Spacer height={24} />

                        <TextInput error={overMaxTokenSize} value={localMapSettings?.tokenSize} placeholder="base token size" number onChange={(value) => setLocalMapSettings({...localMapSettings, tokenSize: Number(value)})} />
                        <Spacer height={24} />

                        <FileInput value={typeof localMapSettings?.mapImage === "string" ? localMapSettings?.mapImage : localMapSettings?.mapImage?.name} title="Map Image" onChange={(value) => setLocalMapSettings({...localMapSettings, mapImage: value || ""})} />
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
                    </div>
                }
                <Button onClick={() => {
                    if (!overMaxColumns && !overMaxRows && !overMaxTokenSize) {
                        setMap(localMapSettings);
                        onClose && onClose();
                    }
                }}>SUBMIT</Button>
                <Spacer height={24} />

                <Button onClick={() => setIsAddTokensDrawerOpen(true)} size="large" color="success"><Typography>ADD Token</Typography></Button>
                <Spacer height={8} />
                <Button onClick={() => setShowLocked(!showLocked)}>{showLocked ? "Hide" : "Show"} Locked</Button>
                <div ref={animateRef}>
                {
                    (extraTokensToDisplay || []).map(({docId = "", data: token, disabled}, index) => (
                        <div className={css.addTokenEntry} key={docId}>
                            <div className={css.addTokenInfo}>
                                
                                <Typography>{token.name}</Typography>
                            
                                {
                                    token?.color && 
                                        <ColorPicker outlined width={48} value={token?.color} onChange={value => {
                                            mutateCombatToken(docId, {data: {...token, color: value}})
                                        }} />
                                }
                            </div>
                            <div className={css.tokenButtons}>
                            <Button color='dark' onClick={() => {
                                    mutateCombatToken(docId, {disabled: !disabled})
                                }}>
                                    <FontAwesomeIcon icon={disabled ? faLock : faLockOpen} />
                                </Button>
                                <Button color='dark' onClick={() => deleteToken(docId)}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </Button>
                                <Button color='dark' onClick={() => handleAddToken({...token, height: token?.length})}>
                                    <FontAwesomeIcon icon={faCopy} />
                                </Button>
                            </div>
                        </div>
                    ))
                }
                </div>
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