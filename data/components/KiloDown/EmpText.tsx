import type { NextPage } from 'next'
import { ReactNode } from 'react'

import style from "./components.module.scss"

interface EmpTextProp {
    children?: ReactNode
}

const EmpText: NextPage<EmpTextProp> = (Prop) => {
    return (
        <span className={style.EmpText}>
            {Prop.children}
        </span>
    );
};

export default EmpText ;