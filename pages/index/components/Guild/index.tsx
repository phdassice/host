import type { NextPage } from 'next'
import { ReactNode } from 'react'
import style from "./style.module.scss"
import { GuildType } from "./type"


const Guild: NextPage<GuildType> = (prop) => {
  return (
    <div className={style.Guild}>
      <div className={style.title}>
        {prop.title}
      </div>
      <div className={style.children} dangerouslySetInnerHTML={prop.dangerouslySetInnerHTML}>
        {prop.children}
      </div>
    </div>
  )
}

export default Guild