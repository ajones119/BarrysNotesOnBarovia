import React, { useState } from "react";
import { NPC } from "@model/NPC";
import { useParams, useSearchParams } from "react-router-dom";
import { CampaignLocation } from "@model/Location";
import { Button } from "@components/Button/Button";
import CreateCampaignLocationModal from "@components/Modal/CreateCampaignLocationModal/CreateCampaignLocationModal";
import { TreeView } from "@mui/x-tree-view"; 
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import CampaignTreeLocation from "./CampaignTreeLocation";
import css from "./CampaignLocations.module.scss"
import CampaignLocationPanel from "./CampaignLocationPanel";

declare interface CampaignLocationsProps {
    locations?: CampaignLocation[],
    npcs?: NPC[],
}

const CampaignLocations = ({
    locations = [],
    npcs = [],
}: CampaignLocationsProps) => {
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { CampaignId } = params;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const baseLocations = locations.filter(l => !l.parentLocationId)

    const currentlySelectedLocation = locations.find(location => location.docId == searchParams.get("id"))
    const subLocations = currentlySelectedLocation ? locations.filter(location => location.parentLocationId === currentlySelectedLocation.docId) : [];


    return (
        <div className={css.locationsTreePage}>
            <div className={css.locationsTree}>
                <div>
                    <Button animatedHover={false} color="dark" borderColor="primary" onClick={() => setIsModalOpen(true)}>Add Base Location</Button>
                    <CreateCampaignLocationModal campaignId={CampaignId || ""} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                    <Grid container>
                        <Grid item xs={12}>
                            <TreeView
                                onNodeSelect={(_event: React.SyntheticEvent, nodeIds: string) => {
                                    const docId = nodeIds || "";
                                    const newParams = searchParams;
                                    newParams.set("id", String(docId))
                                    setSearchParams(newParams, {replace: true})
                                }}
                                defaultCollapseIcon={<FontAwesomeIcon icon={faArrowAltCircleDown} />}
                                defaultExpandIcon={<FontAwesomeIcon icon={faArrowAltCircleRight} />}
                            >
                                { baseLocations.map(base => (
                                    <CampaignTreeLocation selectedLocation={currentlySelectedLocation} npcs={npcs} campaignLocation={base} subLocationOptions={locations} campaignId={CampaignId || ""} />
                                )) }
                            </TreeView>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className={css.currentLocationContainer}>
            <CampaignLocationPanel location={currentlySelectedLocation} campaignId={CampaignId || ""} npcs={npcs || []} subLocations={subLocations || []} />
            </div>
        </div>
    );
}

export default CampaignLocations;