import type { NextPage, GetStaticProps } from 'next'
import React, { ReactNode, useEffect } from 'react'
import { readdirSync, readFileSync } from 'fs';
import style from "./style.module.scss"
import Profile from '../Profile/Profile'
import HeadSetting from '../data/components/HeadSetting';
import Link from 'next/link';


const Main: NextPage = () => {
  useEffect(() => {
    {
      const transformEffect = function (event: MouseEvent, XoffSet: number, YoffSet: number, Element: Element | HTMLElement, other?: string) {
        const x = ((event.clientX - (window.innerWidth / 2)) / (window.innerWidth / 2)) * XoffSet;
        const y = ((event.clientY - (window.innerHeight / 2)) / (window.innerHeight / 2)) * YoffSet;
        Element.setAttribute("style", `transform:translate(${x}px, ${y}px) ${other || ""}`);
      }

      document.onmousemove = (e) => {
        transformEffect(e, -30, -30, document.getElementsByClassName(style.bg)![0])
        transformEffect(e, 10, 10, document.getElementsByClassName(style.filter)![0].getElementsByClassName(style.snows)![0], "scale(1.2)")
      }
    }

    {
      const timeEle = document.getElementById("time")!
      setInterval(() => {
        const time = new Date()
        timeEle.innerHTML =
          (() => {
            if (!(time.getHours() >= 10)) {
              return "0" + time.getHours()
            } else return time.getHours();
          })()
          + ":" +
          (() => {
            if (!(time.getMinutes() >= 10)) {
              return "0" + time.getMinutes()
            } else return time.getMinutes();
          })()
          + " : " +
          (() => {
            if (!(time.getSeconds() >= 10)) {
              return "0" + time.getSeconds()
            } else return time.getSeconds();
          })()
          + " | " +
          time.getDate()
          + " " +
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ][time.getMonth() - 1]
          + " " +
          time.getFullYear()

      }, .2e3)
    }
  })

  return (
    <>
      <HeadSetting title='一切的起源' />
      <div id={style.Frame}>
        <div className={style.bg}>
          <div className={style.image} style={{ backgroundImage: `url(${Profile.Image.main})` }}></div>
        </div>

        <div className={style.main}>

          <div className={style.customText}>
            <div>
              <div className={style.time} id="time">
                --
              </div>
              <div className={style.text}>{Profile.customText}</div>
            </div>
          </div>

          <div className={style.user}>
            <div>
              <div className={style.name}>{Profile.username}</div>
              <div className={style.avatar} style={{ backgroundImage: `url(${Profile.Image.avatar})` }}></div>
            </div>
          </div>

          <div className={style.menu}>
            <div className={style.main}>
              {
                [
                  {
                    link: "/owoos",
                    name: "神奇的系統",
                    tips: "一個一點屁用都沒有的系統<br />雖然不知道他可以幹嘛 但也許....很有趣?"
                  },
                  {
                    link: "/afk",
                    name: "閒置",
                    tips: "一個可以讓你安靜下來的地方(也許"
                  },
                ].map(
                  (e: { link: string, name: string, tips: string }, i) =>
                    <Link href={e.link} key={i}><a hover-tips={e.tips}>{e.name}</a></Link>
                )
              }
            </div>
          </div>
        </div>

        <div className={style.filter}>
          <div className={style.blur}></div>
          <div className={style.snows}>
            {(() => {
              const snows: Array<ReactNode> = [];

              for (let i = 1; i < 0 + 1; i++) {
                snows.push(<div className={style.snow} key={i}></div>)
              }

              return snows;
            })()}
          </div>
          <div className={style.black}></div>
        </div>

      </div>
    </>
  )
}

export default Main