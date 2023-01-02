import type { NextPage } from 'next';
import style from './style.module.scss';

interface Video {
  title: string
  id: string
  uploadDate: string
}

interface User {
  name: string
  avatar: string
}

interface VideoButtonProps {
  video: Video
  user: User
}

const VideoButton: NextPage<VideoButtonProps> = (props: VideoButtonProps) => {
  return (
    <a className={style.button} {...{ "target": "_blank" }} href={`https://video.pickname.ml/player?id=${props.video.id}`}>
      <div className={style.thumbnai} style={{ backgroundImage: `url(https://video.pickname.ml/static/videos/${props.video.id}/POSTER.jpg)` }}></div>
      <div className={style.info}>
        <div className={style.video}>
          <div className={style.title}>{props.video.title}</div>
          <div className={style.uploadDate}>{props.video.uploadDate}</div>
        </div>
        <div className={style.user}>
          <div className={style.avatar} style={{ backgroundImage: `url(${props.user.avatar})` }}></div>
          <div className={style.name}>{props.user.name}</div>
        </div>
      </div>
    </a>
  );
}

export default VideoButton;