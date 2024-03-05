import { Button } from "@components/Button/Button";
import Drawer, { DrawerProps } from "@components/Drawer";
import { Spacer } from "@components/Spacer/Spacer";
import { TextInput } from "@components/TextInput/TextInput";
import { CombatMap } from "@model/CombatMap";
import React, { useEffect, useState } from "react";
import css from "./SettingsDrawer.module.scss"
import { Typography } from "@components/Typography/Typography";
import ColorPicker, { COLORS_MAP } from "@components/ColorPicker/ColorPicker";
import { Checkbox } from "@mui/material";
import FileInput from "@components/FileInput";
import { useCombatMap, useUpdateCombatMap } from "@services/CombatMapService";

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
    const {mutate: setMap} = useUpdateCombatMap(combatMap?.docId || "");

    useEffect(() => {
        if (isOpen) {
            setLocalMapSettings({...combatMap})
        }
    }, [isOpen])

    let validateMaxRows = (localMapSettings?.rows || 0) > 200 || (localMapSettings?.rows || 0) < 0;
    let validateMaxColumns = (localMapSettings?.columns || 0) > 200 || (localMapSettings?.columns || 0) < 0;
    let validateGridOffsetX = Math.abs(localMapSettings?.gridOffsetX || 0) > 1;
    let validateGridOffsetY = Math.abs(localMapSettings?.gridOffsetY || 0) > 1;
    let validateTokenSize = (localMapSettings?.tokenSize || 0) < 10 || (localMapSettings?.tokenSize || 0) > 100;

    const isValid = !validateMaxColumns
    && !validateMaxRows
    && !validateTokenSize
    && !validateGridOffsetX
    && !validateGridOffsetY;

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            side="left"
        >
            <div className={css.settingsDrawerContainer}>
                { !isPlayer &&
                    <div>
                        <Spacer height={24} />
                        <TextInput error={validateMaxColumns} value={localMapSettings?.columns} placeholder="Grid Column" max={200} number onChange={(value) => setLocalMapSettings({...localMapSettings, columns: Number(value)})} />
                        <Spacer height={24} />

                        <TextInput error={validateMaxRows} value={localMapSettings?.rows} placeholder="Grid Rows" max={200} number onChange={(value) => setLocalMapSettings({...localMapSettings, rows: Number(value)})} />
                        <Spacer height={24} />
                        <TextInput step="0.1" error={validateGridOffsetX} value={(localMapSettings?.gridOffsetX || 0) * 100} placeholder="Grid offset X%" max={200} number onChange={(value) => setLocalMapSettings({...localMapSettings, gridOffsetX: Number(value)/100})} />
                        <Spacer height={24} />

                        <TextInput step="0.1" error={validateGridOffsetY} value={(localMapSettings?.gridOffsetY || 0) * 100} placeholder="Grid offset Y%" max={200} number onChange={(value) => setLocalMapSettings({...localMapSettings, gridOffsetY: Number(value)/100})} />
                        <Spacer height={24} />
                                

                        <TextInput error={validateTokenSize} value={localMapSettings?.tokenSize} placeholder="base token size" number onChange={(value) => setLocalMapSettings({...localMapSettings, tokenSize: Number(value)})} />
                        <Spacer height={24} />

                        <div className={css.settingsRow}>
                            <FileInput value={typeof localMapSettings?.mapImage === "string" ? localMapSettings?.mapImage : localMapSettings?.mapImage?.name} title="Map Image" onChange={(value) => setLocalMapSettings({...localMapSettings, mapImage: value || ""})} />
                            {localMapSettings?.mapImage && <div style={{marginTop: -24}}><Button color="error" onClick={() => setLocalMapSettings({...localMapSettings, mapImage: ""})}><Typography color="light" size="caption">Remove Map</Typography></Button></div>}
                        </div>
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
                            <Checkbox checked={localMapSettings?.hideGrid} onChange={() => setLocalMapSettings({...localMapSettings, hideGrid: !localMapSettings.hideGrid})} />
                        </div>
                        <div className={css.settingsRow}>
                            <Button
                                onClick={() => setLocalMapSettings({...localMapSettings, cover: true})}
                                color={localMapSettings?.cover ? "success" : "error"}
                            >
                                <Typography color="light">Map Image Cover</Typography>
                            </Button>
                            <Button
                                onClick={() => setLocalMapSettings({...localMapSettings, cover: false})}
                                color={!localMapSettings?.cover ? "success" : "error"}
                            >
                                <Typography color="light">Map Image Contain</Typography>
                            </Button>
                        </div>
                        <Spacer height={24} />
                        <Button disabled={!isValid} onClick={() => {
                    if (isValid) {
                        setMap(localMapSettings);
                        onClose && onClose();
                    }
                }}>SUBMIT</Button>
                    </div>
                }
               
            </div>
        </Drawer>
    );
}

export default SettingsDrawer;