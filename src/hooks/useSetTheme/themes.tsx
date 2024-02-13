
type Theme = {
    name: string,
    light: string,
    dark: string,
    primary: string, //med contrasting color
    secondary: string, // high contrasting color
    tertiary: string, // accent color
    neutral: string, // middle color
    error: string,
    success: string,
    background: string,
    floatingContainer: string,
    isLight: boolean
}

const themes: Theme[] = [
    {
        name: "Cheeseburger",
        light: "white",
        dark: "#0f1417",
        primary: "#c003ff",
        secondary: "#ff00f7",
        tertiary: "orange",
        neutral: "mediumblue",
        error: "firebrick",
        success: "green",
        background: "linear-gradient(207deg, rgba(2,0,36,1) 61%, rgba(42,9,121,1) 100%, rgba(117,0,255,1) 100%)",
        floatingContainer: "#0200248f",
        isLight: false,
    },
    {
        name: "Quito",
        light: "#c4c2c2",
        dark: "#000000",
        primary: "#ff0000",
        secondary: "#242424",
        tertiary: "purple",
        neutral: "gray",
        error: "red",
        success: "grey",
        background: "white",
        floatingContainer: "#c4c2c280",
        isLight: true
    },
    {
        name: "Lola",
        light: "#f1eaa8",
        dark: "#2f2308",
        primary: "#de9904",
        secondary: "#67a120",
        tertiary: "gold",
        neutral: "643f1e", // should I keep this transparent?
        error: "firebrick",
        success: "green",
        background: "linear-gradient(246deg, rgba(19,24,13,1) 11%, rgba(11,24,11,1) 100%)",
        floatingContainer: "#2f230880",
        isLight: false
    },
    {
        name: "Alaska",
        light: "#d6f3ff",
        dark: "#001f29",
        primary: "#006b8f",
        secondary: "#7a152e",
        tertiary: "#b98389",
        neutral: "#003052", // should I keep this transparent?
        error: "firebrick",
        success: "green",
        background: "#02064b",
        floatingContainer: "#001f2980",
        isLight: false
    }
];

export default themes;