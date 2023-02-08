import React from 'react';
import { Typography } from "@mui/material";

import './HomeCard.css'
import { useNavigate } from 'react-router-dom';

declare interface HomeComponentProps {
    name: string,
    image: any
    url: string
}

export const HomeCard = ({ name, image, url }: HomeComponentProps) => {
  const navigate = useNavigate();

    return (
        <div className='bordered-card' onClick={() => {
            navigate(url);
        }} >
            <img className='card-image' src={image} alt="Castle" />
            <div className={'card-text'}>
            <Typography variant='h4'>{name}</Typography>
            </div>
        </div>
    );
}