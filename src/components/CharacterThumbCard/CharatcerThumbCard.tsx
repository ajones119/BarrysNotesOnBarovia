import React from 'react';
import { Character } from '../../model/Character';
import css from "./CharacterThumbCard.module.scss"
import STICK from "../../images/stick1.png"
import { Typography } from '../Typography/Typography';
import { useNavigate } from 'react-router-dom';

declare interface CharacterThumbCardProps {
    character: Character
};

export const CharacterThumbCard = ({ character }: CharacterThumbCardProps) => {
    const navigate = useNavigate();
    return (
        <div className={css.CharacterThumbCard} onClick={() => navigate(`/characters/${character.docId}`)}>
            <div className={css.imageContainer}>
            <img
                src={character.characterImageURL}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src=STICK;
                }}
                width={300}
                alt="boo"
            /></div>
            <div className={css.nameContainer}>
            <Typography color="primary"> {character.name} </Typography>
            <div className={css.imageContainer}>
            <img
                src={character.characterImageURL}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src=STICK;
                }}
                width={300}
                alt="boo"
            /></div>
            </div>
        </div>
    );
};