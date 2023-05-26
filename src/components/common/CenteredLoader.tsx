import React from "react";
import {Box, CircularProgress} from "@mui/material";
import {CircularProgressProps} from "@mui/material/CircularProgress/CircularProgress";

export const CenteredLoader = (props: CircularProgressProps): JSX.Element => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      width: '100%',
      my: 4,
    }}
  >
    <CircularProgress
      {...props}
      sx={{
        ...props.sx,
      }}
    />
  </Box>
)