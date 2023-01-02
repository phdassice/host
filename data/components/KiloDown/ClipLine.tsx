import type { NextPage } from 'next'
import { ReactNode } from 'react'

import style from "./components.module.scss"

interface ClipLineProp {
    children?: ReactNode
}

const ClipLine: NextPage<ClipLineProp> = (Prop) => {
    return (
        <span className={style.ClipLine}>
            {Prop.children}
        </span>
    );
};

export default ClipLine ;