import type { NextPage } from 'next';
import { useEffect } from 'react';
import style from "./style.module.scss";

const HoverTips: NextPage = () => {
  useEffect(() => {
    const tips = document.getElementById(style.hoverTips)!;
    const tips2 = document.getElementById(style.hoverTips2)!

    document.addEventListener("mousemove", (e) => {
      const X = e.clientX;
      const Y = e.clientY;
      {
        const tipsStyle = tips.style;
        tipsStyle.top = Y + "px"
        tipsStyle.left = X + "px"
      };

      if (Y < tips2.offsetHeight + 10) {
        tips.classList.add(style.top)
      } else {
        tips.classList.remove(style.top)
      }

      if (X < tips2.offsetWidth / 2 + 10) {
        tips.classList.add(style.left)
      } else {
        tips.classList.remove(style.left)
      }
    });

    document.querySelectorAll("[hover-tips]").forEach(e => {
      e.addEventListener("mouseenter", () => {

        tips.innerHTML = e.getAttribute("hover-tips")!;
        tips2.innerHTML = e.getAttribute("hover-tips")!;

        tips.classList.add(style.show)

        {
          const tipsStyle = tips.style;
          tipsStyle.width = tips2.offsetWidth + "px"
          tipsStyle.height = tips2.offsetHeight + "px"
        };
      });
      e.addEventListener("mouseleave", () => {
        tips.classList.remove(style.show)
      });
    });
  })

  return (
    <>
      <div id={style.hoverTips}>
      </div>
      <div id={style.hoverTips2}>
      </div>
    </>
  )
}

export default HoverTips