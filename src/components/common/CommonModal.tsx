import {Box, Modal, useMediaQuery, useTheme} from "@mui/material";
import React, {ReactElement} from "react";
import {ModalProps} from "@mui/material/Modal/Modal";

interface IProps extends ModalProps {
  children: ReactElement,
}

export const CommonModal = ({open, children, ...rest}: IProps) => {
  const theme = useTheme()

  const upMd = useMediaQuery(theme.breakpoints.up('md'))
  const upSm = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Modal
      {...rest}
      open={open}
    >
      <Box sx={theme => ({
        position: 'absolute',
        top: upSm ? '40px' : 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: upMd ? undefined : '100%',
        maxWidth: upSm ? '90vw' : undefined,
        height: upSm ? undefined : '100vh',
        borderRadius: upSm ? '28px' : undefined,
        padding: 5,
        background: theme.palette.custom.basicBg,
        zIndex: 2,
      })}>
        {children}
      </Box>
    </Modal>
  )
}