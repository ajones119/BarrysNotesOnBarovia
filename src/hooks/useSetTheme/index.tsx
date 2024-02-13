import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import themes from "./themes";

const useSetTheme = () => {
    const [themeName, setTheme] = useLocalStorage<string>("BnoBTheme", "")
    const root = document.documentElement;

    useEffect(() => {
        const foundTheme = themes.find(t => t.name === themeName) || themes[0]
        root?.style?.setProperty("--primary-color", foundTheme.primary)
        root?.style?.setProperty("--secondary-color", foundTheme.secondary)
        root?.style?.setProperty("--tertiary-color", foundTheme.tertiary)
        root?.style?.setProperty("--neutral-color", foundTheme.neutral)
        root?.style?.setProperty("--error-color", foundTheme.error)
        root?.style?.setProperty("--success-color", foundTheme.success)
        root?.style?.setProperty("--light-color", foundTheme.light)
        root?.style?.setProperty("--dark-color", foundTheme.dark)
        root?.style?.setProperty("--background-color", foundTheme.background)
        root?.style?.setProperty("--floating-container-color", foundTheme.floatingContainer)


    }, [themeName])

    return {themeName, setTheme, theme: themes.find(t => t.name === themeName) || themes[0] };
}

export default useSetTheme;