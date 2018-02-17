
export interface VirtualDesktopGroupInfo {
  groupName: string
  processes: VirtualDesktopProcessGroupInfo[]
}

export interface VirtualDesktopProcessGroupInfo {
  process: any
}
