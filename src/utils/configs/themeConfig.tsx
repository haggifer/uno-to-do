import {Components, createTheme, PaletteColor, PaletteColorOptions, PaletteMode} from "@mui/material";
import {Palette, Theme} from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface Theme {
    palette: Palette,
  }

  interface ThemeOptions {
    components?: Components<Omit<Theme, "components">>,
    palette?: PaletteOptions,
  }

  interface Palette {
    primary: PaletteColor,
    text: Palette['text'],
    custom: Record<string, any>,
  }

  interface PaletteOptions {
    primary?: PaletteColorOptions,
    text?: Partial<Palette['text']>,
    custom?: Record<string, any>,
  }
}

export const getTheme = (mode: PaletteMode = 'light'): Theme => {
  return createTheme({
    spacing: 5,
    components: {
      MuiButton: {
        styleOverrides: {
          root: theme => ({
            minHeight: '40px',
            borderRadius: '20px',
            padding: '5px 20px',
            fontSize: '14px',
            fontWeight: 500,
            textTransform: 'none',
            boxShadow: 'none',
          }),
        }
      },
    },
    palette: {
      mode,
      ...(mode === 'light'
          ? {
            primary: {
              main: '#5946d2',
            },
            text: {
              primary: '#1c1b1f',
            },
            custom: {
              grey: {
                1: '#f5f5f5',
                2: '#a9a8aa',
                3: '#9e9d9f',
                4: '#777679',
                5: '#727077',
              },
              red: '#f85977',
              textColor: '#1c1b1f',
              contrastTextColor: '#ffffff',
              basicBg: '#ffffff',
              welcomeBg: '#f2f0fb',
              tasksBg: '#b0a2f2',
              navItemActiveBg: '#f2f0fb',
              navTaskListIconColor: '#c8bfff',
              tasksButtonBg: '#988cd0',
              tasksButtonHoverBg: '#8f82cc',
              tasksUnsetStartBorder: '#a9a8aa',
              tasksActiveItemBg: '#cec5f7',
              importantButtonBg: '#d54f69',
              importantButtonHoverBg: '#d2425e',
              settingsToggleButtonActiveBg: '#e5dff9',
              settingsToggleButtonColor: '#a5a0ac',
              settingsToggleButtonActiveColor: '#160067',
              formItemBg: '#faf9fb',
              formItemHoverBg: 'rgba(0, 0, 0, 0.09)',
              formItemSelectedBg: 'rgba(0, 0, 0, 0.2)',
            }
          } : {
            primary: {
              main: '#9373ff',
            },
            text: {
              primary: '#e6e1e5',
            },
            custom: {
              grey: {
                '1': '#302f33',
                '2': '#6b696d',
                '3': '#757377',
                '4': '#979397',
                '5': '#979398',
              },
              red: '#d9415e',
              textColor: '#e6e1e5',
              contrastTextColor: '#ffffff',
              basicBg: '#201f24',
              welcomeBg: '#2d2c36',
              tasksBg: '#544794',
              navItemActiveBg: '#2d2c36',
              navTaskListIconColor: '#5946d2',
              tasksButtonBg: '#6b60a1',
              tasksButtonHoverBg: '#7268a5',
              tasksUnsetStartBorder: '#6b696d',
              tasksActiveItemBg: '#958dbd',
              importantButtonBg: '#db5b74',
              importantButtonHoverBg: '#dc637b',
              settingsToggleButtonActiveBg: '#474459',
              settingsToggleButtonColor: '#cac4d0',
              settingsToggleButtonActiveColor: '#e5deff',
              formItemBg: '#302f33',
              formItemHoverBg: 'rgba(255, 255, 255, 0.13)',
              formItemSelectedBg: 'rgba(255, 255, 255, 0.3)',
            }
          }
      ),
    },
  });
}