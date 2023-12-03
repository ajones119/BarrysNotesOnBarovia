import { Button } from "@components/Button/Button";
import Drawer, { DrawerProps } from "@components/Drawer";
import { Typography } from "@components/Typography/Typography";
import INTERNAL_TOKENS, { InternalToken } from "@views/CombatMap/TokensConfig";
import React, { useState } from "react"
import css from "../../SettingsDrawer.module.scss"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounce } from "usehooks-ts";
import { TextInput } from "@components/TextInput/TextInput";

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

    let options = INTERNAL_TOKENS;

    if (debouncedSearch) {
        options = options.filter(option => option.name.includes(debouncedSearch))
    }

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            side="left"
        >
            <div className={css.settingsDrawerContainer}>
            <TextInput placeholder="search" value={search} onChange={value => setSearch(String(value))} />
                <div >
                    {options.map(token => (
                        <div className={css.addTokenEntry} key={token.name}>
                            <div className={css.addTokenInfo}>
                                <Typography>{token.name}</Typography>
                            </div>
                            <Button borderColor="dark" color='dark' onClick={() => onAddToken(token)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </Drawer>
    );
}

export default AddTokenDrawer;