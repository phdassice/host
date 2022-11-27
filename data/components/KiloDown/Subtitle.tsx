import type { NextPage } from 'next'
import { ReactNode } from 'react'

import Before from "./Before"
import After from "./After"

import style from "../styles/other/components.module.scss"

interface SubtitleProp {
    children?: ReactNode
}

const Subtitle: NextPage<SubtitleProp> = (Prop) => {
    return (
        <div className={style.Subtitle}>
            <Before>
            </Before>
            <span className={style.Text}>{Prop.children}</span>
            <After></After>
        </div>
    );
};

export default Subtitle;