import React from "react";
import "../App.css";
import { NavBar } from "@components/NavBar/NavBar";
import { Spacer } from "@components/Spacer/Spacer";

declare interface NonHomePageContainerProps {
    page?: React.ReactNode
}

export const NonHomePageContainer = ({ page }: NonHomePageContainerProps) => {
    return (
        <div>
        <NavBar />
        <div className="nonHomePage">{ page }</div>
        <Spacer height={24}/>
        </div>
    );
}