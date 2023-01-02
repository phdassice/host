import type { GetStaticProps, NextPage } from 'next'
import React from 'react'
import style from "./style.module.scss"
import VideoButton from './components/VideoButton'

export interface User {
  id: number
  display_name: string
  avatar: string
}

export interface Video {
  id: string
  title: string
  description: string
  created: number
  processed: number
  uploader: User
}

interface VideoPicknamProps {
  data: Array<Video> | "Error"
}

const VideoPickname: NextPage<VideoPicknamProps> = (props) => {

  return (
    <div id={style.Frame}>
      <div className={style.bar}>
        <div className={style.logo}>
          <a href='./pickvideo'>
            <svg className={style.img} width="44px" height="28px" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0L44 0L44 28L0 28L0 0ZM1.18922 3.23077L1.18922 1.07692L4.75678 1.07692L4.75678 3.23077L1.18922 3.23077ZM5.94594 3.23077L5.94594 1.07692L9.51351 1.07692L9.51351 3.23077L5.94594 3.23077ZM10.7027 3.23077L10.7027 1.07692L14.2703 1.07692L14.2703 3.23077L10.7027 3.23077ZM15.4595 3.23077L15.4595 1.07692L19.027 1.07692L19.027 3.23077L15.4595 3.23077ZM20.2162 3.23077L20.2162 1.07692L23.7838 1.07692L23.7838 3.23077L20.2162 3.23077ZM24.973 3.23077L24.973 1.07692L28.5405 1.07692L28.5405 3.23077L24.973 3.23077ZM29.7298 3.23077L29.7298 1.07692L33.2973 1.07692L33.2973 3.23077L29.7298 3.23077ZM34.4865 3.23077L34.4865 1.07692L38.0541 1.07692L38.0541 3.23077L34.4865 3.23077ZM39.2433 3.23077L39.2433 1.07692L42.8108 1.07692L42.8108 3.23077L39.2433 3.23077ZM17.837 19.3846L27.3501 14L17.837 8.6154L17.837 19.3846ZM1.18922 26.9231L1.18922 24.7692L4.75678 24.7692L4.75678 26.9231L1.18922 26.9231ZM5.94594 26.9231L5.94594 24.7692L9.51351 24.7692L9.51351 26.9231L5.94594 26.9231ZM10.7027 26.9231L10.7027 24.7692L14.2703 24.7692L14.2703 26.9231L10.7027 26.9231ZM15.4595 26.9231L15.4595 24.7692L19.027 24.7692L19.027 26.9231L15.4595 26.9231ZM20.2162 26.9231L20.2162 24.7692L23.7838 24.7692L23.7838 26.9231L20.2162 26.9231ZM24.973 26.9231L24.973 24.7692L28.5405 24.7692L28.5405 26.9231L24.973 26.9231ZM29.7298 26.9231L29.7298 24.7692L33.2973 24.7692L33.2973 26.9231L29.7298 26.9231ZM34.4865 26.9231L34.4865 24.7692L38.0541 24.7692L38.0541 26.9231L34.4865 26.9231ZM39.2433 26.9231L39.2433 24.7692L42.8108 24.7692L42.8108 26.9231L39.2433 26.9231Z" fill-rule="evenodd" stroke="none" />
            </svg>
            <div className={style.name}>PickVideo</div>
          </a>
        </div>
      </div>

      <div className={style.videos}>
        {
          props.data == "Error" ?
            <div className={style.error}>欸...出事了欸owo<br />可能是你家網絡沒開owo<br />或者是伺服器那邊出事了owo</div>
            :
            (
              !(props.data.length === 0) ?
                props.data.map((e, i) => {
                  const tim = new Date(e.created)

                  return <VideoButton
                    video={{
                      title: e.title,
                      id: e.id,
                      uploadDate: `${tim.getFullYear()}年 ${tim.getMonth() + 1}月 ${tim.getDate()}日`
                    }}

                    user={{
                      name: e.uploader.display_name,
                      avatar: e.uploader.avatar
                    }}

                    key={i}
                  />
                }
                ) : <div className={style.noting}>什麽都沒有</div>
            )
        }
      </div>
    </div>
  )
}

export async function getStaticProps() {
  let data: Array<Video> | "Error"
  try {
    data = await (await fetch("https://video.pickname.ml/videos/ajax?limit=100", {
      method: "GET",
    })).json()
  } catch {
    data = "Error"
  }

  return {
    props: {
      data: data
    }
  }

}
export default VideoPickname