export interface IVirtualDesktop {
  desktopName: string
}

export interface IVirtualDesktopInitialState {
  virtualDesktops: IVirtualDesktop[]
  selectedVirtualDesktopIndex: number
  currentState: number
}
