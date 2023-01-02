import type { NextPage } from 'next'
import { ReactNode } from 'react'

import style from "./components.module.scss"


interface AfterProp {
    children?: ReactNode
}

const After: NextPage<AfterProp> = (Prop) => {
    return (
        <span className={style.After}>
            {Prop.children}
        </span>
    );
};

export default After ;