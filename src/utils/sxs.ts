import {Theme} from "@mui/material/styles";
import {SystemStyleObject} from "@mui/system/styleFunctionSx/styleFunctionSx";

export const popupSx = (theme: Theme): SystemStyleObject<Theme> => ({
  width: '500px',
  maxWidth: '90vw',
  borderRadius: '28px',
  padding: '25px',
  background: theme.palette.custom.basicBg,
  zIndex: 2,
})