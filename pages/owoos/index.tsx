import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import functions from '../../data/module/functions'
import style from "./style.module.scss"

import ContextMenu from "../../data/components/ContextMenu"

import SaveMuisc from "./components/SaveMuisc"
import Button from "./components/Button"
import Guild from "./components/Guild"

import Profile from '../../Profile/Profile'
import HeadSetting from '../../data/components/HeadSetting'

const insetFunction = {
  screen: {
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
    },
    coolEffect: {
      isCool: function () { }
    },
    backgroundPreview: {
      open: function () { },
    },
  }
}

const OwoOs: NextPage = () => {
  useEffect(() => {
    const mainRoot = document.getElementsByClassName(style.mainScreen)[0]!
    const lockRoot = document.getElementsByClassName(style.lockScreen)[0]!
    const coolEffectRoot = document.getElementById(style.coolEffectFrame)!
    const backgroundPreviewRoot = document.getElementById(style.BackGroundPreviewFrame)!

    let isCool = false

    insetFunction.screen.coolEffect.isCool = function () {
      document.getElementById(style.Frame)!.classList.toggle(style.coolEffect)
      if (document.getElementById(style.Frame)!.classList.contains(style.coolEffect)) {
        isCool = true
      } else {
        isCool = false
        document.getElementById(style.Frame)!.getElementsByClassName(style.frame)[0].removeAttribute("style")
      }
      coolEffectRoot!.classList.toggle(style.show)
    }

    {
      const root = document.getElementsByClassName(style.lockScreen)[0]
      const rootForEle = root.getElementsByClassName(style.main)[0].getElementsByTagName("div")[0]
      const tips = rootForEle.getElementsByClassName(style.tips)[0]
      const input = rootForEle.getElementsByClassName(style.input)[0].getElementsByTagName("input")[0]
      const sendbutton = rootForEle.getElementsByClassName(style.input)[0].getElementsByClassName(style.send)[0]

      insetFunction.screen.lockScreen.Login = function () {
        functions.fetch({
          type: "system",
          options: {
            type: "Command",
            cmd: {
              type: "login",
              password: input.value
            }
          }
        }, (res) => {
          const code = res.code

          if (code === "Login") {
            input.blur()
            root.classList.remove(style.pe)
            tips.classList.remove(style.n)
            tips.classList.add(style.y)
            setTimeout(() => {
              root.classList.remove(style.show)
              coolEffectRoot!.classList.add(style.hideBg)
              setTimeout(() => {
                input.value = ""
                mainRoot.classList.add(style.pe)
                mainRoot.classList.add(style.show)
                coolEffectRoot!.classList.remove(style.hideBg)
                coolEffectRoot!.classList.add(style.login)
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
        if ((keyCode === "Enter" || keyCode === "NumpadEnter") && isFoces) {
          insetFunction.screen.lockScreen.Login()
        }
      })

      sendbutton.addEventListener("click", () => {
        insetFunction.screen.lockScreen.Login()
      })

      insetFunction.screen.lockScreen.Logout = function () {
        functions.fetch({
          type: "system",
          options: {
            type: "Command",
            cmd: {
              type: "logout",
            }
          }
        }, (e) => {
          if (e) {
            tips.classList.remove(style.y)

            coolEffectRoot!.classList.add(style.hideBg)

            setTimeout(() => {
              root.classList.add(style.pe)
              root.classList.add(style.show)
              coolEffectRoot!.classList.remove(style.login)
              coolEffectRoot!.classList.remove(style.hideBg)
            }, 2e3)
          }
        })

        mainRoot.classList.remove(style.pe)
        mainRoot.classList.remove(style.show)

      }
    }

    {
      const root = document.getElementsByClassName(style.shutdown)[0]
      const text = root.getElementsByClassName(style.text)[0].getElementsByTagName("span")[0]

      insetFunction.screen.Shutdown.Shutdown = function (type: "shutdown" | "restart") {
        mainRoot.classList.remove(style.pe)
        mainRoot.classList.remove(style.show)

        if (type === "restart") {
          text.innerHTML = "重開"
        } else {
          text.innerHTML = "關機"
        }

        root.classList.add(style.show)

        setTimeout(() => {
          root.classList.add(style.hidden)

          setTimeout(() => {
            if (type === "restart") {
              functions.fetch({
                type: "system",
                options: {
                  type: "SystemCommand",
                  cmd: "shutdown -t 0 -r"
                }
              });
            } else {
              functions.fetch({
                type: "system",
                options: {
                  type: "SystemCommand",
                  cmd: "shutdown -t 0 -s"
                }
              });
            }
          }, 3.5e3);
        }, 2e3);
      }
    }

    {
      const root = mainRoot.getElementsByClassName(style.power)[0]

      insetFunction.screen.Power.on = function () {
        root.classList.add(style.show)
      }

      insetFunction.screen.Power.off = function () {
        root.classList.remove(style.show)
      }

    }

    {
      let nowBackground = ""

      {
        const Image = {
          File: "",
          Link: ""
        }


        const root = backgroundPreviewRoot.getElementsByClassName(style.change)[0]!
        const buttonRoot = root.getElementsByClassName(style.button)[0]!.getElementsByClassName(style.buttons)[0]!
        const imputRoot = root.getElementsByClassName(style.input)[0]!
        const Link = imputRoot.getElementsByClassName(style.link)[0]!.getElementsByClassName(style.input)[0]! as HTMLInputElement
        const File = imputRoot.getElementsByClassName(style.file)[0]!.getElementsByClassName(style.input)[0]! as HTMLInputElement

        const setBg = function (Url: string) {
          Url = Url || Profile.Image.main

          backgroundPreviewRoot
            .getElementsByClassName(style.bg)[0]!
            .setAttribute("style", `background-image: url(${Url});`)

          backgroundPreviewRoot
            .getElementsByClassName(style.main)[0]!
            .getElementsByClassName(style.bg)[0]!
            .setAttribute("style", `background-image: url(${Url});`)

          root.classList.remove(style.show)

          nowBackground = Url
        }

        let isFoces = 0
        Link.addEventListener("focus", () => { isFoces = 1 })
        Link.addEventListener("blur", () => { isFoces = 0 })

        document.addEventListener("keydown", ({ code: keyCode }) => {
          if ((keyCode === "Enter" || keyCode === "NumpadEnter") && isFoces) {
            Image.Link = Link.value
          }
        })

        Link.addEventListener("input", () => {
          Image.Link = Link.value
        })

        File.addEventListener("change", (e) => {
          console.log("file")
          Image.File = URL.createObjectURL((File.files || [])[0])
        })

        buttonRoot.querySelector(`[bg-type="link"]`)?.addEventListener("click", () => setBg(Image.Link))
        buttonRoot.querySelector(`[bg-type="file"]`)?.addEventListener("click", () => setBg(Image.File || Profile.Image.main))

        insetFunction.screen.backgroundPreview.open = () => {
          backgroundPreviewRoot.classList.toggle(style.show)
        }
      }

      {
        const root = backgroundPreviewRoot.getElementsByClassName(style.apply)[0]!
        const buttonRoot = root.getElementsByClassName(style.button)[0]!.getElementsByClassName(style.buttons)[0]!

        const applyBg = function (type: "main" | "lock") {

          const coolEffect = coolEffectRoot
            .getElementsByClassName(style.bg)[0]!


          if (type === "main") {
            coolEffect
              .getElementsByClassName(style.mainBg)[0]!
              .setAttribute("style", `background-image: url(${nowBackground || Profile.Image.main})`)


            mainRoot
              .getElementsByClassName(style.bg)[0]!
              .setAttribute("style", `background-image: url(${nowBackground || Profile.Image.main})`)

          }

          else if (type === "lock") {
            coolEffect
              .getElementsByClassName(style.lockBg)[0]!
              .setAttribute("style", `background-image: url(${nowBackground || Profile.Image.lock})`)


            console.log(lockRoot
              .getElementsByClassName(style.bg)[0]!);

            lockRoot
              .getElementsByClassName(style.bg)[0]!
              .setAttribute("style", `background-image: url(${nowBackground || Profile.Image.lock})`)
          }

          backgroundPreviewRoot.
            getElementsByClassName(style.apply)[0]!
            .classList.remove(style.show)

          backgroundPreviewRoot.classList.remove(style.show)

        }

        buttonRoot.querySelector(`[screen-type="lock"]`)?.addEventListener("click", () => applyBg("lock"))
        buttonRoot.querySelector(`[screen-type="main"]`)?.addEventListener("click", () => applyBg("main"))
      }
    }

    {
      const transformEffect = function (event: MouseEvent, XoffSet: number, YoffSet: number, Element: Element | HTMLElement, other?: string) {
        const x = ((event.clientX - (window.innerWidth / 2)) / (window.innerWidth / 2)) * XoffSet;
        const y = ((event.clientY - (window.innerHeight / 2)) / (window.innerHeight / 2)) * YoffSet;
        Element.setAttribute("style", `transform:translate(${x}px, ${y}px) ${other || ""}`);
      }

      document.onmousemove = (e) => {
        transformEffect(e, -15, -15, document.getElementById(style.coolEffectFrame)!.getElementsByClassName(style.bg)[0]!, "scale(1.08)")
        if (isCool) {
          transformEffect(e, 5, 5, document.getElementById(style.Frame)!.getElementsByClassName(style.frame)[0], "scale(.7)")
        }
      }
    }

    functions.fetch({
      type: "system",
      options: {
        type: "GetData",
        cmd: {
          type: "isLogin",
        }
      }
    }, (res) => {
      const code = res.code
      if (code === "isLogin") {
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

        coolEffectRoot!.classList.add(style.login)
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

      coolEffectRoot!.classList.remove(style.login)

    })

    document.onkeydown = ({ code: keyCode, ctrlKey: ctrl, altKey: alt }) => {
      if (keyCode === "Escape") {
        insetFunction.screen.Power.off()
        document.getElementsByClassName(style.SaveMusic)[0]!.classList.remove(style.show)

        if (
          backgroundPreviewRoot
            .getElementsByClassName(style.change)[0]!
            .classList.contains(style.show)
          ||
          backgroundPreviewRoot.
            getElementsByClassName(style.apply)[0]!
            .classList.contains(style.show)) {

          backgroundPreviewRoot.
            getElementsByClassName(style.apply)[0]!
            .classList.remove(style.show)

          backgroundPreviewRoot
            .getElementsByClassName(style.change)[0]!
            .classList.remove(style.show)
        } else {
          backgroundPreviewRoot.classList.remove(style.show)
        }
      }

      if (ctrl && alt) {
        if (keyCode === "KeyC") {
          insetFunction.screen.coolEffect.isCool()
          backgroundPreviewRoot.getElementsByClassName(style.change)[0]!
        }
      }
    }

    document.ondblclick = () => {
      insetFunction.screen.coolEffect.isCool()
    }



  })

  return (
    <>
      <HeadSetting title='此乃神聖之系統也' />
      <ContextMenu otherButton={[
        {
          type: "button",
          name: "很酷的視圖",
          hotkey: "Ctrl + Alt + C",
          function: {
            type: "other",
            cmd() {
              insetFunction.screen.coolEffect.isCool()
            },
          },
          icon: <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3 19q-.825 0-1.412-.587Q1 17.825 1 17V7q0-.825.588-1.412Q2.175 5 3 5h18q.825 0 1.413.588Q23 6.175 23 7v10q0 .825-.587 1.413Q21.825 19 21 19Zm1-2V7H3v10Zm2 0h12V7H6Zm14 0h1V7h-1ZM4 7H3h1Zm16 0h1Z" /></svg>,
        },
        {
          type: "button",
          name: "背景圖預覽",
          function: {
            type: "other",
            cmd() {
              insetFunction.screen.backgroundPreview.open()
            },
          },
          icon: <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 22q-1.25 0-2.125-.875T2 19V5q0-1.25.875-2.125T5 2h14q1.25 0 2.125.875T22 5v14q0 1.25-.875 2.125T19 22Zm0-2h14q.425 0 .712-.288Q20 19.425 20 19V5q0-.425-.288-.713Q19.425 4 19 4H5q-.425 0-.713.287Q4 4.575 4 5v14q0 .425.287.712Q4.575 20 5 20Zm1-2 4-4 1.8 1.775L14 13l4 5Zm2-8q-.825 0-1.412-.588Q6 8.825 6 8t.588-1.412Q7.175 6 8 6t1.413.588Q10 7.175 10 8t-.587 1.412Q8.825 10 8 10Z" /></svg>
        }
      ]}></ContextMenu>
      <div id={style.coolEffectFrame}>
        <div className={style.bg}>
          <div className={style.mainBg} style={{ backgroundImage: `url(${Profile.Image.main})` }}></div>
          <div className={style.lockBg} style={{ backgroundImage: `url(${Profile.Image.lock})` }}></div>
        </div>
      </div>

      <div id={style.Frame}>
        <div className={style.frame}>

          <div className={style.mainScreen}>

            <div className={style.bg} style={{ backgroundImage: `url(${Profile.Image.main})` }}>
              <div className={style.filter}></div>
            </div>

            <div className={style.main}>
              <div className={style.main} overflow-bar-none="">
                {Profile.mainButtons.map(
                  (e, i) =>
                    <Guild title={e.name} key={i}>
                      {e.buttons.map((e, i) =>
                        <Button style='main' title={e.name} onClick={{
                          type: "fetch",
                          url: "api/system",
                          body: e.cml
                        }} key={i}>{e.icon}</Button>
                      )}
                    </Guild>)}
              </div >
              <div className={style.bar}>
                <div className={style.main}>
                  <div>
                    {Profile.menuBarButtons.map((e, i) =>
                      <Button style='bar' title={e.name} onClick={e.onClick} key={i}>
                        {e.icon}
                      </Button>
                    )}
                  </div>
                  <div className={style.other}>
                    <Button style='bar' title='儲存的音樂' onClick={{
                      type: "other",
                      func() {
                        document.getElementsByClassName(style.SaveMusic)[0]!.classList.add(style.show)
                      },
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M19.65 42q-3.15 0-5.325-2.175Q12.15 37.65 12.15 34.5q0-3.15 2.175-5.325Q16.5 27 19.65 27q1.4 0 2.525.4t1.975 1.1V9q0-1.25.875-2.125T27.15 6h5.35q1.4 0 2.375.975.975.975.975 2.375t-.975 2.4q-.975 1-2.375 1h-5.35V34.5q0 3.15-2.175 5.325Q22.8 42 19.65 42Z" /></svg>
                    </Button>
                    <Button style='bar' title='電源選項' onClick={{
                      type: "other",
                      func() {
                        insetFunction.screen.Power.on()
                      },
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 26.1q-.65 0-1.075-.425-.425-.425-.425-1.075V7.3q0-.65.425-1.075Q23.35 5.8 24 5.8q.65 0 1.075.425.425.425.425 1.075v17.3q0 .65-.425 1.075-.425.425-1.075.425Zm0 16q-3.75 0-7.025-1.425-3.275-1.425-5.7-3.85-2.425-2.425-3.85-5.7Q6 27.85 6 24.1q0-3.55 1.4-6.775 1.4-3.225 3.9-5.775.45-.45 1.125-.475.675-.025 1.125.425.45.45.375 1.075-.075.625-.525 1.075-2.1 2.1-3.25 4.775Q9 21.1 9 24.1q0 6.25 4.375 10.625T24 39.1q6.25 0 10.625-4.375T39 24.1q0-3-1.125-5.7t-3.225-4.8q-.45-.45-.5-1.075-.05-.625.4-1.025.5-.5 1.175-.425.675.075 1.175.575 2.45 2.55 3.775 5.75Q42 20.6 42 24.1q0 3.75-1.425 7.025-1.425 3.275-3.85 5.7-2.425 2.425-5.7 3.85Q27.75 42.1 24 42.1Z" /></svg>
                    </Button>
                    <Button style='bar' title='登出' onClick={{
                      type: "other",
                      func() {
                        insetFunction.screen.lockScreen.Logout()
                      },
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M32.25 31.65q-.45-.45-.45-1.1 0-.65.45-1.05l4-4h-16q-.65 0-1.075-.425-.425-.425-.425-1.075 0-.65.425-1.075.425-.425 1.075-.425h15.9l-4.05-4.05q-.4-.4-.4-1.025 0-.625.45-1.075.45-.45 1.075-.45t1.075.45L40.95 23q.25.25.35.5.1.25.1.55 0 .3-.1.55-.1.25-.35.5l-6.6 6.6q-.4.4-1.025.4-.625 0-1.075-.45ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.05q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075Q22.7 9 22.05 9H9v30h13.05q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075Q22.7 42 22.05 42Z" /></svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className={style.SaveMusic}>
              <div className={style.window}>
                <div className={style.bar}>
                  <div className={style.title}>存下來的音樂</div>
                  <div className={style.close} onClick={() => { document.getElementsByClassName(style.SaveMusic)[0]!.classList.remove(style.show) }}></div>
                </div>
                <div className={style.content} >
                  {Profile.save?.Music?.map((e, i) => <SaveMuisc {...e} key={i} />)}
                </div>
              </div>
            </div>

            <div className={style.power}>
              <div className={style.bar}>
                <Button style='power' title='關機' onClick={{
                  type: "other",
                  func() {
                    insetFunction.screen.Shutdown.Shutdown("shutdown")
                    insetFunction.screen.Power.off()
                  },
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 26.1q-.65 0-1.075-.425-.425-.425-.425-1.075V7.3q0-.65.425-1.075Q23.35 5.8 24 5.8q.65 0 1.075.425.425.425.425 1.075v17.3q0 .65-.425 1.075-.425.425-1.075.425Zm0 16q-3.75 0-7.025-1.425-3.275-1.425-5.7-3.85-2.425-2.425-3.85-5.7Q6 27.85 6 24.1q0-3.55 1.4-6.775 1.4-3.225 3.9-5.775.45-.45 1.125-.475.675-.025 1.125.425.45.45.375 1.075-.075.625-.525 1.075-2.1 2.1-3.25 4.775Q9 21.1 9 24.1q0 6.25 4.375 10.625T24 39.1q6.25 0 10.625-4.375T39 24.1q0-3-1.125-5.7t-3.225-4.8q-.45-.45-.5-1.075-.05-.625.4-1.025.5-.5 1.175-.425.675.075 1.175.575 2.45 2.55 3.775 5.75Q42 20.6 42 24.1q0 3.75-1.425 7.025-1.425 3.275-3.85 5.7-2.425 2.425-5.7 3.85Q27.75 42.1 24 42.1Z" /></svg>
                </Button>
                <Button style='power' title='重開' onClick={{
                  type: "other",
                  func() {
                    insetFunction.screen.Shutdown.Shutdown("restart")
                    insetFunction.screen.Power.off()
                  },
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 40q-6.65 0-11.325-4.675Q8 30.65 8 24q0-6.65 4.675-11.325Q17.35 8 24 8q4.25 0 7.45 1.725T37 14.45V9.5q0-.65.425-1.075Q37.85 8 38.5 8q.65 0 1.075.425Q40 8.85 40 9.5v9.7q0 .65-.425 1.075-.425.425-1.075.425h-9.7q-.65 0-1.075-.425-.425-.425-.425-1.075 0-.65.425-1.075.425-.425 1.075-.425h6.9q-1.9-3-4.85-4.85Q27.9 11 24 11q-5.45 0-9.225 3.775Q11 18.55 11 24q0 5.45 3.775 9.225Q18.55 37 24 37q3.9 0 7.15-2.075Q34.4 32.85 36 29.35q.2-.4.65-.7.45-.3.9-.3.85 0 1.225.55.375.55.075 1.3-1.85 4.45-5.875 7.125T24 40Z" /></svg>
                </Button>
                <Button style='power' title='鎖定' onClick={{
                  type: "other",
                  func() {
                    functions.fetch({
                      type: "system",
                      options: {
                        type: "SystemCommand",
                        cmd: "Rundll32.exe user32.dll,LockWorkStation"
                      }
                    });
                    insetFunction.screen.Power.off()
                  },
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" ><path d="M11 44q-1.25 0-2.125-.875T8 41V19.3q0-1.25.875-2.125T11 16.3h3.5v-4.8q0-3.95 2.775-6.725Q20.05 2 24 2q3.95 0 6.725 2.775Q33.5 7.55 33.5 11.5v4.8H37q1.25 0 2.125.875T40 19.3V41q0 1.25-.875 2.125T37 44Zm0-3h26V19.3H11V41Zm13-7q1.6 0 2.725-1.1t1.125-2.65q0-1.5-1.125-2.725T24 26.3q-1.6 0-2.725 1.225T20.15 30.25q0 1.55 1.125 2.65Q22.4 34 24 34Zm-6.5-17.7h13v-4.8q0-2.7-1.9-4.6Q26.7 5 24 5q-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6ZM11 41V19.3 41Z" /></svg>
                </Button>
                <Button style='power' title='有儀式感的關機 (For Windows)' onClick={{
                  type: "other",
                  func() {
                    functions.fetch({
                      type: "system",
                      options: {
                        type: "SystemCommand",
                        cmd: "SlideToShutDown"
                      }
                    });
                    insetFunction.screen.Power.off()
                  },
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 26.1q-.65 0-1.075-.425-.425-.425-.425-1.075V7.3q0-.65.425-1.075Q23.35 5.8 24 5.8q.65 0 1.075.425.425.425.425 1.075v17.3q0 .65-.425 1.075-.425.425-1.075.425Zm0 16q-3.75 0-7.025-1.425-3.275-1.425-5.7-3.85-2.425-2.425-3.85-5.7Q6 27.85 6 24.1q0-3.55 1.4-6.775 1.4-3.225 3.9-5.775.45-.45 1.125-.475.675-.025 1.125.425.45.45.375 1.075-.075.625-.525 1.075-2.1 2.1-3.25 4.775Q9 21.1 9 24.1q0 6.25 4.375 10.625T24 39.1q6.25 0 10.625-4.375T39 24.1q0-3-1.125-5.7t-3.225-4.8q-.45-.45-.5-1.075-.05-.625.4-1.025.5-.5 1.175-.425.675.075 1.175.575 2.45 2.55 3.775 5.75Q42 20.6 42 24.1q0 3.75-1.425 7.025-1.425 3.275-3.85 5.7-2.425 2.425-5.7 3.85Q27.75 42.1 24 42.1Z" /></svg>
                </Button>
              </div>

              <div className={style.exit} onClick={() => insetFunction.screen.Power.off()}></div>
            </div>
          </div>

          <div className={style.lockScreen}>

            <div className={style.bg} style={{ backgroundImage: `url(${Profile.Image.lock})` }}>
              <div className={style.filter}></div>
            </div>

            <div className={style.main}>
              <div>
                <div className={style.avatar} style={{ backgroundImage: `url(${Profile.Image.avatar})` }}></div>

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

          <div className={style.shutdown}>
            <div className={style.text}>正在<span>[power]</span>...</div>
          </div>
        </div>
      </div>

      <div id={style.BackGroundPreviewFrame}>
        <div className={style.bg} style={{ backgroundImage: `url(${Profile.Image.main})` }}></div>
        <div className={style.main}>
          <div className={style.bg} style={{ backgroundImage: `url(${Profile.Image.main})` }}></div>
          <div className={style.ui}>
            <div className={style.main}>
              <div className={style.text}>
                <div>
                  Background Preview
                </div>
              </div>
            </div>
            <div className={style.bar}>
              <div>
                <Button style='bar' title='更換背景圖' onClick={{
                  type: 'other',
                  func() {
                    document.getElementById(style.BackGroundPreviewFrame)!
                      .getElementsByClassName(style.change)[0]!
                      .classList.add(style.show)
                  },
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M13.3 34.15h21.45q.5 0 .7-.4.2-.4-.1-.8l-5.85-7.8q-.25-.3-.6-.3t-.6.3l-6 7.75-4.05-5.55q-.25-.3-.6-.3t-.6.3l-4.3 5.6q-.25.4-.075.8t.625.4ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z" /></svg>
                </Button>
                <Button style='bar' title='切換視圖' onClick={{
                  type: 'other',
                  func() {
                    document.getElementById(style.BackGroundPreviewFrame)!
                      .getElementsByClassName(style.main)[0]!
                      .classList.toggle(style.full)
                  },
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 31.5q3.55 0 6.025-2.475Q32.5 26.55 32.5 23q0-3.55-2.475-6.025Q27.55 14.5 24 14.5q-3.55 0-6.025 2.475Q15.5 19.45 15.5 23q0 3.55 2.475 6.025Q20.45 31.5 24 31.5Zm0-2.9q-2.35 0-3.975-1.625T18.4 23q0-2.35 1.625-3.975T24 17.4q2.35 0 3.975 1.625T29.6 23q0 2.35-1.625 3.975T24 28.6Zm0 9.4q-6.9 0-12.575-3.75-5.675-3.75-8.775-9.9-.15-.25-.225-.6-.075-.35-.075-.75t.075-.75q.075-.35.225-.6 3.1-6.15 8.775-9.9Q17.1 8 24 8q6.9 0 12.575 3.75 5.675 3.75 8.775 9.9.15.25.225.6.075.35.075.75t-.075.75q-.075.35-.225.6-3.1 6.15-8.775 9.9Q30.9 38 24 38Zm0-15Zm0 12q6.05 0 11.125-3.275T42.85 23q-2.65-5.45-7.725-8.725Q30.05 11 24 11t-11.125 3.275Q7.8 17.55 5.1 23q2.7 5.45 7.775 8.725Q17.95 35 24 35Z" /></svg>
                </Button>
                <Button style='bar' title='套用背景圖' onClick={{
                  type: 'other',
                  func() {
                    document.getElementById(style.BackGroundPreviewFrame)!
                      .getElementsByClassName(style.apply)[0]!
                      .classList.toggle(style.show)
                  },
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M22.95 38.9q-.4-.4-.4-1.05t.4-1.05l11.3-11.3H9.5q-.65 0-1.075-.425Q8 24.65 8 24q0-.65.425-1.075Q8.85 22.5 9.5 22.5h24.75l-11.3-11.3q-.4-.4-.4-1.075 0-.675.4-1.075.4-.4 1.05-.4t1.05.4l13.9 13.9q.25.25.35.5.1.25.1.55 0 .25-.1.525t-.35.525l-13.9 13.9q-.4.4-1.05.375-.65-.025-1.05-.425Z" /></svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={style.change}>
          <div className={style.input}>
            <div className={style.link}>
              <div className={style.text}>要嘛就給鏈接</div>
              <input type="text" className={style.input} placeholder="圖片鏈接" />
            </div>
            <div className={style.file}>
              <div className={style.text}>要嘛就給檔案</div>
              <input type="file" className={style.input} accept="image/png, image/jpeg, image/gif" />
            </div>
          </div>
          <div className={style.button}>
            <div className={style.buttons}>
              <button className={style.button} bg-type="link">使用鏈接</button>
              <button className={style.button} bg-type="file">使用檔案</button>
            </div>
          </div>
        </div>
        <div className={style.apply}>
          <div className={style.title}>
            <div>套用至</div>
          </div>
          <div className={style.button}>
            <div className={style.buttons}>
              <button className={style.button} screen-type="lock">鎖定界面</button>
              <button className={style.button} screen-type="main">主畫面</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OwoOs