import {ReactNode} from "react";
import {Box} from "@mui/material";

interface IProps {
  currentIndex: number,
  items: {
    children: ReactNode,
  }[],
}

export const CommonTabPanels = ({currentIndex, items}: IProps) => {
  return (
    <>
      {
        items.map((item, i) => (
          <Box
            sx={{
              display: currentIndex !== i ? 'none' : undefined,
            }}
            key={i}
          >
            {item.children}
          </Box>
        ))
      }
    </>
  )
}