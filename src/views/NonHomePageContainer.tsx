import React from "react";
import "../App.css";
import { NavBar } from "../components/NavBar/NavBar";

declare interface NonHomePageContainerProps {
    page?: React.ReactNode
}

export const NonHomePageContainer = ({ page }: NonHomePageContainerProps) => {
    return (
        <div>
        <NavBar />
        <div>{ page }</div>
        </div>
    );
}