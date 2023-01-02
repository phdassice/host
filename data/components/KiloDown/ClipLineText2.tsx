import type { NextPage } from 'next'
import { ReactNode } from 'react'

import style from "./components.module.scss"

interface ClipLineText2Prop {
    children?: ReactNode
}

const ClipLineText2: NextPage<ClipLineText2Prop> = (Prop) => {
    return (
        <span className={style.ClipLineText2}>
            {Prop.children}
        </span>
    );
};

export default ClipLineText2 ;