export interface ClickTypeFetch {
    type: "fetch"
    url: string
    body: string
    onRes?: (res: object) => void
}

export interface ClickTypeOther {
    type: "other"
    func: () => void
}

export let onClickType:ClickTypeFetch | ClickTypeOther

export interface ButtonProp {
    children?: ReactNode
    style: "main" | "bar" | "power"
    title: string
    onClick: typeof onClickTypes
}