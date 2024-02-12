import { CampaignLocation } from "@model/Location";
import css from "./CampaignLocations.module.scss"
import { Typography } from "@components/Typography/Typography";
import { SetCampaignLocation, useDeleteCampaignLocation } from "@services/CampaignLocationService";
import BACKUP from "@images/hauntedCastleBackground.jpg"
import TextEditorDisplay from "@components/TextEditor/TextEditDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@components/Button/Button";
import NPCPicker from "@components/NPCPicker/NPCPicker";
import { useState } from "react";
import { Grid } from "@mui/material";
import NPCCard from "@components/BaseCharacterThumbCard/Cards/NPCCard";
import { Spacer } from "@components/Spacer/Spacer";
import CreateCampaignLocationModal from "@components/Modal/CreateCampaignLocationModal/CreateCampaignLocationModal";
import { BaseCharacter } from "@model/BaseCharacter";
import Markdown from "react-markdown";

type CampaignLocationPanelProps = {
    location?: CampaignLocation;
    campaignId: string,
    npcs?: BaseCharacter[], 
    subLocations?: CampaignLocation[]
}

const CampaignLocationPanel = ({ location, npcs = [], subLocations = [] }: CampaignLocationPanelProps) => {
    const [currentNPC, setCurrentNPC] = useState<string>("");
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

    const {mutate, isLoading} = useDeleteCampaignLocation(location?.docId || "1")
    const saveCampaignLocation = SetCampaignLocation(location)
    let selectedNPCs = npcs.filter(npc => location?.npcs?.includes(npc?.docId || "") )
    selectedNPCs = selectedNPCs?.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });

    if (!location) {
        return (
            <Typography size="xtraLarge" weight="bold" underline>
                Select a location
            </Typography>
        );
    }


    return (
        <div className={css.currentLocationPanelContainer} >
            <div className={css.header}>
                <div className={css.headerLeft}>
                <Typography className={css.title} size="xtraLarge" fontStyle="secondary" underline>
                    {location?.name}
                </Typography>
                <div className={css.editIcon} onClick={() => setIsEditModalOpen(true)}>
                    <FontAwesomeIcon icon={faFeather} />
                    </div>
                </div>
                {subLocations.length === 0 && (
                    <Button color="error" isLoading={isLoading} onClick={mutate} disabled={subLocations.length !== 0}><FontAwesomeIcon icon={faTrash} /></Button>
                )}
            </div>
            <div className={css.description}>
                    <Typography color="light" ><Markdown>{location?.description || ""}</Markdown></Typography>
            </div>
            <div className={css.imageContainer}>
                <img
                    src={location.locationImageURL}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src=BACKUP;
                    }}
                    className={css.image}
                    alt="boo"
                />
            </div>
            <div className={css.characters}>
                <div className={css.characterPickerRow}>
                    <div>
                        <NPCPicker onChange={(npc) => setCurrentNPC(npc)} npcs={npcs.filter(npc => !(location?.npcs || []).includes(npc?.docId || ""))} value={currentNPC} /><div>{"  "}</div>
                    </div>
                    <div>
                        <Button
                            onClick={() => {
                                const newNPCs = [...location.npcs || []];
                                if (!newNPCs.includes(currentNPC)) {
                                    newNPCs.push(currentNPC)
                                    saveCampaignLocation({...location, npcs: newNPCs} )
                                    setCurrentNPC("")
                                }
                            }}
                            disabled={currentNPC === ""}
                            color="light"
                        >
                            Save
                        </Button>
                    </div>
                </div>
                <Spacer height={16} />
                <Grid container justifyContent="space-around" alignItems="center" rowSpacing={2}>
                    {
                        selectedNPCs.map(npc => (
                            <Grid item md={4} sm={6} xs={12}>
                                <NPCCard
                                    baseCharacter={npc}
                                    removeOverride={() => {
                                        const newNPCs = (location?.npcs || []).filter(docId => docId !== npc.docId)
                                        saveCampaignLocation({...location, npcs: newNPCs} )
                                    }}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
            <CreateCampaignLocationModal editLocation={location} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />

        </div>
    );
}

export default CampaignLocationPanel;