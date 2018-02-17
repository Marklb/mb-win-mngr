export interface IVirtualDesktopProcessItem {
  index: number,
  hWnd: number
}

export interface IVirtualDesktop {
  desktopName: string,
  processItems: IVirtualDesktopProcessItem[]
}

export enum VirtualDesktopActionState {
  Disabled = 'Disabled',
  Working = 'Working',
  ProcessSelect = 'ProcessSelect'
}

export interface IVirtualDesktopInitialState {
  virtualDesktops: IVirtualDesktop[]
  selectedVirtualDesktopIndex: number
  actionState: VirtualDesktopActionState
}
