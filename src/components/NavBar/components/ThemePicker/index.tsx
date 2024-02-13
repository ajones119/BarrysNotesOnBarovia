import React from "react";
import css from "./ThemePicker.module.scss"
import themes from "@hooks/useSetTheme/themes";
import useSetTheme from "@hooks/useSetTheme";

const ThemePicker = () => {
    const {theme: savedTheme, setTheme} = useSetTheme();

    return (
        <div className={css.themePickerContainer}>
            {
                themes.map(theme => (
                    <div className={`${css.themeContainer} ${theme.name === savedTheme.name ? css.selected : null}`} onClick={() => setTheme(theme.name)}>
                        <div className={css.themeName}>
                            {theme.name}
                        </div>
                        <div className={css.themeColorsContainer}>
                            
                            <div className={css.color} style={{backgroundColor: theme.primary}} />
                            <div className={css.color} style={{backgroundColor: theme.secondary}} />
                            <div className={css.color} style={{backgroundColor: theme.tertiary}} />
                            <div className={css.color} style={{backgroundColor: theme.neutral}} />
                            <div className={css.color} style={{backgroundColor: theme.light}} />
                            <div className={css.color} style={{backgroundColor: theme.dark}} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ThemePicker;