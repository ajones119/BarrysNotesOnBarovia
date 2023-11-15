import React from 'react';
import css from "./CharacterThumbCard.module.scss"
import STICK from "@images/stick1.png"
import { Typography } from '../Typography/Typography';
import { BaseCharacter } from '@model/BaseCharacter';
import { PlayerCharacter } from '@model/PlayerCharacter';

declare interface CharacterThumbCardProps {
    character: BaseCharacter;
    onClick?: (_character: PlayerCharacter) => void
};

export const CharacterThumbCard = ({ character, onClick = (_character: PlayerCharacter) => {} }: CharacterThumbCardProps) => {

    return (
        <div>
            <div className={css.CharacterThumbCard} onClick={() => onClick(character)}>
                <img
                    className={css.imageContainer}
                    src={character?.characterImageURL}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src=STICK;
                    }}
                    alt="boo"
                />
                <div className={css.nameContainer}>
                <Typography color="primary"> {character.name} </Typography>
                </div>
            </div>
        </div>
    );
};
