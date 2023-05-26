import React, {ReactNode} from "react";
import {Box} from "@mui/material";
import welcomePrint from 'assets/images/welcome-print.png'

interface IProps {
  children: ReactNode,
}

export const LoginWrapper = ({children}: IProps) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
      backgroundImage: `url(${welcomePrint})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backdropFilter: 'opacity(20%)',
      '&:after': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
      }
    }}>
      {children}
    </Box>
  )
}