import React, { useState } from 'react';
import { CampaignLocation } from '@model/Location';
import { TreeItem } from "@mui/x-tree-view"; 
import CreateCampaignLocationModal from '@components/Modal/CreateCampaignLocationModal/CreateCampaignLocationModal';
import { Button } from '@components/Button/Button';
import { Item } from '@model/Item';
import { NPC } from '@model/NPC';

declare interface CampaignTreeLocationProps {
    campaignLocation: CampaignLocation,
    subLocationOptions?: CampaignLocation[],
    subItems?: Item[],
    campaignId: string,
    npcs?: NPC[],
    selectedLocation?: CampaignLocation
}

const CampaignTreeLocation = ({ campaignLocation, subLocationOptions = [], campaignId, npcs = [], selectedLocation }: CampaignTreeLocationProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const subLocations = subLocationOptions.filter(option => option.parentLocationId === campaignLocation.docId)

    return (
        <TreeItem nodeId={campaignLocation?.docId || ""} label={campaignLocation.name}>
            <div>
                { selectedLocation?.docId === campaignLocation.docId && <Button color="dark" onClick={() => setIsModalOpen(true)}>Add Sub Location</Button>}
                { subLocations.map(sub => (
                    <CampaignTreeLocation selectedLocation={selectedLocation} npcs={npcs} campaignLocation={sub} subLocationOptions={subLocationOptions} campaignId={campaignId || ""} />
                )) }
                <CreateCampaignLocationModal parentLocationIdOverride={campaignLocation.docId} campaignId={campaignId || ""} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </TreeItem>
    )
}

export default CampaignTreeLocation;
