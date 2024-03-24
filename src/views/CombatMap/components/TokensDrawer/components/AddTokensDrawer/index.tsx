import { Button } from "@components/Button/Button";
import Drawer, { DrawerProps } from "@components/Drawer";
import { Typography } from "@components/Typography/Typography";
import INTERNAL_TOKENS, { InternalToken } from "@views/CombatMap/TokensConfig";
import React, { useMemo, useState } from "react"
import css from "../../TokenDrawer.module.scss"
import { faChevronUp, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounce } from "usehooks-ts";
import { TextInput } from "@components/TextInput/TextInput";
import { Spacer } from "@components/Spacer/Spacer";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useCustomTokens } from "@services/CustomTokensService";
import { COLORS_MAP } from "@components/ColorPicker/ColorPicker";
import useLocalCharacter from "@hooks/useLocalCharacter";
import { useParams } from "react-router-dom";
import { useCampaignCharacters, useEditPlayerCharacter } from "@services/CharacterService";

declare interface AddTokensDrawerProps extends DrawerProps {
    onAddToken: (_newToken: InternalToken) => void
}

const AddTokenDrawer = ({
    isOpen,
    onClose,
    onAddToken
}: AddTokensDrawerProps) => {
    const {tokens: remoteTokens = [], isLoading: isTokensLoading} = useCustomTokens();
    const {CampaignId = ""} = useParams();
    const {selectedCharacter} = useLocalCharacter(CampaignId)
    const {characters, isLoading: isCharactersLoading} = useCampaignCharacters(CampaignId);
    const {mutate, isLoading: isMutating} = useEditPlayerCharacter(() => {})
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 250);
    const character = characters.find(character => selectedCharacter === character.docId)

    const categories = useMemo(() => {
        let categories = [ ...INTERNAL_TOKENS ];
        if (remoteTokens) {
            const customCategory = {
                name: "Custom",
                id: "custom",
                tokens: remoteTokens?.map(token => ({
                    ...token,
                    color: token?.canChangeColor ? COLORS_MAP.Black : undefined,
                    baseTokenId: token?.docId
                }))
            }
            // @ts-ignore
            categories.push(customCategory);
        }

        if (character) {
            let favTokenIds = character?.favoriteTokens || [];
            const remappedInternalTokens: InternalToken[] = [];
            categories.forEach(category => {
                remappedInternalTokens.push(...category.tokens)
            });


            const favTokens: InternalToken[] = [];
            favTokenIds.forEach(id => {
                const token = remappedInternalTokens.find(token => id === token?.baseTokenId || id === token?.name)
                token && favTokens.push(token)
            })


            const favoriteCategory = {
                name: "Favorites",
                id: "favorite",
                tokens: favTokens
            }
            if (favoriteCategory.tokens.length > 0) {
                // @ts-ignore
                categories.unshift(favoriteCategory);
            }
        }

        if (debouncedSearch) {
            categories = categories.map(category => ({
                ...category,
                tokens: category?.tokens.filter(option => option.name.toLowerCase().includes(debouncedSearch)) || []
            }))
        }
    
        categories = categories.filter(category => category?.tokens?.length > 0) || []

        return categories;
    }, [isMutating, selectedCharacter, isCharactersLoading, isTokensLoading, debouncedSearch])

    const handleAddFavorite = (id: string) => {
        if (character && CampaignId) {
            if (character?.favoriteTokens && character?.favoriteTokens?.includes(id)) {
                mutate({docId: selectedCharacter, favoriteTokens: character?.favoriteTokens?.filter(token => id !== token)});
            } else {
                mutate({docId: selectedCharacter, favoriteTokens: (character?.favoriteTokens || [])?.concat(id)});
            }
        }
    }

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            side="left"
        >
            <div className={css.settingsDrawerContainer}>
            <TextInput placeholder="search" value={search} onChange={value => setSearch(String(value))} />
            <Spacer height={24} />
                
                    {
                        categories.map(category => (
                            <Accordion variant="elevation" color="dark">
                                <AccordionSummary
                                    sx={{
                                        backgroundColor: "black",
                                        color: "white",
                                        
                                    }}
                                    expandIcon={<FontAwesomeIcon icon={faChevronUp} color="white" />}
                                >
                                    <Typography color="light" >{category.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{
                                        backgroundColor: "#0f1417"
                                    }}
                                >
                                    {category?.tokens.map(token => {
                                        return (
                                        <div className={css.addTokenEntry} key={token.name}>
                                            <div className={css.addTokenInfo}>
                                                <Typography>{token.name}</Typography>
                                            </div>
                                                <div className={css.buttons}>
                                                    <Button color='dark' onClick={() => onAddToken(token)}>
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </Button>
                                                    { character && 
                                                        <Button color='tertiary' onClick={() => handleAddFavorite(token?.baseTokenId || token?.name)}>
                                                            <FontAwesomeIcon icon={character?.favoriteTokens?.includes(token?.baseTokenId || token?.name) ? faStar : emptyStar} />
                                                        </Button>
                                                    }
                                            </div>
                                        </div>
                                    )})}
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
            </div>
        </Drawer>
    );
}

export default AddTokenDrawer;