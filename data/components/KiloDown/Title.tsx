import type { NextPage } from 'next'
import { ReactNode } from 'react'

import Before from "./Before"
import After from "./After"
import ClipLine from "./ClipLine"

import style from "../styles/other/components.module.scss"

interface TitleProp {
    children?: ReactNode
}

const Title: NextPage<TitleProp> = (Prop) => {
    return (
        <div className={style.Title}>
            <Before>
                <span></span>
            </Before>
            <span className={style.Text}>{Prop.children}</span>
            <After></After>
            <ClipLine></ClipLine>
        </div>
    );
};

export default Title ;