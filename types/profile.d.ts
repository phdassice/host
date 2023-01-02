import { ReactNode } from 'react'
import type { onClickType } from "../pages/index/components/Button/type"
import Image from "./data/index"
import Save from './type/save'

export interface BarButton {
  name: string
  icon: ReactNode
  onClick: typeof onClickType
}

export interface MianButton {
  name: string
  cml: string
  icon?: ReactNode
}

export interface MianButtonGuild {
  name: string
  buttons: Array<MianButton>
}

export interface profileType {
  username: string
  customText?:string
  DefaultIcon?: ReactNode
  mainButtons: Array<MianButtonGuild>
  menuBarButtons: Array<BarButton>
  save?: Save
  Image: typeof Image
}
