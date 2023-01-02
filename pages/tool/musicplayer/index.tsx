import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import style from "./style.module.scss"
import jsmediatags from "jsmediatags"

import ImageCover from "./data/image/cover.png"

const MusicPlayer: NextPage = () => {
  useEffect(() => {
    const PlayerEngine = new Audio()
    
    const Icons = {
      play: {
        play: '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M9.525 18.025q-.5.325-1.013.037Q8 17.775 8 17.175V6.825q0-.6.512-.888.513-.287 1.013.038l8.15 5.175q.45.3.45.85t-.45.85Z" /></svg>',
        pause: '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M15 19q-.825 0-1.412-.587Q13 17.825 13 17V7q0-.825.588-1.412Q14.175 5 15 5h2q.825 0 1.413.588Q19 6.175 19 7v10q0 .825-.587 1.413Q17.825 19 17 19Zm-8 0q-.825 0-1.412-.587Q5 17.825 5 17V7q0-.825.588-1.412Q6.175 5 7 5h2q.825 0 1.413.588Q11 6.175 11 7v10q0 .825-.587 1.413Q9.825 19 9 19Z"/></svg>',
      },
      loop: {
        loopOn: '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3 23q-.825 0-1.412-.587Q1 21.825 1 21V3q0-.825.588-1.413Q2.175 1 3 1h18q.825 0 1.413.587Q23 2.175 23 3v18q0 .825-.587 1.413Q21.825 23 21 23Zm14-6H6.85l.85-.85q.3-.3.3-.712 0-.413-.3-.713t-.712-.3q-.413 0-.713.3L3.7 17.3q-.275.275-.275.7 0 .425.275.7l2.6 2.6q.275.275.688.275.412 0 .712-.3t.288-.725q-.013-.425-.313-.725L6.85 19H18q.425 0 .712-.288Q19 18.425 19 18v-4.025q0-.425-.288-.7Q18.425 13 18 13t-.712.287Q17 13.575 17 14ZM7 7h10.15l-.85.85q-.3.3-.3.712 0 .413.3.713t.713.3q.412 0 .712-.3L20.3 6.7q.275-.275.275-.7 0-.425-.275-.7l-2.6-2.6q-.275-.275-.687-.275-.413 0-.713.3t-.287.725q.012.425.312.725L17.15 5H6q-.425 0-.713.287Q5 5.575 5 6v4.025q0 .425.287.7Q5.575 11 6 11t.713-.288Q7 10.425 7 10Z"/></svg>',
        loop: '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M17 17v-3q0-.425.288-.713Q17.575 13 18 13t.712.275q.288.275.288.7V18q0 .425-.288.712Q18.425 19 18 19H6.85l.825.825q.3.3.313.725.012.425-.288.725t-.712.3q-.413 0-.688-.275l-2.6-2.6q-.275-.275-.275-.7 0-.425.275-.7l2.575-2.575q.3-.3.713-.3.412 0 .712.3t.3.713q0 .412-.3.712l-.85.85ZM7 7v3q0 .425-.287.712Q6.425 11 6 11t-.713-.275Q5 10.45 5 10.025V6q0-.425.287-.713Q5.575 5 6 5h11.15l-.825-.825q-.3-.3-.312-.725-.013-.425.287-.725t.713-.3q.412 0 .687.275l2.6 2.6q.275.275.275.7 0 .425-.275.7l-2.575 2.575q-.3.3-.712.3-.413 0-.713-.3t-.3-.713q0-.412.3-.712l.85-.85Z" /></svg>'
      }
    }
    const FuncitonButtons = {
      Time: {
        TimeNow: document.getElementById("TimeNow")!,
        TimeRange: document.getElementById("TimeRange")! as HTMLInputElement,
        TimeAll: document.getElementById("TimeAll")!,
      },
      Buttons: {
        ButtonInfo: document.getElementById("ButtonInfo")!,
        ButtonPlay: document.getElementById("ButtonPlay")!,
        ButtonLoop: document.getElementById("ButtonLoop")!,
      },
      UploadFile: document.getElementById("UploadFile")! as HTMLInputElement & EventTarget
    }
    const Info = {
      Cover: {
        MusicBackgroundCover: document.getElementById("MusicBackgroundCover")!,
        MusicCover: document.getElementById("MusicCover")!,
      },
      Info: {
        MusicTitle: document.getElementById("MusicTitle")!,
        MusicAuthor: document.getElementById("MusicAuthor")!,
        MusicAlbum: document.getElementById("MusicAlbum")!,
      }
    }

    FuncitonButtons.UploadFile.addEventListener("change", (e) => {
      PlayFile(FuncitonButtons.UploadFile.files)
    })

    function PlayFile(file: any) {
      PlayerEngine.src = URL.createObjectURL(file[0])

      PlayerEngine.onloadedmetadata = function () {
        const audioDuration = ~~(PlayerEngine.duration)
        FuncitonButtons.Time.TimeRange.max = `${audioDuration}`
        FuncitonButtons.Time.TimeAll.innerHTML = formatTime(audioDuration)
      };

      PlayerEngine.play()

      FuncitonButtons.Buttons.ButtonPlay.innerHTML = Icons.play.pause


      jsmediatags.read(file[0], {
        onSuccess: function (tag) {
          console.log(tag.tags);

          if (tag.tags.picture) {
            const { data, format } = tag.tags.picture
            let base64String = "";
            for (let i = 0; i < data.length; i++) {
              base64String += String.fromCharCode(data[i]);
            }
            const image = `url(data:${format};base64,${window.btoa(base64String)})`;

            [
              Info.Cover.MusicBackgroundCover,
              Info.Cover.MusicCover
            ].forEach(e => e.style.backgroundImage = image);
          } else {
            [
              Info.Cover.MusicBackgroundCover,
              Info.Cover.MusicCover
            ].forEach(e => e.style.backgroundImage = `url(${ImageCover.src})`);
          }

          Info.Info.MusicTitle.innerHTML = tag.tags.title || file[0].name
          PlayerEngine.title=tag.tags.title || file[0].name

          Info.Info.MusicAuthor.innerHTML = tag.tags.artist || "--"
          
          Info.Info.MusicAlbum.innerHTML = tag.tags.album || ""
        }
      });
    }

    FuncitonButtons.Time.TimeRange.addEventListener("input", e => {
      PlayerEngine.currentTime = +`${FuncitonButtons.Time.TimeRange.value}`
    })

    FuncitonButtons.Buttons.ButtonPlay.addEventListener("click", (e) => {
      if (PlayerEngine.src) {
        const button = FuncitonButtons.Buttons.ButtonPlay
        if (PlayerEngine.paused) {
          PlayerEngine.play();
          button.innerHTML = Icons.play.pause
        } else {
          PlayerEngine.pause();
          button.innerHTML = Icons.play.play
        }
      }
    })

    FuncitonButtons.Buttons.ButtonLoop.addEventListener("click", () => {
      if (PlayerEngine.src) {
        const button = FuncitonButtons.Buttons.ButtonLoop
        if (PlayerEngine.loop) {
          PlayerEngine.loop = false;
          button.innerHTML = Icons.loop.loop
        } else {
          PlayerEngine.loop = true;
          button.innerHTML = Icons.loop.loopOn
        }
      }
    })


    PlayerEngine.addEventListener("ended", () => {
      FuncitonButtons.Buttons.ButtonPlay.innerHTML = Icons.play.play
    })

    PlayerEngine.addEventListener('timeupdate', e => {
      const audioCurrentTime = PlayerEngine.currentTime
      FuncitonButtons.Time.TimeNow.innerHTML = formatTime(audioCurrentTime)
      FuncitonButtons.Time.TimeRange.value = `${audioCurrentTime}`
    })

    function formatTime(time: number) {
      const min = Math.floor(time / 60);
      const sec = Math.floor(time % 60);
      return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
    }
  })
  return (
    <>
      <div id={style.Frame}>
        <div id="MusicBackgroundCover" className={style.Background} style={{ backgroundImage: `url(${ImageCover.src})` }}></div>
        <div className={style.info}>
          <div id='MusicCover' className={style.cover} style={{ backgroundImage: `url(${ImageCover.src})` }}>
            <div className={style.contro}>
              <div className={style.time}>
                <div id='TimeNow' className={style.now}>0:00</div>
                <input id="TimeRange" type="range" min={0} max={0} className={style.timeLine} />
                <div id='TimeAll' className={style.all}>0:00</div>
              </div>
              <div className={style.button}>
                <button hover-tips="關於" id="ButtonInfo" className={style.info}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 17q.425 0 .713-.288Q13 16.425 13 16v-4.025q0-.425-.287-.7Q12.425 11 12 11t-.712.287Q11 11.575 11 12v4.025q0 .425.288.7.287.275.712.275Zm0-8q.425 0 .713-.288Q13 8.425 13 8t-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8t.288.712Q11.575 9 12 9Zm0 13q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                </button>
                <button hover-tips="播放/暫停" id="ButtonPlay" className={style.play}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M9.525 18.025q-.5.325-1.013.037Q8 17.775 8 17.175V6.825q0-.6.512-.888.513-.287 1.013.038l8.15 5.175q.45.3.45.85t-.45.85Z" /></svg>
                </button>
                <button hover-tips="循環" id="ButtonLoop" className={style.loop}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M17 17v-3q0-.425.288-.713Q17.575 13 18 13t.712.275q.288.275.288.7V18q0 .425-.288.712Q18.425 19 18 19H6.85l.825.825q.3.3.313.725.012.425-.288.725t-.712.3q-.413 0-.688-.275l-2.6-2.6q-.275-.275-.275-.7 0-.425.275-.7l2.575-2.575q.3-.3.713-.3.412 0 .712.3t.3.713q0 .412-.3.712l-.85.85ZM7 7v3q0 .425-.287.712Q6.425 11 6 11t-.713-.275Q5 10.45 5 10.025V6q0-.425.287-.713Q5.575 5 6 5h11.15l-.825-.825q-.3-.3-.312-.725-.013-.425.287-.725t.713-.3q.412 0 .687.275l2.6 2.6q.275.275.275.7 0 .425-.275.7l-2.575 2.575q-.3.3-.712.3-.413 0-.713-.3t-.3-.713q0-.412.3-.712l.85-.85Z" /></svg>
                </button>
              </div>
              <button hover-tips="上傳" className={style.file}>
                <input type="file" accept="audio/*" id="UploadFile" />
                <div className={style.icon}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 16q-.425 0-.712-.288Q11 15.425 11 15V7.85L9.125 9.725q-.3.3-.7.3-.4 0-.725-.325-.3-.3-.287-.713.012-.412.287-.687l3.6-3.6q.15-.15.325-.213.175-.062.375-.062t.375.062q.175.063.325.213l3.6 3.6q.3.3.287.712-.012.413-.287.688-.3.3-.712.312-.413.013-.713-.287L13 7.85V15q0 .425-.287.712Q12.425 16 12 16Zm-6 4q-.825 0-1.412-.587Q4 18.825 4 18v-2q0-.425.287-.713Q4.575 15 5 15t.713.287Q6 15.575 6 16v2h12v-2q0-.425.288-.713Q18.575 15 19 15t.712.287Q20 15.575 20 16v2q0 .825-.587 1.413Q18.825 20 18 20Z" /></svg>
                </div>
              </button>
            </div>
          </div>
          <div id='MusicTitle' className={style.name}>Untitle</div>
          <div id='MusicAuthor' className={style.author}>--</div>
          <div id='MusicAlbum' className={style.album}></div>
        </div>

      </div>
    </>
  )
}

export default MusicPlayer