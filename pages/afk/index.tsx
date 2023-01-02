import type { NextPage } from 'next';
import style from './style.module.scss';
import { useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import HeadSetting from '../../data/components/HeadSetting';
import Link from 'next/link';

const AFKPage: NextPage = () => {
  useEffect(() => {
    const transformEffect = function (event: MouseEvent, XoffSet: number, YoffSet: number, Element: Element | HTMLElement, other?: string) {
      const x = ((event.clientX - (window.innerWidth / 2)) / (window.innerWidth / 2)) * XoffSet;
      const y = ((event.clientY - (window.innerHeight / 2)) / (window.innerHeight / 2)) * YoffSet;
      Element.setAttribute("style", `transform:translate(${x}px, ${y}px) ${other || ""}`);
    }

    document.onmousemove = (e) => {
      transformEffect(e, 10, 10, document.getElementsByClassName(style.obj1)![0].getElementsByTagName("div")![0])
      transformEffect(e, 10, 10, document.getElementsByClassName(style.obj2)![0].getElementsByTagName("div")![0])
      transformEffect(e, -10, -10, document.getElementsByClassName(style.text)![0].getElementsByClassName(style.text)![0])
    }
  })
  return (<>
    <HeadSetting title='一個安靜的地方.....' />
    <Link href="/">
      <a id={style.Return} >
        <svg xmlns="http://www.w3.org/2000/svg" fill='#fff' height="40" width="40"><path d="m22.375 29-8.083-8.042q-.209-.25-.292-.479-.083-.229-.083-.521 0-.25.083-.5t.292-.458l8.083-8.083q.417-.417 1-.417t1 .417q.375.416.375 1 0 .583-.417 1l-7.041 7.041 7.083 7.084q.375.416.375.979 0 .562-.375.979-.417.417-1.021.417-.604 0-.979-.417Z" /></svg>
      </a>
    </Link>
    <div id={style.Frame2D}>
      <div className={style.text}>
        <div className={style.text}>AFK MODE FOR KILO</div>
      </div>
      <div className={style.filter}>
        <div className={style.blur}></div>
        <div className={style.object}>
          <div className={style.obj1}>
            <div></div>
          </div>
          <div className={style.obj2}>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div className={style.info}>
      <div className={style.text}>WALLPAPER IS FOR PC / BY KILO</div>
    </div>
  </>);
}

export default AFKPage;