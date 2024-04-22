import React, { ReactNode } from "react";
import "../App.css";
import { NavBar, NavBarLink } from "@components/NavBar/NavBar";
import { Spacer } from "@components/Spacer/Spacer";
import { useParams } from "react-router-dom";
import { DigiDice } from "dice";

declare interface NonHomePageContainerProps {
    page?: React.ReactNode,
    meta: {
        topLink: (params: any) => NavBarLink | null,
        getAdditionalLinks: (params: any) => NavBarLink[],
    };
}

export const NonHomePageContainer = ({ page, meta }: NonHomePageContainerProps) => {
    const params = useParams();
    const additionalLinks = meta?.getAdditionalLinks ? meta.getAdditionalLinks(params) : [];
    const sectionHomeLink = meta?.topLink ? meta.topLink(params) : null;
    return (
        <div>
            <NavBar additionalLinks={additionalLinks} sectionHomeLink={sectionHomeLink} />
            <div className="nonHomePage">{ page }</div>
            <Spacer height={64}/>
            <DigiDice />
        </div>
    );
}
