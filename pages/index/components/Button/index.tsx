import type { NextPage } from 'next'
import style from "./style.module.scss"
import { ButtonProp } from "./type"
import Profile from "../../../../Profile/Profile"

const Button: NextPage<ButtonProp> = (prop) => {
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
        {prop.children || (Profile.DefaultIcon || <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M11 44q-1.2 0-2.1-.9Q8 42.2 8 41V7q0-1.2.9-2.1Q9.8 4 11 4h16.8q.6 0 1.175.25.575.25.975.65l9.15 9.15q.4.4.65.975T40 16.2V41q0 1.2-.9 2.1-.9.9-2.1.9Zm16.55-29.2V7H11v34h26V16.3h-7.95q-.65 0-1.075-.425-.425-.425-.425-1.075ZM11 7v9.3V7v34V7Z" /></svg>)}
      </button>
      <div className={style.title}>
        {prop.title}
      </div>
    </div>
  )
}

export default Button
