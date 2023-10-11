import React, { useState } from 'react';
import { CampaignLocation } from '@model/Location';
import { TreeItem } from "@mui/lab"; 
import { Grid } from "@mui/material";
import CreateCampaignLocationModal from '@components/Modal/CreateCampaignLocationModal/CreateCampaignLocationModal';
import { Button } from '@components/Button/Button';
import { Typography } from '@components/Typography/Typography';
import { Item } from '@model/Item';
import BACKUP from "@images/hauntedCastleBackground.jpg"
import { NPC } from '@model/NPC';
import NPCPicker from '@components/NPCPicker/NPCPicker';
import { SetCampaignLocation, useDeleteCampaignLocationButton } from '../../../../../service/CampaignLocationService';
import NPCThumbCard from '@components/NPCThumbCard/NPCThumbCard';
import css from "../../SingleCampaign.module.scss"
import TextEditorDisplay from '@components/TextEditor/TextEditDisplay';

declare interface CampaignTreeLocationProps {
    campaignLocation: CampaignLocation,
    subLocationOptions?: CampaignLocation[],
    subItems?: Item[],
    campaignId: string,
    npcs?: NPC[],
}

const CampaignTreeLocation = ({ campaignLocation, subLocationOptions = [], campaignId, npcs = [] }: CampaignTreeLocationProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNPC, setCurrentNPC] = useState("");
    const saveCampaignLocation = SetCampaignLocation(campaignLocation)
    const deleteLocationButton = useDeleteCampaignLocationButton(campaignLocation, () => {}, !!subLocationOptions.find(location => campaignLocation.docId === location.parentLocationId))

    const subLocations = subLocationOptions.filter(option => option.parentLocationId === campaignLocation.docId)
    const campaignLocationsNPCs = npcs.filter(npc => campaignLocation.npcs.includes(npc.docId))

    return (
        <TreeItem nodeId={campaignLocation.docId} label={campaignLocation.name}>
            <div>
                <Grid container justifyContent="space-around" alignItems="center" rowSpacing={2}>
                    <Grid item xs={12} >
                        <Typography className={css.center} size="xtraLarge">{campaignLocation.name}{" "}{(deleteLocationButton)}</Typography>
                    </Grid>

                    {
                        campaignLocation.locationImageURL && <Grid item>
                            <div><img
                                src={campaignLocation.locationImageURL}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src=BACKUP;
                                }}
                                width={600}
                                alt="boo"
                                className={css.center}
                            /></div>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <TextEditorDisplay value={campaignLocation.description} />
                    </Grid>

                    <Grid item style={{display: "flex"}}>
                        <NPCPicker onChange={(npc) => setCurrentNPC(npc)} npcs={npcs} value={currentNPC} /><div>{"  "}</div>
                        <Button
                            onClick={() => {
                                const newNPCs = [...campaignLocation.npcs];
                                if (!newNPCs.includes(currentNPC)) {
                                    newNPCs.push(currentNPC)
                                    saveCampaignLocation({...campaignLocation, npcs: newNPCs} )
                                    setCurrentNPC("")
                                }
                            }}
                            disabled={currentNPC === ""}
                            color="light">Save</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="space-around" alignItems="center" rowSpacing={2}>
                            {
                                campaignLocationsNPCs.map(npc => (
                                    <Grid item md={4} sm={6} xs={12}>
                                        <NPCThumbCard npc={npc} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                </Grid>

                <Button color="dark" onClick={() => setIsModalOpen(true)}>Add Sub Location</Button>
                { subLocations.map(sub => (
                    <CampaignTreeLocation npcs={npcs} campaignLocation={sub} subLocationOptions={subLocationOptions} campaignId={campaignId as string} />
                )) }
                <CreateCampaignLocationModal parentLocationIdOverride={campaignLocation.docId} campaignId={campaignId as string} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </TreeItem>
    )
}

export default CampaignTreeLocation;