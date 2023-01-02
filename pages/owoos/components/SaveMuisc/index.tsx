import type { NextPage } from 'next'
import style from "./style.module.scss"
import { MusicAuthor } from "../../../../types/type/save";

const SaveMusic: NextPage<MusicAuthor> = (prop) => {
  return (
    <div className={style.SaveMusic}>
      <div className={style.bg} style={{ backgroundImage: `url(${prop.avatar})` }}></div>
      <div className={style.main}>
        <div className={style.author}>
          <div className={style.avatar}>
            <div className={style.shadow} style={{ backgroundImage: `url(${prop.avatar})` }}></div>
            <div className={style.main} style={{ backgroundImage: `url(${prop.avatar})` }}></div>
          </div>
          <a href={prop.link} className={style.name}>{prop.name}</a>
        </div>
        <div className={style.main} overflow-bar-none="">
          {
            prop.list.map((e, i) =>
              <a href={e.link} className={style.music} key={i}>
                <div className={style.bg} style={{ backgroundImage: `url(${e.cover})` }}></div>
                <div className={style.main}>
                  <div className={style.cover}>
                    <div className={style.main} style={{ backgroundImage: `url(${e.cover})` }}></div>
                  </div>
                  <div className={style.name}>{e.name}</div>
                </div>
              </a>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SaveMusic
