import React from "react";
import "../App.css";
import { NavBar, NavBarLink } from "@components/NavBar/NavBar";
import { Spacer } from "@components/Spacer/Spacer";
import { useParams } from "react-router-dom";

declare interface NonHomePageContainerProps {
    page?: React.ReactNode,
    meta: {getAdditionalLinks: (params: any) => NavBarLink[]};
}

export const NonHomePageContainer = ({ page, meta }: NonHomePageContainerProps) => {
    const params = useParams();
    const additionalLinks = meta?.getAdditionalLinks ? meta.getAdditionalLinks(params) : [];
    return (
        <div>
            <NavBar additionalLinks={additionalLinks} />
            <div className="nonHomePage">{ page }</div>
            <Spacer height={64}/>
        </div>
    );
}