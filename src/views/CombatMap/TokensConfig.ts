import Wolf from "@images/GenericMonsters/animal.png"
import WoodPile from "@images/MapTokens/WoodPile1x1.png"
import Fog1x1 from "@images/MapTokens/Fog1x1.png"
import Fog2x2 from "@images/MapTokens/Fog2x2.png"
import Fog5x3 from "@images/MapTokens/Fog5x3.png"
import Cloud from "@images/MapTokens/cloudGif.gif"
import Lightning from "@images/MapTokens/lightning.gif"
import Bush2x2 from "@images/MapTokens/Bush2x2.png"
import BlackCircle from "@images/MapTokens/circle2.png"
import BlackSquare from "@images/MapTokens/BlackSquareOutline.png"
import BlackSolidSquare from "@images/MapTokens/squareSolid.png"
import BlueCone from "@images/MapTokens/bluecone.png"
import Chest from "@images/MapTokens/chest.png"
import CampFire from "@images/MapTokens/campfire.png"
import RotatingSpell from "@images/MapTokens/rotatefire.gif"
import RotatingSpellThin from "@images/MapTokens/animated-thin.gif"
import Rock from "@images/MapTokens/rock.png"
import FireWall from "@images/MapTokens/fireWall.gif"
import MetalDoor from "@images/MapTokens/metalDoor.png"
import WoodDoor from "@images/MapTokens/wooddoor.png"
import StairsStone1x1 from "@images/MapTokens/stairs1x1.png"
import StairsStoneLong from "@images/MapTokens/stairslong.png"
import HayBed from "@images/MapTokens/haybed.png"
import Ladder from "@images/MapTokens/ladder.png"
import WoodDesk from "@images/MapTokens/woodDesk.png"
import StoneWall1x1 from "@images/MapTokens/stonewall1x1.png"
import StoneWall2x1 from "@images/MapTokens/stonewall2x1.png"
import StoneWall3x1 from "@images/MapTokens/stonewall3x1.png"
import WoodWall1x1 from "@images/MapTokens/woodwall1x1.png"
import WoodWall2x1 from "@images/MapTokens/woodwall2x1.png"
import WoodWall3x1 from "@images/MapTokens/woodwall3x1.png"
import WoodWallCross from "@images/MapTokens/woodwallcross.png"
import WoodWallT from "@images/MapTokens/woodwallt.png"
import SewerEntrance from "@images/MapTokens/sewerEntrance.png"


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
    conditions?: string[];
}

const INTERNAL_TOKENS: Array<{
    name: string,
    id: string,
    tokens: InternalToken[]
}> = [
    {
        name: "Basic Tokens",
        id: "basic",
        tokens: [
            {
                name: "Circle Solid 1x1",
                image: BlackCircle,
                height: 1,
                width: 1,
                color: COLORS_MAP.Black,
                opacity: 0.7
            },
            {
                name: "Circle Solid (5ft radius) 2x2",
                image: BlackCircle,
                height: 2,
                width: 2,
                color: COLORS_MAP.Black,
                opacity: 0.7
            },
            {
                name: "Circle Solid (10ft radius) 4x4",
                image: BlackCircle,
                height: 4,
                width: 4,
                color: COLORS_MAP.Black,
                opacity: 0.7
            },
            {
                name: "Circle Solid (15ft radius) 6x6",
                image: BlackCircle,
                height: 6,
                width: 6,
                color: COLORS_MAP.Black,
                opacity: 0.7
            },
            {
                name: "Circle Solid (20ft radius) 8x8",
                image: BlackCircle,
                height: 8,
                width: 8,
                color: COLORS_MAP.Black,
                opacity: 0.7
            },
            {
                name: "Circle Solid (30ft radius) 12x12",
                image: BlackCircle,
                height: 12,
                width: 12,
                color: COLORS_MAP.Black,
                opacity: 0.7
            },
            {
                name: "Circle Solid (50ft radius) 20x20",
                image: BlackCircle,
                height: 20,
                width: 20,
                color: COLORS_MAP.Black,
                opacity: 0.7
            },
            {
                name: "Circle Solid (60ft radius) 24x24",
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
                name: "Square Solid 1x1",
                image: BlackSolidSquare,
                height: 1,
                width: 1,
                color: COLORS_MAP.Black,
                
                opacity: 0.9,
            },
            {
                name: "Square Solid 1x2",
                image: BlackSolidSquare,
                height: 1,
                width: 2,
                color: COLORS_MAP.Black,
                
                opacity: 0.9,
            },
            {
                name: "Square Solid 2x1",
                image: BlackSolidSquare,
                height: 2,
                width: 1,
                color: COLORS_MAP.Black,
                
                opacity: 0.9,
            },
            {
                name: "Square Solid 3x1",
                image: BlackSolidSquare,
                height: 3,
                width: 1,
                color: COLORS_MAP.Black,
                
                opacity: 0.9,
            },
            {
                name: "Square Solid 4x1",
                image: BlackSolidSquare,
                height: 4,
                width: 1,
                color: COLORS_MAP.Black,
                
                opacity: 0.9,
            },
            {
                name: "Square Solid 6x1",
                image: BlackSolidSquare,
                height: 6,
                width: 1,
                color: COLORS_MAP.Black,
                
                opacity: 0.9,
            },
            {
                name: "Square Solid 2x2",
                image: BlackSolidSquare,
                height: 2,
                width: 2,
                color: COLORS_MAP.Black,
                
                opacity: 0.9,
            },
            {
                name: "Square Solid 3x3",
                image: BlackSolidSquare,
                height: 3,
                width: 3,
                color: COLORS_MAP.Black,
                
                opacity: 0.9,
            },
            {
                name: "Square Solid 6x6",
                image: BlackSolidSquare,
                height: 6,
                width: 6,
                color: COLORS_MAP.Black,
                
                opacity: 0.9,
            },
            {
                name: "Square Solid 8x8",
                image: BlackSolidSquare,
                height: 8,
                width: 8,
                color: COLORS_MAP.Black,
                
                opacity: 0.9,
            },
            {
                name: "Square Hollow 1x1",
                image: BlackSquare,
                height: 1.5,
                width: 1.5,
                color: COLORS_MAP.Black,
                
            },
            {
                name: "Square Hollow 1x2",
                image: BlackSquare,
                height: 1.5,
                width: 3,
                color: COLORS_MAP.Black,
                
            },
            {
                name: "Square Hollow 2x1",
                image: BlackSquare,
                height: 3,
                width: 1.5,
                color: COLORS_MAP.Black,
                
            },
            {
                name: "Square Hollow 2x2",
                image: BlackSquare,
                height: 3,
                width: 3,
                color: COLORS_MAP.Black,
                
            },
            {
                name: "Square Hollow 3x3",
                image: BlackSquare,
                height: 4.7,
                width: 4.7,
                color: COLORS_MAP.Black,
                
            },
            {
                name: "Square Hollow 6x6",
                image: BlackSquare,
                height: 10,
                width: 10,
                color: COLORS_MAP.Black,
                
            },
            {
                name: "Square Hollow 8x8",
                image: BlackSquare,
                height: 13,
                width: 13,
                color: COLORS_MAP.Black,
                
            },
        ]
    },
    {
        name: "Spell Effects",
        id: "spells",
        tokens: [
            {
                name: "Animated Circle Thin 1x1",
                image: RotatingSpellThin,
                height: 1,
                width: 1,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Circle Thin (5ft radius) 2x2",
                image: RotatingSpellThin,
                height: 2,
                width: 2,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Circle Thin (10ft radius) 4x4",
                image: RotatingSpellThin,
                height: 4,
                width: 4,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Circle Thin (15ft radius) 6x6",
                image: RotatingSpellThin,
                height: 6,
                width: 6,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Circle Thin (20ft radius) 8x8",
                image: RotatingSpellThin,
                height: 8,
                width: 8,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Circle Thin (30ft radius) 12x12",
                image: RotatingSpellThin,
                height: 12,
                width: 12,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Circle Thin (50ft radius) 20x20",
                image: RotatingSpellThin,
                height: 20,
                width: 20,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Circle Thin (60ft radius) 24x24",
                image: RotatingSpellThin,
                height: 24,
                width: 24,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Circle Cyclone 1x1",
                image: RotatingSpell,
                height: 1,
                width: 1,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Circle Cyclone (5ft radius) 2x2",
                image: RotatingSpell,
                height: 2,
                width: 2,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Circle Cyclone (10ft radius) 4x4",
                image: RotatingSpell,
                height: 4,
                width: 4,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Circle Cyclone (15ft radius) 6x6",
                image: RotatingSpell,
                height: 6,
                width: 6,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Circle Cyclone (20ft radius) 8x8",
                image: RotatingSpell,
                height: 8,
                width: 8,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Circle Cyclone (30ft radius) 12x12",
                image: RotatingSpell,
                height: 12,
                width: 12,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Circle Cyclone (50ft radius) 20x20",
                image: RotatingSpell,
                height: 20,
                width: 20,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Circle Cyclone (60ft radius) 24x24",
                image: RotatingSpell,
                height: 24,
                width: 24,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Fog 1x1",
                image: Cloud,
                height: 1,
                width: 1,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Fog 2x2",
                image: Cloud,
                height: 2,
                width: 2,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Fog 3x3",
                image: Cloud,
                height: 3,
                width: 3,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Fog 4x4",
                image: Cloud,
                height: 4,
                width: 4,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Fog 5x5",
                image: Cloud,
                height: 5,
                width: 5,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Fog 6x6",
                image: Cloud,
                height: 6,
                width: 6,
                color: COLORS_MAP.Black,
                opacity: 0.9
            },
            {
                name: "Animated Lightning",
                image: Lightning,
                height: 1,
                width: 1,
                opacity: 0.9
            },
            {
                name: "Animated Lightning 30 feet",
                image: Lightning,
                height: 6,
                width: 1,
                opacity: 0.9
            },
            {
                name: "Animated Lightning 100 feet",
                image: Lightning,
                height: 20,
                width: 1,
                opacity: 0.9
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
                name: "Cone (40 ft)",
                image: BlueCone,
                height: 8,
                width: 8,
                color: COLORS_MAP.Black
            },
            {
                name: "Cone (50 ft)",
                image: BlueCone,
                height: 10,
                width: 10,
                color: COLORS_MAP.Black
            },
            {
                name: "Cone (60 ft)",
                image: BlueCone,
                height: 12,
                width: 12,
                color: COLORS_MAP.Black
            },
            {
                name: "Spell Wall 1x1",
                image: FireWall,
                height: 1,
                width: 1,
                color: COLORS_MAP.Black,
                
            },
            {
                name: "Spell Wall (20 ft) 1x4",
                image: FireWall,
                height: 1,
                width: 4,
                color: COLORS_MAP.Black,
                
            },
            {
                name: "Spell Wall (40 ft) 1x8",
                image: FireWall,
                height: 1,
                width: 8,
                color: COLORS_MAP.Black,
                
            },
            {
                name: "Spell Wall (60ft) 1x12",
                image: FireWall,
                height: 1,
                width: 12,
                color: COLORS_MAP.Black,
                
            },
            {
                name: "Spell Wall (80ft) 1x16",
                image: FireWall,
                height: 1,
                width: 16,
                color: COLORS_MAP.Black,
                
            },
            {
                name: "Spell Wall (100ft) 1x20",
                image: FireWall,
                height: 1,
                width: 20,
                color: COLORS_MAP.Black,
                
            },
            {
                name: "Fog 1x1",
                image: Fog1x1,
                height: 2,
                width: 2,
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
        ]
    },
    {
        id: "furniture",
        name: "Furniture",
        tokens: [
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
                name: "Ladder",
                image: Ladder,
                height: 1,
                width: 1,
                
            },
            {
                name: "Hay Bed",
                image: HayBed,
                height: 1,
                width: 1,
                
            },
            {
                name: "Wood Desk",
                image: WoodDesk,
                height: 1,
                width: 2,
                
            },
        ],
    },
    {
        id: 'roomPieces',
        name: "Room Pieces",
        tokens: [
            {
                name: "Door - Metal (5 ft)",
                image: MetalDoor,
                height: 1,
                width: 1,
                
            },
            {
                name: "Door - Metal (10 ft)",
                image: MetalDoor,
                height: 1,
                width: 2,
                
            },
            {
                name: "Door - Wood (5 ft)",
                image: WoodDoor,
                height: 1,
                width: 1,
                
            },
            {
                name: "Door - Wood (10 ft)",
                image: WoodDoor,
                height: 1,
                width: 2,
                
            },
            {
                name: "Ladder",
                image: Ladder,
                height: 1,
                width: 1,
                
            },
            {
                name: "Hay Bed",
                image: HayBed,
                height: 1,
                width: 1,
                
            },
            {
                name: "Stairs - Stone (2.5 ft)",
                image: StairsStone1x1,
                height: 1,
                width: 1,
                
            },
            {
                name: "Stairs - Stone (5 ft)",
                image: StairsStone1x1,
                height: 2,
                width: 1,
                
            },
            {
                name: "Stairs Long Stone",
                image: StairsStoneLong,
                height: 1.5,
                width: 1,
                
            },
            {
                name: "Stairs Long Stone x2",
                image: StairsStoneLong,
                height: 3,
                width: 1,
                
            },
            {
                name: "Stone Wall 1x1",
                image: StoneWall1x1,
                height: 1,
                width: 1,
                
            },
            {
                name: "Stone Wall 2x1",
                image: StoneWall2x1,
                height: 1,
                width: 2,
                
            },
            {
                name: "Stone Wall 3x1",
                image: StoneWall3x1,
                height: 1,
                width: 3,
                
            },
            {
                name: "Stone Wall 6x1",
                image: StoneWall3x1,
                height: 1,
                width: 6,
                
            },
            {
                name: "Wood Wall 1x1",
                image: WoodWall1x1,
                height: 1,
                width: 1,
                
            },
            {
                name: "Wood Wall 2x1",
                image: WoodWall2x1,
                height: 1,
                width: 2,
                
            },
            {
                name: "Wood Wall 3x1",
                image: WoodWall3x1,
                height: 1,
                width: 3,
                
            },
            {
                name: "Wood Wall 6x1",
                image: WoodWall3x1,
                height: 1,
                width: 6,
                
            },
            {
                name: "Wood Wall Cross",
                image: WoodWallCross,
                height: 1,
                width: 1,
                
            },
            {
                name: "Wood Wall T",
                image: WoodWallT,
                height: 1,
                width: 1,
                
            },
        ],
    },
    {
        id: "misc",
        name: "Misc.",
        tokens: [
            {
                name: "Animated Fog of War 1x1",
                image: Cloud,
                height: 1,
                width: 1,
            },
            {
                name: "Animated Fog of War 2x2",
                image: Cloud,
                height: 2,
                width: 2,
            },
            {
                name: "Animated Fog of War 3x3",
                image: Cloud,
                height: 3,
                width: 3,
            },
            {
                name: "Animated Fog of War 4x4",
                image: Cloud,
                height: 4,
                width: 4,
            },
            {
                name: "Animated Fog of War 5x5",
                image: Cloud,
                height: 5,
                width: 5,
            },
            {
                name: "Animated Fog of War 6x6",
                image: Cloud,
                height: 6,
                width: 6,
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
                name: "Fog 1x1",
                image: Fog1x1,
                height: 2,
                width: 2,
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
                name: "Sewer Entrance",
                image: SewerEntrance,
                height: 1,
                width: 1,
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
        ],
    },
];

export default INTERNAL_TOKENS;
