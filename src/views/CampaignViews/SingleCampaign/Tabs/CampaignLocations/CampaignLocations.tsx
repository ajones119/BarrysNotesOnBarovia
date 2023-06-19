import React, { useState } from "react";
import { NPC } from "../../../../../model/NPC";
import { Item } from "../../../../../model/Item";
import { useParams } from "react-router-dom";
import { CampaignLocation } from "../../../../../model/Location";
import { Button } from "../../../../../components/Button/Button";
import CreateCampaignLocationModal from "../../../../../components/Modal/CreateCampaignLocationModal/CreateCampaignLocationModal";
import { TreeView, TreeItem } from "@mui/lab"; 
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import CampaignTreeLocation from "./CampaignTreeLocation";

declare interface CampaignLocationsProps {
    locations?: CampaignLocation[],
    npcs?: NPC[],
    items?: Item[],
}
//eventually try to make search more performant
const CampaignLocations = ({
    locations = [],
    npcs = [],
    items = [],
}: CampaignLocationsProps) => {
    const params = useParams();
    const { CampaignId } = params;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const baseLocations = locations.filter(l => !l.parentLocationId)

    npcs = npcs?.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });

    return (
        <div style={{color: "white", textAlign: "left"}}>
            <Button color="dark" onClick={() => setIsModalOpen(true)}>Add Base Location</Button>
            <CreateCampaignLocationModal campaignId={CampaignId as string} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <Grid container>
                <Grid item xs={12}>
                    <TreeView
                        defaultCollapseIcon={<FontAwesomeIcon icon={faArrowAltCircleDown} />}
                        defaultExpandIcon={<FontAwesomeIcon icon={faArrowAltCircleRight} />}
                    >
                        { baseLocations.map(base => (
                            <CampaignTreeLocation npcs={npcs} campaignLocation={base} subLocationOptions={locations} campaignId={CampaignId as string} />
                        )) }
                    </TreeView>
                </Grid>
            </Grid>
        </div>
    );
}

export default CampaignLocations;