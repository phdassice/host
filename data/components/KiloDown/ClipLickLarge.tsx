import type { NextPage } from 'next'
import { ReactNode } from 'react'

import style from "../styles/other/components.module.scss"

interface ClipLineLargeProp {
    children?: ReactNode
}

const ClipLineLarge: NextPage<ClipLineLargeProp> = (Prop) => {
    return (
        <span className={style.ClipLineLarge}>
            {Prop.children}
        </span>
    );
};

export default ClipLineLarge ;