import type { NextPage } from 'next'
import { ReactNode } from 'react'

import style from "./components.module.scss"

interface ClipLineTextProp {
    children?: ReactNode
}

const ClipLineText: NextPage<ClipLineTextProp> = (Prop) => {
    return (
        <span className={style.ClipLineText}>
            {Prop.children}
        </span>
    );
};

export default ClipLineText;