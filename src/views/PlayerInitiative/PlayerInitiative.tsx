import React, {useState} from "react"
import CharacterPicker from "../../components/CharacterPicker/CharacterPicker";
import { useCampaignCharacters } from "../../service/CharacterService";
import { useParams } from "react-router-dom";
import css from "./PlayerInitiative.module.scss"
import { Character } from "../../model/Character";
import { useCampaign } from "../../service/CampaignService";
import { Typography } from "../../components/Typography/Typography";
import { CharacterThumbCard } from "../../components/CharacterThumbCard/CharatcerThumbCard";
import STICK from "../../images/ismark-background.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceMehBlank } from "@fortawesome/free-regular-svg-icons";
import { faFaceAngry, faFaceMeh } from "@fortawesome/free-solid-svg-icons";

const PlayerInitiative = () => {
    const [character, setCharacter] = useState<Character | null>()
    const {CampaignId} = useParams();
    const {isLoading, characters} = useCampaignCharacters(CampaignId || "")
    const {campaign} = useCampaign(CampaignId || "")

    return (
    <div className={css.playerInitiativeContainer}>
        <CharacterPicker onChange={(value) => {
            const getCharacter = characters ? characters.find((char) => char.docId === value) : null;
            setCharacter(getCharacter)
        }} characters={characters || []}/>
        {character && 
            <div className={css.characterContainer}>
                <Typography color="light" size="xtraLarge">{character.name}</Typography>
                    <img
                        src={character.characterImageURL}
                        className={css.imageContainer}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src=STICK;
                        }}
                        width={360}
                        alt="boo"
                    />
                <div>
                {character?.docId === campaign.currentDocId && <div className={css.turnIndicator}><FontAwesomeIcon icon={faFaceAngry} /><Typography size="xtraLarge">Your Turn</Typography></div>}
                {character?.docId === campaign.nextDocId && <div className={css.turnIndicator}><FontAwesomeIcon icon={faFaceMeh} /><Typography size="xtraLarge">You're Next!</Typography></div>}
                {character?.docId !== campaign.nextDocId && character?.docId !== campaign.currentDocId && <div className={css.turnIndicator}><FontAwesomeIcon icon={faFaceMehBlank} /><Typography size="xtraLarge">Not Your Turn</Typography></div>}
                </div>
            </div>
        }

    </div>);
}

export default PlayerInitiative;