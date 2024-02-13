import { Button } from "@components/Button/Button";
import Drawer, { DrawerProps } from "@components/Drawer";
import { Typography } from "@components/Typography/Typography";
import INTERNAL_TOKENS, { InternalToken } from "@views/CombatMap/TokensConfig";
import React, { useState } from "react"
import css from "../../SettingsDrawer.module.scss"
import { faChevronUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounce } from "usehooks-ts";
import { TextInput } from "@components/TextInput/TextInput";
import { Spacer } from "@components/Spacer/Spacer";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons";

declare interface AddTokensDrawerProps extends DrawerProps {
    onAddToken: (_newToken: InternalToken) => void
}

const AddTokenDrawer = ({
    isOpen,
    onClose,
    onAddToken
}: AddTokensDrawerProps) => {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 250);

    let categories = INTERNAL_TOKENS;

    if (debouncedSearch) {
        categories = categories.map(category => ({
            ...category,
            tokens: category?.tokens.filter(option => option.name.toLowerCase().includes(debouncedSearch)) || []
        }))
    }

    categories = categories.filter(category => category?.tokens?.length > 0) || []

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
                                    {category?.tokens.map(token => (
                                        <div className={css.addTokenEntry} key={token.name}>
                                            <div className={css.addTokenInfo}>
                                                <Typography>{token.name}</Typography>
                                            </div>
                                            <Button color='dark' onClick={() => onAddToken(token)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                        </div>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
               
            </div>
        </Drawer>
    );
}

export default AddTokenDrawer;