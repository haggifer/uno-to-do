import React from "react";
import {PaletteMode} from "@mui/material";

export interface IThemeModeContext {
  switchMode: (newThemeMode: PaletteMode) => void,
}

export const ThemeModeContext = React.createContext<IThemeModeContext | null>(null)