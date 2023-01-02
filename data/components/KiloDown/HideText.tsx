import type { NextPage } from 'next'
import { ReactNode } from 'react'

import style from "./components.module.scss"

interface HideTextProp {
    children?: ReactNode
}

const HideText: NextPage<HideTextProp> = (Prop) => {
    return (
        <span className={style.HideText}>
            {Prop.children}
        </span>
    );
};

export default HideText ;