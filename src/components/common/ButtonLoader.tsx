import {CircularProgress} from "@mui/material";
import React from "react";

export const ButtonLoader = () => {
  return (
    <CircularProgress size={20} sx={theme => ({
      ml: 1,
      color: theme.palette.custom.contrastTextColor,
    })}/>
  )
}