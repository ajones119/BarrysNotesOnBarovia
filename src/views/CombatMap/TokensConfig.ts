import Wolf from "@images/GenericMonsters/animal.png"
import WoodPile from "@images/MapTokens/WoodPile1x1.png"
import Fog1x1 from "@images/MapTokens/Fog1x1.png"
import Fog2x2 from "@images/MapTokens/Fog2x2.png"
import Fog5x3 from "@images/MapTokens/Fog5x3.png"
import Bush2x2 from "@images/MapTokens/Bush2x2.png"
import BlackCircle from "@images/MapTokens/BlackCircleOutline.png"
import BlackSquare from "@images/MapTokens/BlackSquareOutline.png"
import BlueCone from "@images/MapTokens/bluecone.png"


export type InternalToken = {
    image: string;
    name: string;
    height: number;
    width: number;
    color?: string;
}

const INTERNAL_TOKENS: Array<InternalToken> = [
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
        name: "Circle 1x1",
        image: BlackCircle,
        height: 1,
        width: 1
    },
    {
        name: "Circle-Black (5ft radius) 2x2",
        image: BlackCircle,
        height: 2.2,
        width: 2.2
    },
    {
        name: "Circle-Black (10ft radius) 4x4",
        image: BlackCircle,
        height: 4.5,
        width: 4.5
    },
    {
        name: "Circle-Black (15ft radius) 6x6",
        image: BlackCircle,
        height: 6.8,
        width: 6.8
    },
    {
        name: "Circle-Black (20ft radius) 8x8",
        image: BlackCircle,
        height: 9,
        width: 9
    },
    {
        name: "Circle-Black (50ft radius) 20x20",
        image: BlackCircle,
        height: 22.6,
        width: 22.6
    },
    {
        name: "Circle-Black (60ft radius) 24x24",
        image: BlackCircle,
        height: 27.2,
        width: 27.2
    },
    {
        name: "Cone-Blue (10 ft)",
        image: BlueCone,
        height: 2,
        width: 2
    },
    {
        name: "Cone-Blue (15 ft)",
        image: BlueCone,
        height: 3,
        width: 3
    },
    {
        name: "Cone-Blue (20 ft)",
        image: BlueCone,
        height: 4,
        width: 4
    },
    {
        name: "Cone-Blue (25 ft)",
        image: BlueCone,
        height: 5,
        width: 5
    },
    {
        name: "Cone-Blue (30 ft)",
        image: BlueCone,
        height: 6,
        width: 6
    },
    {
        name: "Fog 1x1",
        image: Fog1x1,
        height: 3,
        width: 3
    },
    {
        name: "Fog 2x2",
        image: Fog2x2,
        height: 3,
        width: 3
    },
    {
        name: "Fog 4x4",
        image: Fog2x2,
        height: 6,
        width: 6
    },
    {
        name: "Fog 8x8",
        image: Fog2x2,
        height: 12,
        width: 12
    },
    {
        name: "Fog 5x1",
        image: Fog5x3,
        height: 3,
        width: 7
    },
    {
        name: "Fog 5x3",
        image: Fog5x3,
        height: 6,
        width: 7
    },
    {
        name: "Square-Black 1x1",
        image: BlackSquare,
        height: 1.5,
        width: 1.5,
        color: "#000000"
    },
    {
        name: "Square-Black 1x2",
        image: BlackSquare,
        height: 1.5,
        width: 3
    },
    {
        name: "Square-Black 2x1",
        image: BlackSquare,
        height: 3,
        width: 1.5
    },
    {
        name: "Square-Black 2x2",
        image: BlackSquare,
        height: 3,
        width: 3
    },
    {
        name: "Square-Black 3x3",
        image: BlackSquare,
        height: 4.7,
        width: 4.7
    },
    {
        name: "Square-Black 6x6",
        image: BlackSquare,
        height: 10,
        width: 10
    },
    {
        name: "Square-Black 8x8",
        image: BlackSquare,
        height: 13,
        width: 13
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