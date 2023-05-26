import React from "react";

export interface ISidebarContext {
  open: boolean,
  setOpen: (value: boolean) => void,
}

export const SidebarContext = React.createContext<ISidebarContext | null>(null)