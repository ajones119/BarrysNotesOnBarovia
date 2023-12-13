import Wolf from "@images/GenericMonsters/animal.png"
import WoodPile from "@images/MapTokens/WoodPile1x1.png"
import Fog1x1 from "@images/MapTokens/Fog1x1.png"
import Fog2x2 from "@images/MapTokens/Fog2x2.png"
import Fog5x3 from "@images/MapTokens/Fog5x3.png"
import Bush2x2 from "@images/MapTokens/Bush2x2.png"
import BlackCircle from "@images/MapTokens/circle2.png"
import BlackSquare from "@images/MapTokens/BlackSquareOutline.png"
import BlackSolidSquare from "@images/MapTokens/squareSolid.png"
import BlueCone from "@images/MapTokens/bluecone.png"
import Chest from "@images/MapTokens/chest.png"
import CampFire from "@images/MapTokens/campfire.png"
import RotatingSpell from "@images/MapTokens/rotatefire.gif"
import Rock from "@images/MapTokens/rock.png"
import FireWall from "@images/MapTokens/fireWall.gif"

import { COLORS_MAP } from "@components/ColorPicker/ColorPicker"


export type InternalToken = {
    image: string;
    name: string;
    height: number;
    width: number;
    color?: string;
    opacity?: number;
    canRotate?: boolean;
    rotation?: number;
}

const INTERNAL_TOKENS: Array<InternalToken> = [
    {
        name: "Animated Circle 1x1",
        image: RotatingSpell,
        height: 1,
        width: 1,
        color: COLORS_MAP.Black,
        opacity: 0.9
    },
    {
        name: "Animated Circle (5ft radius) 2x2",
        image: RotatingSpell,
        height: 2,
        width: 2,
        color: COLORS_MAP.Black,
        opacity: 0.9
    },
    {
        name: "Animated Circle (10ft radius) 4x4",
        image: RotatingSpell,
        height: 4,
        width: 4,
        color: COLORS_MAP.Black,
        opacity: 0.9
    },
    {
        name: "Animated Circle (15ft radius) 6x6",
        image: RotatingSpell,
        height: 6,
        width: 6,
        color: COLORS_MAP.Black,
        opacity: 0.9
    },
    {
        name: "Animated Circle (20ft radius) 8x8",
        image: RotatingSpell,
        height: 8,
        width: 8,
        color: COLORS_MAP.Black,
        opacity: 0.9
    },
    {
        name: "Animated Circle (30ft radius) 12x12",
        image: RotatingSpell,
        height: 12,
        width: 12,
        color: COLORS_MAP.Black,
        opacity: 0.9
    },
    {
        name: "Animated Circle (50ft radius) 20x20",
        image: RotatingSpell,
        height: 20,
        width: 20,
        color: COLORS_MAP.Black,
        opacity: 0.9
    },
    {
        name: "Animated Circle (60ft radius) 24x24",
        image: RotatingSpell,
        height: 24,
        width: 24,
        color: COLORS_MAP.Black,
        opacity: 0.9
    },
    {
        name: "Bush 1x1",
        image: Bush2x2,
        height: 1,
        width: 1
    },
    {
        name: "Bush 2x2",
        image: Bush2x2,
        height: 2.2,
        width: 2.2
    },
    {
        name: "Campfire 1x1",
        image: CampFire,
        height: 1,
        width: 1
    },
    {
        name: "Campfire 2x2",
        image: CampFire,
        height: 2,
        width: 2
    },
    {
        name: "Chest 1x1",
        image: Chest,
        height: 1,
        width: 1
    },
    {
        name: "Circle 1x1",
        image: BlackCircle,
        height: 1,
        width: 1,
        color: COLORS_MAP.Black,
        opacity: 0.7
    },
    {
        name: "Circle (5ft radius) 2x2",
        image: BlackCircle,
        height: 2,
        width: 2,
        color: COLORS_MAP.Black,
        opacity: 0.7
    },
    {
        name: "Circle (10ft radius) 4x4",
        image: BlackCircle,
        height: 4,
        width: 4,
        color: COLORS_MAP.Black,
        opacity: 0.7
    },
    {
        name: "Circle (15ft radius) 6x6",
        image: BlackCircle,
        height: 6,
        width: 6,
        color: COLORS_MAP.Black,
        opacity: 0.7
    },
    {
        name: "Circle (20ft radius) 8x8",
        image: BlackCircle,
        height: 8,
        width: 8,
        color: COLORS_MAP.Black,
        opacity: 0.7
    },
    {
        name: "Circle (30ft radius) 12x12",
        image: BlackCircle,
        height: 12,
        width: 12,
        color: COLORS_MAP.Black,
        opacity: 0.7
    },
    {
        name: "Circle (50ft radius) 20x20",
        image: BlackCircle,
        height: 20,
        width: 20,
        color: COLORS_MAP.Black,
        opacity: 0.7
    },
    {
        name: "Circle (60ft radius) 24x24",
        image: BlackCircle,
        height: 24,
        width: 24,
        color: COLORS_MAP.Black,
        opacity: 0.7
    },
    {
        name: "Cone (10 ft)",
        image: BlueCone,
        height: 2,
        width: 2,
        color: COLORS_MAP.Black,
    },
    {
        name: "Cone (15 ft)",
        image: BlueCone,
        height: 3,
        width: 3,
        color: COLORS_MAP.Black,
        canRotate: true,
    },
    {
        name: "Cone (20 ft)",
        image: BlueCone,
        height: 4,
        width: 4,
        color: COLORS_MAP.Black
    },
    {
        name: "Cone (25 ft)",
        image: BlueCone,
        height: 5,
        width: 5,
        color: COLORS_MAP.Black
    },
    {
        name: "Cone (30 ft)",
        image: BlueCone,
        height: 6,
        width: 6,
        color: COLORS_MAP.Black
    },
    {
        name: "Spell Wall 1x1",
        image: FireWall,
        height: 1,
        width: 1,
        color: COLORS_MAP.Black,
        canRotate: true
    },
    {
        name: "Spell Wall (20 ft) 1x4",
        image: FireWall,
        height: 1,
        width: 4,
        color: COLORS_MAP.Black,
        canRotate: true
    },
    {
        name: "Spell Wall (40 ft) 1x8",
        image: FireWall,
        height: 1,
        width: 8,
        color: COLORS_MAP.Black,
        canRotate: true
    },
    {
        name: "Spell Wall (60ft) 1x12",
        image: FireWall,
        height: 1,
        width: 12,
        color: COLORS_MAP.Black,
        canRotate: true
    },
    {
        name: "Spell Wall (80ft) 1x16",
        image: FireWall,
        height: 1,
        width: 16,
        color: COLORS_MAP.Black,
        canRotate: true
    },
    {
        name: "Spell Wall (100ft) 1x20",
        image: FireWall,
        height: 1,
        width: 20,
        color: COLORS_MAP.Black,
        canRotate: true
    },
    {
        name: "Fog 1x1",
        image: Fog1x1,
        height: 3,
        width: 3,
        color: COLORS_MAP.White
    },
    {
        name: "Fog 2x2",
        image: Fog2x2,
        height: 3,
        width: 3,
        color: COLORS_MAP.White
    },
    {
        name: "Fog 4x4",
        image: Fog2x2,
        height: 6,
        width: 6,
        color: COLORS_MAP.White
    },
    {
        name: "Fog 8x8",
        image: Fog2x2,
        height: 12,
        width: 12,
        color: COLORS_MAP.White
    },
    {
        name: "Fog 5x1",
        image: Fog5x3,
        height: 3,
        width: 7,
        color: COLORS_MAP.White
    },
    {
        name: "Fog 5x3",
        image: Fog5x3,
        height: 6,
        width: 7,
        color: COLORS_MAP.White
    },
    {
        name: "Square Solid 1x1",
        image: BlackSolidSquare,
        height: 1,
        width: 1,
        color: COLORS_MAP.Black,
        canRotate: true,
        opacity: 0.9,
    },
    {
        name: "Square Solid 1x2",
        image: BlackSolidSquare,
        height: 1,
        width: 2,
        color: COLORS_MAP.Black,
        canRotate: true,
        opacity: 0.9,
    },
    {
        name: "Square Solid 2x1",
        image: BlackSolidSquare,
        height: 2,
        width: 1,
        color: COLORS_MAP.Black,
        canRotate: true,
        opacity: 0.9,
    },
    {
        name: "Square Solid 2x2",
        image: BlackSolidSquare,
        height: 2,
        width: 2,
        color: COLORS_MAP.Black,
        canRotate: true,
        opacity: 0.9,
    },
    {
        name: "Square Solid 3x3",
        image: BlackSolidSquare,
        height: 3,
        width: 3,
        color: COLORS_MAP.Black,
        canRotate: true,
        opacity: 0.9,
    },
    {
        name: "Square Solid 6x6",
        image: BlackSolidSquare,
        height: 6,
        width: 6,
        color: COLORS_MAP.Black,
        canRotate: true,
        opacity: 0.9,
    },
    {
        name: "Square Solid 8x8",
        image: BlackSolidSquare,
        height: 8,
        width: 8,
        color: COLORS_MAP.Black,
        canRotate: true,
        opacity: 0.9,
    },
    {
        name: "Square Hollow 1x1",
        image: BlackSquare,
        height: 1.5,
        width: 1.5,
        color: COLORS_MAP.Black,
        canRotate: true
    },
    {
        name: "Square Hollow 1x2",
        image: BlackSquare,
        height: 1.5,
        width: 3,
        color: COLORS_MAP.Black,
        canRotate: true
    },
    {
        name: "Square Hollow 2x1",
        image: BlackSquare,
        height: 3,
        width: 1.5,
        color: COLORS_MAP.Black,
        canRotate: true
    },
    {
        name: "Square Hollow 2x2",
        image: BlackSquare,
        height: 3,
        width: 3,
        color: COLORS_MAP.Black,
        canRotate: true
    },
    {
        name: "Square Hollow 3x3",
        image: BlackSquare,
        height: 4.7,
        width: 4.7,
        color: COLORS_MAP.Black,
        canRotate: true
    },
    {
        name: "Square Hollow 6x6",
        image: BlackSquare,
        height: 10,
        width: 10,
        color: COLORS_MAP.Black,
        canRotate: true
    },
    {
        name: "Square Hollow 8x8",
        image: BlackSquare,
        height: 13,
        width: 13,
        color: COLORS_MAP.Black,
        canRotate: true
    },
    {
        name: "Stone 1x1",
        image: Rock,
        height: 1,
        width: 1,
    },
    {
        name: "Stone 2x2",
        image: Rock,
        height: 2,
        width: 2,
    },
    {
        name: "Wolf",
        image: Wolf,
        height: 1,
        width: 1
    },
    {
        name: "Wood Pile",
        image: WoodPile,
        height: 1.5,
        width: 1.5
    },
];

export default INTERNAL_TOKENS;