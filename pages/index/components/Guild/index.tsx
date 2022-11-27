import type { NextPage } from 'next'
import { ReactNode } from 'react'
import style from "./style.module.scss"

interface ButtonProp {
  children: ReactNode
  title: string
}

const MainButton: NextPage<ButtonProp> = (prop) => {
  return (
    <div className={style.Guild}>
      <div className={style.title}>
        {prop.title}
      </div>
      <div className={style.children}>
        {prop.children}
      </div>
    </div>
  )
}

export default MainButton