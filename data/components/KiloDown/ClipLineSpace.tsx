import type { NextPage } from 'next'
import { ReactNode } from 'react'

import style from "../styles/other/components.module.scss"

interface ClipLineSpaceProp {
    children?: ReactNode
}

const ClipLineSpace: NextPage<ClipLineSpaceProp> = (Prop) => {
    return (
        <span className={style.ClipLineSpace}>
            {Prop.children}
        </span>
    );
};

export default ClipLineSpace ;