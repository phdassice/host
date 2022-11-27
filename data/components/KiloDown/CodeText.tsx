import type { NextPage } from 'next'
import { ReactNode } from 'react'

import style from "../styles/other/components.module.scss"

interface CodeTextProp {
    children?: ReactNode
}

const CodeText: NextPage<CodeTextProp> = (Prop) => {
    return (
        <span className={style.CodeText}>
            {Prop.children}
        </span>
    );
};

export default CodeText;