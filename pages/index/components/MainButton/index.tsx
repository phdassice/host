import type { NextPage } from 'next'
import { ReactNode } from 'react'
import style from "./style.module.scss"

interface ClickTypeFetch {
  type: "fetch"
  url: string
  body: string
  onRes?: (res: object) => void
}

interface ClickTypeOther {
  type: "other"
  func: () => void
}

interface ButtonProp {
  children: ReactNode
  style: "main" | "bar"
  title: string
  onClick: ClickTypeFetch | ClickTypeOther
}

const MainButton: NextPage<ButtonProp> = (prop) => {
  const onClick = prop.onClick

  let clickEvent = () => { }

  if (onClick.type == "fetch") {
    clickEvent = () => {
      fetch(onClick.url, {
        method: "POST",
        body: onClick.body
      }).then(
        async res => {
          if (onClick.onRes) {
            onClick.onRes(await res.json())
          }
        }
      )
    }
  } else {
    clickEvent = onClick.func
  }

  return (
    <div className={style.mainButton} btn-sty={prop.style} onClick={clickEvent} hover-tips={prop.title}>
      <button className={style.icon}>
        {prop.children}
      </button>
      <div className={style.title}>
        {prop.title}
      </div>
    </div>
  )
}

export default MainButton