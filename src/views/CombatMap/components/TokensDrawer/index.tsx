import { Button } from "@components/Button/Button";
import Drawer, { DrawerProps } from "@components/Drawer";
import { Spacer } from "@components/Spacer/Spacer";
import React, { useState } from "react";
import css from "./TokenDrawer.module.scss"
import { InternalToken } from "@views/CombatMap/TokensConfig";
import { Typography } from "@components/Typography/Typography";
import { faCopy, faLock, faLockOpen, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import ColorPicker from "@components/ColorPicker/ColorPicker";
import useCombatMapStore from "@views/CombatMap/CombatMapStore";
import { mutateCombatToken, useAddCombatToken, useCombatMap, useCombatMapTokens, useDeleteCombatToken } from "@services/CombatMapService";
import AddTokenDrawer from "./components/AddTokensDrawer";
import { CombatToken } from "@model/CombatMap";

declare interface TokensDrawerProps extends DrawerProps {
    combatId: string,
    isPlayer?: boolean
};

const TokensDrawer = ({
    isOpen,
    onClose,
    combatId,
    isPlayer = false
}: TokensDrawerProps) => {
    const { combatMap, isLoading: isMapLoading, isRefetching: isMapRefetching } = useCombatMap(combatId);
    const [isAddTokensDrawerOpen, setIsAddTokensDrawerOpen] = useState(false)
    const [showLocked, setShowLocked] = useState(true);
    const [animateRef] = useAutoAnimate();
    const currentMapCoordinates = useCombatMapStore(state => state.currentMapCoordinates);
    const {mutate: addCombatToken} = useAddCombatToken(combatMap?.docId || "")
    const {tokens: combatTokens} = useCombatMapTokens(combatMap?.docId || "")
    const {mutate: deleteToken} = useDeleteCombatToken();

    const handleAddToken = (newToken: InternalToken) => {
        let token: CombatToken = {
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

        if (newToken?.baseTokenId) {
            token = {...token, baseTokenId: newToken?.baseTokenId}
        }
        addCombatToken(token);

        setIsAddTokensDrawerOpen(false);
    }

    let extraTokensToDisplay = isPlayer ? combatTokens.filter(token => token?.data?.playerAdded) || [] : combatTokens;
    extraTokensToDisplay = showLocked ? extraTokensToDisplay : extraTokensToDisplay?.filter(token => !token?.disabled)

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            side="left"
        >
            <div className={css.settingsDrawerContainer}>
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
                                <Button color='dark' onClick={() => {
                                    //@ts-ignore
                                    handleAddToken({...token, height: token?.length})
                                    ;}}>
                                    <FontAwesomeIcon icon={faCopy} />
                                </Button>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
            <AddTokenDrawer
                isOpen={isAddTokensDrawerOpen}
                onClose={() => setIsAddTokensDrawerOpen(false)}
                onAddToken={handleAddToken}
            />
        </Drawer>
    );
}

export default TokensDrawer;