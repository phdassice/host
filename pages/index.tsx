import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import functions from '../data/module/functions'
import style from "./index.module.scss"

import HoverTips from "../data/components/HoverTips"
import Button from "./index/components/Button"
import Guild from "./index/components/Guild"

import Profile from '../Profile/Profile'

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
    }
  }
}

const Main: NextPage = () => {
  useEffect(() => {
    const mainRoot = document.getElementsByClassName(style.mainScreen)[0]
    const coolEffectRoot = document.getElementById(style.coolEffectFrame)

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
        functions.fetch("system", "-login " + input.value, (res) => {
          const code = res.code

          if (code == "Login") {
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
        if ((keyCode == "Enter" || keyCode == "NumpadEnter") && isFoces) {
          insetFunction.screen.lockScreen.Login()
        }
      })

      sendbutton.addEventListener("click", () => {
        insetFunction.screen.lockScreen.Login()
      })

      insetFunction.screen.lockScreen.Logout = function () {
        functions.fetch("system", "-logout", (e) => {
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

        if (type == "restart") {
          text.innerHTML = "重開"
        } else {
          text.innerHTML = "關機"
        }

        root.classList.add(style.show)

        setTimeout(() => {
          root.classList.add(style.hidden)

          setTimeout(() => {
            functions.fetch("system", "powershell (Add-Type '[DllImport(\\\"user32.dll\\\")]public static extern int PostMessage(int h,int m,int w,int l);' -Name a -Pas)::PostMessage(-1,0x0112,0xF170,2)",)
            setTimeout(() => {
              if (type == "restart") {
                functions.fetch("system", "shutdown -t 0 -r");
              } else {
                functions.fetch("system", "shutdown -t 0 -s");
              }
            }, 1.5e3);
          }, 2e3);
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
      if (keyCode == "Escape") {
        insetFunction.screen.Power.off()
      }

      if (ctrl && alt) {
        if (keyCode == "KeyC") {
          insetFunction.screen.coolEffect.isCool()
        }
      }
    }

    document.ondblclick = () => {
      insetFunction.screen.coolEffect.isCool()
    }

    function transformEffect(event: MouseEvent, XoffSet: number, YoffSet: number, Element: Element | HTMLElement, other?: string) {
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

  })

  return (
    <>
      <HoverTips></HoverTips>

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
                    functions.fetch("system", "Rundll32.exe user32.dll,LockWorkStation");
                    insetFunction.screen.Power.off()
                  },
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" ><path d="M11 44q-1.25 0-2.125-.875T8 41V19.3q0-1.25.875-2.125T11 16.3h3.5v-4.8q0-3.95 2.775-6.725Q20.05 2 24 2q3.95 0 6.725 2.775Q33.5 7.55 33.5 11.5v4.8H37q1.25 0 2.125.875T40 19.3V41q0 1.25-.875 2.125T37 44Zm0-3h26V19.3H11V41Zm13-7q1.6 0 2.725-1.1t1.125-2.65q0-1.5-1.125-2.725T24 26.3q-1.6 0-2.725 1.225T20.15 30.25q0 1.55 1.125 2.65Q22.4 34 24 34Zm-6.5-17.7h13v-4.8q0-2.7-1.9-4.6Q26.7 5 24 5q-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6ZM11 41V19.3 41Z" /></svg>
                </Button>
                <Button style='power' title='有儀式感的關機 (For Windows)' onClick={{
                  type: "other",
                  func() {
                    functions.fetch("system", " SlideToShutDown");
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
    </>
  )
}

export default Main