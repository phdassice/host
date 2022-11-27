import type { NextPage } from 'next'
import { ReactNode } from 'react'

import style from "../styles/other/components.module.scss"


interface BeforeProp {
    children?: ReactNode
}

const Before: NextPage<BeforeProp> = (Prop) => {
    return (
        <span className={style.Before}>
            {Prop.children}
        </span>
    );
};

export default Before ;