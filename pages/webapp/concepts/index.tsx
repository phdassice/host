import type { NextPage } from 'next'
import { StaticImageData } from 'next/image';

import style from "./styles/menu.module.scss"

import iconOs from "./icon/os.png";
import iconWeb from "./icon/web.png";
import iconOther from "./icon/other.png";

import { useEffect } from 'react';

import HoverTips from "../../../data/components/HoverTips"

interface MenuButtonProp {
  type: "os" | "web" | "other"
  title: string
  description?: string
}

const MenuButton: NextPage<MenuButtonProp> = (prop) => {
  let icon: StaticImageData;

  if (prop.type == "os") {
    icon = iconOs
  } else if (prop.type == "web") {
    icon = iconWeb
  } else {
    icon = iconOther
  }

  return (
    <div className={style.MenuButton} onClick={(e) => { console.log(e); }} hover-tips={`
      <div>
        <div>${prop.title}</div>
        <div style="opacity: .7;">${prop.description || ""}</div>
      </div>
    `}>
      <div className={style.main}>
        <div className={style.icon}>
          <div className={style.img}>
            <div className={style.blur} style={{ backgroundImage: `url(${icon.src})` }}></div>
          </div>
          <div className={style.img}>
            <div className={style.img} style={{ backgroundImage: `url(${icon.src})` }}></div>
          </div>
        </div>
        <div className={style.description}>
          <div className={style.title}><div>{prop.title}</div></div>
          <div className={style.description} style={{ opacity: prop.description ? .6 : .3 }}><div>{prop.description || "Not Description"}</div></div>
        </div>
      </div>

      <div className={style.hover}>
        <div className={style.img} style={{ backgroundImage: `url(${icon.src})` }}></div>
        <div className={style.description}>
          <div className={style.title}><div>{prop.title}</div></div>
          {prop.description ? <div className={style.description}><div>{prop.description}</div></div> : null}
        </div>
      </div>
    </div>
  );
};

const Menu: NextPage = () => {
  useEffect(() => {
    window.addEventListener("resize", () => console.log("awa"))
    interface configBgType {
      type?: "A" | "B"
      text?: string
      snowTotal?: number
    };

    interface configType {
      bg: configBgType
    };

    const config: configType = {
      bg: {
        type: "A",
        text: "KILO",
        // snowTotal: 100,
      }
    };

    const background = document.getElementById(style.bg)!;

    (function (type: "A" | "B", backgroundText: string) {
      const TextList = background.querySelectorAll("." + style.text)!

      TextList.forEach(ele => {
        ele.innerHTML = ""
      })

      if (type == "A") {
        backgroundText.split("").forEach(Text => {
          TextList.forEach(ele => {
            ele.innerHTML += `<div>${Text}</div>`;
          });
        });
      } else if (type == "B") {
        TextList.forEach(ele => {
          ele.innerHTML += `<div class=${style.typeB}>${backgroundText}</div>`;
        });
      };
    })(config.bg.type || "A", config.bg.text || "KILO");

    (function (total: number) {
      const snow = background.querySelector("." + style.snowEffect)!;
      const snow2 = background.querySelector("." + style.snowEffect2)!;
      snow.innerHTML = ""
      snow2.innerHTML = ""
      for (let index = 0; index < total; index++) {
        snow.innerHTML += `<div class="${style.snow}"></div>`
      }
      for (let index = 0; index < total; index++) {
        snow2.innerHTML += `<div class="${style.snow}"></div>`
      }
    })(config.bg.snowTotal || 0);

  })

  return (
    <>

      <div id={style.mainFrame}>

        <HoverTips></HoverTips>

        <div id={style.memeText}>
          <input type="text" defaultValue="這個是做梗圖的東西" />
        </div>

        <div id={style.main}>

          <div id={style.bg}>
            <div className={style.snowEffect}>
              <div>

              </div>
            </div>

            <div className={style.text}></div>

            <div className={style.snowEffect2}>
              <div>

              </div>
            </div>
          </div>

          <div id={style.menu}>

            <div className={style.title}>
              <div className={style.title}>
                <div className={style.line} />
                <span className={style.text1}>KILO的</span>
                <span className={style.text2}>概念</span>
                <div className={style.line} style={{ transform: "rotate(180deg)" }} />
              </div>
            </div>

            <div className={style.menu}>
              <MenuButton type='os' title='type=os ouob' />
              <MenuButton type='web' title='type=web ouob' />
              <MenuButton type='other' title='type=other ouob' />
              <MenuButton type='os' title='然後不要問爲什麽來來去去都是那幾張' description='awa' />
              <MenuButton type='os' title='css' description='.awa{awa:awa;} .awa>.owo{owo:owo;}' />
            </div>

            <div id={style.smallBar}>
            </div>

          </div>

        </div>
      </div>

      <div id={style.prinFrame}>

      </div>

    </>
  );
};


export default Menu


