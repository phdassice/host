export interface execCommand {
    type: "execCommand",
    cmd: string
}

export interface other {
    type: "other",
    cmd: () => void
}

export interface ContextMenuButtonType {
    type: "button"
    name: string
    function: execCommand | other
    icon?: ReactDOM
    hotkey?: string
}
export interface ContextMenuClipLineType {
    type: "ClipLine"
}

export interface ContextMenuProp {
    otherButton?: Array<ContextMenuButtonType | ContextMenuClipLineType>
}