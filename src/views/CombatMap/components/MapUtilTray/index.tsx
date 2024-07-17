
import Token from "../Token";
import { getExtraColorsFilterFromNewColor } from "../Token/utils";
import { InternalToken } from "@views/CombatMap/TokensConfig";
import Tray from "@components/Drawer/Tray";
import { faCircleDot, faSwatchbook } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@components/Button/Button";
import { Typography } from "@components/Typography/Typography";
import ColorPicker, { COLORS_MAP } from "@components/ColorPicker/ColorPicker";

type Props = {
    favTokens: InternalToken[]
}

const MapUtilsTray = ({favTokens}: Props) => {
    const [openTab, setOpenTab] = useState<null | string>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const isPinging = searchParams.get("isPinging") === "on" || false;
    const pingColor = searchParams.get("pingColor") || COLORS_MAP.Red;

    const trayContents = [
        {
            key: "favIcons",
            icon: faSwatchbook,
            contents: (<div style={{display: "flex", gap: 16, maxWidth: 400, flexWrap: "wrap"}}>
                {favTokens.map((token, index) =>
                    <Token
                        id={`add-favToken-${index}`}
                        data={{
                            image: token.image,
                            width: token.width,
                            name: token.name,
                            length: token.height,
                            color: token.color,
                            opacity: token.opacity || 1,
                            rotation: 0,
                            position: {
                                x: index,
                                y: 0
                            }
                        }}
                        content={
                            <div>
                                <img
                                    src={token.image}
                                    width={(token.width/token.height) * 40}
                                    height={(token.height/token.width) * 40}
                                    style={{
                                        filter: token?.color ? getExtraColorsFilterFromNewColor(token?.color) : undefined,
                                        opacity: token?.opacity || undefined,
                                        userSelect: "none",
                                    }}
                                />
                            </div>
                        }
                    />
                )}
            </div>)
        },
        {
            key: "ping",
            icon: faCircleDot,
            contents: (
                <div style={{padding: 16}}>
                    <Typography color="light" size="large">Show Cursor</Typography>
                    <div style={{display: "flex", gap: 8}}>
                        <Button onClick={() => setSearchParams(searchParams => {
                            searchParams.set("isPinging", isPinging ? "off" : "on");
                            return searchParams;
                            })
                        } color={isPinging ? "success" : "secondary"} animatedHover><Typography color="light">{isPinging ? "ON" : "OFF"}</Typography></Button>
                        <ColorPicker width={50} value={pingColor} onChange={(value) => {
                            setSearchParams(searchParams => {
                                searchParams.set("pingColor", String(value));
                                return searchParams;
                            })
                        }}/>
                    </div>
                </div>
            )
        }
    ];

    return (
        <Tray onClose={() => setOpenTab(null)} onOpen={(key) => setOpenTab(key)} openTab={openTab || undefined} side="right" contents={trayContents} />
    );
}

export default MapUtilsTray;