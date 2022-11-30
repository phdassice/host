import type { NextPage } from 'next'
import React, { ReactNode, useEffect } from 'react'
import functions from '../data/module/functions'

import style from "./index.module.scss"

import Images from "./data"

import HoverTips from "../data/components/HoverTips"
import MainButton from "./index/components/MainButton"
import Guild from "./index/components/Guild"

import Profile from '../data/Profile'

const insetFunction = {
  lockScreen: {
    Logout: function () { },
    Login: function () { },
  },
  Power: {
    on: function () { },
    off: function () { },
  },
  Shutdown: {
    on: function () { },
    off: function () { },
    Shutdown: function (type: "shutdown" | "restart") { },
    Lock: function () { }
  }
}

interface MainButtonMainEz {
  children: ReactNode
  title: string
  cml: string
}

const MainButtonMainEz: NextPage<MainButtonMainEz> = (prop) => {
  return (
    <MainButton style='main' title={prop.title} onClick={{
      type: "fetch",
      url: "./api/system",
      body: prop.cml
    }}>
      {prop.children}
    </MainButton>
  )
}

const Main: NextPage = () => {
  useEffect(() => {
    {
      const mainRoot = document.getElementsByClassName(style.mainScreen)[0]

      {
        const root = document.getElementsByClassName(style.lockScreen)[0]
        const rootForEle = root.getElementsByClassName(style.main)[0].getElementsByTagName("div")[0]
        const tips = rootForEle.getElementsByClassName(style.tips)[0]
        const input = rootForEle.getElementsByClassName(style.input)[0].getElementsByTagName("input")[0]
        const sendbutton = rootForEle.getElementsByClassName(style.input)[0].getElementsByClassName(style.send)[0]

        insetFunction.lockScreen.Login = function () {
          functions.fetch("system", "-login " + input.value, (res) => {
            const code = res.code

            if (code == "Login") {
              input.blur()
              root.classList.remove(style.pe)
              tips.classList.remove(style.n)
              tips.classList.add(style.y)
              setTimeout(() => {
                root.classList.remove(style.show)
                setTimeout(() => {
                  input.value = ""
                  mainRoot.classList.add(style.pe)
                  mainRoot.classList.add(style.show)
                }, 2e3)
              }, 1e3)
              return
            }

            input.value = ""
            tips.classList.add(style.n)
          })
        }

        let isFoces = 0
        input.addEventListener("focus", () => { isFoces = 1 })
        input.addEventListener("blur", () => { isFoces = 0 })

        document.addEventListener("keydown", ({ code: keyCode }) => {
          if ((keyCode == "Enter" || keyCode == "NumpadEnter") && isFoces) {
            insetFunction.lockScreen.Login()
          }
        })

        sendbutton.addEventListener("click", () => {
          insetFunction.lockScreen.Login()
        })

        insetFunction.lockScreen.Logout = function () {
          functions.fetch("system", "-logout")

          {
            mainRoot.classList.remove(style.pe)
            mainRoot.classList.remove(style.show)
          }
          tips.classList.remove(style.y)

          setTimeout(() => {
            root.classList.add(style.pe)
            root.classList.add(style.show)
          }, 2e3)
        }
      }


      {
        const root = document.getElementsByClassName(style.shudown)[0]
        const text = root.getElementsByClassName(style.text)[0].getElementsByTagName("span")[0]

        insetFunction.Shutdown.Shutdown = function (type: "shutdown" | "restart") {
          mainRoot.classList.remove(style.pe)
          mainRoot.classList.remove(style.show)

          if (type == "restart") {
            text.innerHTML = "重開"
          } else {
            text.innerHTML = "關機"
          }

          root.classList.add(style.show)
        }
      }

      {
        const root = mainRoot.getElementsByClassName(style.power)[0]

        insetFunction.Power.on = function () {
          root.classList.add(style.show)
        }

        insetFunction.Power.off = function () {
          root.classList.remove(style.show)
        }

      }
    }

    functions.fetch("system", "?isLogin", (res) => {
      const code = res.code
      if (code == "isLogin") {
        {
          const ele = document.getElementsByClassName(style.mainScreen)[0]
          ele.classList.add(style.pe)
          ele.classList.add(style.show)
        }

        {
          const ele = document.getElementsByClassName(style.lockScreen)[0]
          ele.classList.remove(style.pe)
          ele.classList.remove(style.show)
        }
        return
      }

      {
        const ele = document.getElementsByClassName(style.mainScreen)[0]
        ele.classList.remove(style.pe)
        ele.classList.remove(style.show)
      }
      {
        const root = document.getElementsByClassName(style.lockScreen)[0].getElementsByClassName(style.main)[0].getElementsByTagName("div")[0]
        const tips = root.getElementsByClassName(style.tips)[0]
        tips.classList.remove(style.y)

        const ele = document.getElementsByClassName(style.lockScreen)[0]
        ele.classList.add(style.pe)
        ele.classList.add(style.show)
      }

    })
  })

  return (
    <div id={style.Frame}>
      <HoverTips></HoverTips>

      <div className={style.mainScreen}>

        <div className={style.bg} style={{ backgroundImage: `url(${Images.main})` }}>
          <div className={style.filter}></div>
        </div>

        <div className={style.main}>
          <div className={style.main} overflow-bar-none="">
            <Guild title='常用'>
              <MainButtonMainEz title='Epic game' cml='start Epic'>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M11 44q-1.2 0-2.1-.9Q8 42.2 8 41V7q0-1.2.9-2.1Q9.8 4 11 4h16.8q.6 0 1.175.25.575.25.975.65l9.15 9.15q.4.4.65.975T40 16.2V41q0 1.2-.9 2.1-.9.9-2.1.9Zm16.55-29.2V7H11v34h26V16.3h-7.95q-.65 0-1.075-.425-.425-.425-.425-1.075ZM11 7v9.3V7v34V7Z" /></svg>
              </MainButtonMainEz>
              <MainButtonMainEz title='Visual Studio Code' cml='start code'>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M11 44q-1.2 0-2.1-.9Q8 42.2 8 41V7q0-1.2.9-2.1Q9.8 4 11 4h16.8q.6 0 1.175.25.575.25.975.65l9.15 9.15q.4.4.65.975T40 16.2V41q0 1.2-.9 2.1-.9.9-2.1.9Zm16.55-29.2V7H11v34h26V16.3h-7.95q-.65 0-1.075-.425-.425-.425-.425-1.075ZM11 7v9.3V7v34V7Z" /></svg>
              </MainButtonMainEz>
              <MainButtonMainEz title='Dicodrd' cml='C:/Users/user/AppData/Local/Discord/Update.exe --processStart Discord.exe'>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M11 44q-1.2 0-2.1-.9Q8 42.2 8 41V7q0-1.2.9-2.1Q9.8 4 11 4h16.8q.6 0 1.175.25.575.25.975.65l9.15 9.15q.4.4.65.975T40 16.2V41q0 1.2-.9 2.1-.9.9-2.1.9Zm16.55-29.2V7H11v34h26V16.3h-7.95q-.65 0-1.075-.425-.425-.425-.425-1.075ZM11 7v9.3V7v34V7Z" /></svg>
              </MainButtonMainEz>
              <MainButtonMainEz title='VMBox不可用' cml='start VirtualBox.exe'>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M11 44q-1.2 0-2.1-.9Q8 42.2 8 41V7q0-1.2.9-2.1Q9.8 4 11 4h16.8q.6 0 1.175.25.575.25.975.65l9.15 9.15q.4.4.65.975T40 16.2V41q0 1.2-.9 2.1-.9.9-2.1.9Zm16.55-29.2V7H11v34h26V16.3h-7.95q-.65 0-1.075-.425-.425-.425-.425-1.075ZM11 7v9.3V7v34V7Z" /></svg>
              </MainButtonMainEz>
            </Guild>
            <Guild title='Steam游戲'>
              <MainButtonMainEz title='我的夏季汽車' cml='start steam://rungameid/516750'>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M11 44q-1.2 0-2.1-.9Q8 42.2 8 41V7q0-1.2.9-2.1Q9.8 4 11 4h16.8q.6 0 1.175.25.575.25.975.65l9.15 9.15q.4.4.65.975T40 16.2V41q0 1.2-.9 2.1-.9.9-2.1.9Zm16.55-29.2V7H11v34h26V16.3h-7.95q-.65 0-1.075-.425-.425-.425-.425-1.075ZM11 7v9.3V7v34V7Z" /></svg>
              </MainButtonMainEz>
              <MainButtonMainEz title='War Robots' cml='start steam://rungameid/767560'>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M11 44q-1.2 0-2.1-.9Q8 42.2 8 41V7q0-1.2.9-2.1Q9.8 4 11 4h16.8q.6 0 1.175.25.575.25.975.65l9.15 9.15q.4.4.65.975T40 16.2V41q0 1.2-.9 2.1-.9.9-2.1.9Zm16.55-29.2V7H11v34h26V16.3h-7.95q-.65 0-1.075-.425-.425-.425-.425-1.075ZM11 7v9.3V7v34V7Z" /></svg>
              </MainButtonMainEz>
            </Guild>
            <Guild title='Shell'>
              <MainButtonMainEz title='cmd' cml='start cmd'>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M26 33.6q-.65 0-1.075-.425-.425-.425-.425-1.075 0-.65.425-1.075Q25.35 30.6 26 30.6h8q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075-.425.425-1.075.425Zm-12.05-1.25q-.45-.45-.425-1.05.025-.6.425-1.05l4.1-4.15-4.1-4.15q-.45-.45-.45-1.05 0-.6.45-1.05.45-.45 1.05-.45.6 0 1.05.45l5.2 5.2q.25.25.325.5.075.25.075.55 0 .3-.075.55-.075.25-.325.5l-5.2 5.2q-.45.45-1.05.45-.6 0-1.05-.45ZM7 40q-1.2 0-2.1-.9Q4 38.2 4 37V11q0-1.2.9-2.1Q5.8 8 7 8h34q1.2 0 2.1.9.9.9.9 2.1v26q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h34V15.2H7V37Z" /></svg>
              </MainButtonMainEz>
              <MainButtonMainEz title='powershell' cml='start powershell'>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M26 33.6q-.65 0-1.075-.425-.425-.425-.425-1.075 0-.65.425-1.075Q25.35 30.6 26 30.6h8q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075-.425.425-1.075.425Zm-12.05-1.25q-.45-.45-.425-1.05.025-.6.425-1.05l4.1-4.15-4.1-4.15q-.45-.45-.45-1.05 0-.6.45-1.05.45-.45 1.05-.45.6 0 1.05.45l5.2 5.2q.25.25.325.5.075.25.075.55 0 .3-.075.55-.075.25-.325.5l-5.2 5.2q-.45.45-1.05.45-.6 0-1.05-.45ZM7 40q-1.2 0-2.1-.9Q4 38.2 4 37V11q0-1.2.9-2.1Q5.8 8 7 8h34q1.2 0 2.1.9.9.9.9 2.1v26q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h34V15.2H7V37Z" /></svg>
              </MainButtonMainEz>
            </Guild>
            <Guild title='系統'>
              <MainButtonMainEz title='控制臺' cml='start control'>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M7.5 37.9q-.65 0-1.075-.425Q6 37.05 6 36.4q0-.65.425-1.075Q6.85 34.9 7.5 34.9h9.35q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075-.425.425-1.075.425Zm0-24.8q-.65 0-1.075-.425Q6 12.25 6 11.6q0-.65.425-1.075Q6.85 10.1 7.5 10.1h17.65q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075-.425.425-1.075.425ZM22.85 42q-.65 0-1.075-.425-.425-.425-.425-1.075v-8.25q0-.65.425-1.075.425-.425 1.075-.425.65 0 1.075.425.425.425.425 1.075v2.65H40.5q.65 0 1.075.425Q42 35.75 42 36.4q0 .65-.425 1.075-.425.425-1.075.425H24.35v2.6q0 .65-.425 1.075Q23.5 42 22.85 42Zm-6-12.4q-.65 0-1.075-.425-.425-.425-.425-1.075v-2.6H7.5q-.65 0-1.075-.425Q6 24.65 6 24q0-.65.425-1.075Q6.85 22.5 7.5 22.5h7.85v-2.7q0-.65.425-1.075.425-.425 1.075-.425.65 0 1.075.425.425.425.425 1.075v8.3q0 .65-.425 1.075-.425.425-1.075.425Zm6-4.1q-.65 0-1.075-.425-.425-.425-.425-1.075 0-.65.425-1.075.425-.425 1.075-.425H40.5q.65 0 1.075.425Q42 23.35 42 24q0 .65-.425 1.075-.425.425-1.075.425Zm8.3-8.25q-.65 0-1.075-.425-.425-.425-.425-1.075V7.5q0-.65.425-1.075Q30.5 6 31.15 6q.65 0 1.075.425.425.425.425 1.075v2.6h7.85q.65 0 1.075.425Q42 10.95 42 11.6q0 .65-.425 1.075-.425.425-1.075.425h-7.85v2.65q0 .65-.425 1.075-.425.425-1.075.425Z" /></svg>
              </MainButtonMainEz>
              <MainButtonMainEz title='工作管理員' cml='start taskmgr'>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9 42q-1.25 0-2.125-.875T6 39V9q0-1.25.875-2.125T9 6h30q1.25 0 2.125.875T42 9v30q0 1.25-.875 2.125T39 42Zm0-3h30V13H9v26Zm6.5-15.5q-.65 0-1.075-.425Q14 22.65 14 22q0-.65.425-1.075.425-.425 1.075-.425H32q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075-.425.425-1.075.425Zm0 8q-.65 0-1.075-.425Q14 30.65 14 30q0-.65.425-1.075.425-.425 1.075-.425H24q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075-.425.425-1.075.425Z" /></svg>
              </MainButtonMainEz>
            </Guild>
          </div>

          <div className={style.bar}>
            <div className={style.main}>
              <div>
                <MainButton style='bar' title='檔案總管' onClick={{
                  type: "fetch",
                  url: "./api/system",
                  body: "start explorer",
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8H19.8q.6 0 1.175.25.575.25.975.65l2.1 2.1h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Zm0-29v26h34V14H22.8l-3-3H7.05Zm0 0v26Z" /></svg>
                </MainButton>
                <MainButton style='bar' title='工作管理員' onClick={{
                  type: "fetch",
                  url: "./api/system",
                  body: "start taskmgr",
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9 42q-1.25 0-2.125-.875T6 39V9q0-1.25.875-2.125T9 6h30q1.25 0 2.125.875T42 9v30q0 1.25-.875 2.125T39 42Zm0-3h30V13H9v26Zm6.5-15.5q-.65 0-1.075-.425Q14 22.65 14 22q0-.65.425-1.075.425-.425 1.075-.425H32q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075-.425.425-1.075.425Zm0 8q-.65 0-1.075-.425Q14 30.65 14 30q0-.65.425-1.075.425-.425 1.075-.425H24q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075-.425.425-1.075.425Z" /></svg>
                </MainButton>
              </div>
              <div className={style.other}>
                <MainButton style='bar' title='電源選項' onClick={{
                  type: "other",
                  func() {
                    insetFunction.Power.on()
                  },
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 26.1q-.65 0-1.075-.425-.425-.425-.425-1.075V7.3q0-.65.425-1.075Q23.35 5.8 24 5.8q.65 0 1.075.425.425.425.425 1.075v17.3q0 .65-.425 1.075-.425.425-1.075.425Zm0 16q-3.75 0-7.025-1.425-3.275-1.425-5.7-3.85-2.425-2.425-3.85-5.7Q6 27.85 6 24.1q0-3.55 1.4-6.775 1.4-3.225 3.9-5.775.45-.45 1.125-.475.675-.025 1.125.425.45.45.375 1.075-.075.625-.525 1.075-2.1 2.1-3.25 4.775Q9 21.1 9 24.1q0 6.25 4.375 10.625T24 39.1q6.25 0 10.625-4.375T39 24.1q0-3-1.125-5.7t-3.225-4.8q-.45-.45-.5-1.075-.05-.625.4-1.025.5-.5 1.175-.425.675.075 1.175.575 2.45 2.55 3.775 5.75Q42 20.6 42 24.1q0 3.75-1.425 7.025-1.425 3.275-3.85 5.7-2.425 2.425-5.7 3.85Q27.75 42.1 24 42.1Z" /></svg>
                </MainButton>
                <MainButton style='bar' title='登出' onClick={{
                  type: "other",
                  func() {
                    insetFunction.lockScreen.Logout()
                  },
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M32.25 31.65q-.45-.45-.45-1.1 0-.65.45-1.05l4-4h-16q-.65 0-1.075-.425-.425-.425-.425-1.075 0-.65.425-1.075.425-.425 1.075-.425h15.9l-4.05-4.05q-.4-.4-.4-1.025 0-.625.45-1.075.45-.45 1.075-.45t1.075.45L40.95 23q.25.25.35.5.1.25.1.55 0 .3-.1.55-.1.25-.35.5l-6.6 6.6q-.4.4-1.025.4-.625 0-1.075-.45ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.05q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075Q22.7 9 22.05 9H9v30h13.05q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075Q22.7 42 22.05 42Z" /></svg>
                </MainButton>
              </div>
            </div>
          </div>
        </div>

        <div className={style.power}>
          <div className={style.bar}>
            <MainButton style='power' title='關機' onClick={{
              type: "other",
              func() {
                functions.fetch("system", "shutdown -t 0 -s");
                insetFunction.Shutdown.Shutdown("shutdown")
                insetFunction.Power.off()
              },
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 26.1q-.65 0-1.075-.425-.425-.425-.425-1.075V7.3q0-.65.425-1.075Q23.35 5.8 24 5.8q.65 0 1.075.425.425.425.425 1.075v17.3q0 .65-.425 1.075-.425.425-1.075.425Zm0 16q-3.75 0-7.025-1.425-3.275-1.425-5.7-3.85-2.425-2.425-3.85-5.7Q6 27.85 6 24.1q0-3.55 1.4-6.775 1.4-3.225 3.9-5.775.45-.45 1.125-.475.675-.025 1.125.425.45.45.375 1.075-.075.625-.525 1.075-2.1 2.1-3.25 4.775Q9 21.1 9 24.1q0 6.25 4.375 10.625T24 39.1q6.25 0 10.625-4.375T39 24.1q0-3-1.125-5.7t-3.225-4.8q-.45-.45-.5-1.075-.05-.625.4-1.025.5-.5 1.175-.425.675.075 1.175.575 2.45 2.55 3.775 5.75Q42 20.6 42 24.1q0 3.75-1.425 7.025-1.425 3.275-3.85 5.7-2.425 2.425-5.7 3.85Q27.75 42.1 24 42.1Z" /></svg>
            </MainButton>
            <MainButton style='power' title='重開' onClick={{
              type: "other",
              func() {
                functions.fetch("system", "shutdown -t 0 -r");
                insetFunction.Shutdown.Shutdown("restart")
                insetFunction.Power.off()
              },
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 40q-6.65 0-11.325-4.675Q8 30.65 8 24q0-6.65 4.675-11.325Q17.35 8 24 8q4.25 0 7.45 1.725T37 14.45V9.5q0-.65.425-1.075Q37.85 8 38.5 8q.65 0 1.075.425Q40 8.85 40 9.5v9.7q0 .65-.425 1.075-.425.425-1.075.425h-9.7q-.65 0-1.075-.425-.425-.425-.425-1.075 0-.65.425-1.075.425-.425 1.075-.425h6.9q-1.9-3-4.85-4.85Q27.9 11 24 11q-5.45 0-9.225 3.775Q11 18.55 11 24q0 5.45 3.775 9.225Q18.55 37 24 37q3.9 0 7.15-2.075Q34.4 32.85 36 29.35q.2-.4.65-.7.45-.3.9-.3.85 0 1.225.55.375.55.075 1.3-1.85 4.45-5.875 7.125T24 40Z" /></svg>
            </MainButton>
            <MainButton style='power' title='鎖定' onClick={{
              type: "other",
              func() {
                functions.fetch("system", "Rundll32.exe user32.dll,LockWorkStation");
                insetFunction.Power.off()
              },
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" ><path d="M11 44q-1.25 0-2.125-.875T8 41V19.3q0-1.25.875-2.125T11 16.3h3.5v-4.8q0-3.95 2.775-6.725Q20.05 2 24 2q3.95 0 6.725 2.775Q33.5 7.55 33.5 11.5v4.8H37q1.25 0 2.125.875T40 19.3V41q0 1.25-.875 2.125T37 44Zm0-3h26V19.3H11V41Zm13-7q1.6 0 2.725-1.1t1.125-2.65q0-1.5-1.125-2.725T24 26.3q-1.6 0-2.725 1.225T20.15 30.25q0 1.55 1.125 2.65Q22.4 34 24 34Zm-6.5-17.7h13v-4.8q0-2.7-1.9-4.6Q26.7 5 24 5q-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6ZM11 41V19.3 41Z" /></svg>
            </MainButton>
            <MainButton style='power' title='有儀式感的關機 (For Windows)' onClick={{
              type: "other",
              func() {
                functions.fetch("system", " SlideToShutDown");
                insetFunction.Power.off()
              },
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 26.1q-.65 0-1.075-.425-.425-.425-.425-1.075V7.3q0-.65.425-1.075Q23.35 5.8 24 5.8q.65 0 1.075.425.425.425.425 1.075v17.3q0 .65-.425 1.075-.425.425-1.075.425Zm0 16q-3.75 0-7.025-1.425-3.275-1.425-5.7-3.85-2.425-2.425-3.85-5.7Q6 27.85 6 24.1q0-3.55 1.4-6.775 1.4-3.225 3.9-5.775.45-.45 1.125-.475.675-.025 1.125.425.45.45.375 1.075-.075.625-.525 1.075-2.1 2.1-3.25 4.775Q9 21.1 9 24.1q0 6.25 4.375 10.625T24 39.1q6.25 0 10.625-4.375T39 24.1q0-3-1.125-5.7t-3.225-4.8q-.45-.45-.5-1.075-.05-.625.4-1.025.5-.5 1.175-.425.675.075 1.175.575 2.45 2.55 3.775 5.75Q42 20.6 42 24.1q0 3.75-1.425 7.025-1.425 3.275-3.85 5.7-2.425 2.425-5.7 3.85Q27.75 42.1 24 42.1Z" /></svg>
            </MainButton>
          </div>

          <div className={style.exit} onClick={() => insetFunction.Power.off()}></div>
        </div>
      </div>

      <div className={style.lockScreen}>

        <div className={style.bg} style={{ backgroundImage: `url(${Images.lock})` }}>
          <div className={style.filter}></div>
        </div>

        <div className={style.main}>
          <div>
            <div className={style.avatar} style={{ backgroundImage: `url(${Images.avatar})` }}></div>

            <div className={style.name}>{Profile.username}</div>

            <div className={style.input}>
              <input type="password" placeholder='輸入密碼' hover-tips="輸入密碼" />
              <button className={style.send} hover-tips="確認密碼"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M13.3 17.275q-.3-.3-.288-.725.013-.425.313-.725L16.15 13H5q-.425 0-.713-.288Q4 12.425 4 12t.287-.713Q4.575 11 5 11h11.15L13.3 8.15q-.3-.3-.3-.713 0-.412.3-.712t.713-.3q.412 0 .712.3L19.3 11.3q.15.15.213.325.062.175.062.375t-.062.375q-.063.175-.213.325l-4.6 4.6q-.275.275-.687.275-.413 0-.713-.3Z" /></svg></button>
            </div>

            <div className={style.tips}>
              <div className={style.y}>密碼正確</div>
              <div className={style.n}>密碼錯誤</div>
            </div>
          </div>
        </div>

      </div>

      <div className={style.shudown}>
        <div className={style.text}>正在<span>[power]</span>...</div>
      </div>

    </div>
  )
}

export default Main