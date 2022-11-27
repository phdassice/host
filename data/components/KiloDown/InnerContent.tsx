import type { NextPage } from 'next'
import { ReactNode } from 'react'

import style from "../styles/other/components.module.scss"

interface InnerContentProp {
    children?: ReactNode
}

const InnerContent: NextPage<InnerContentProp> = (Prop) => {
    return (
        <span className={style.InnerContent}>
            {Prop.children}
        </span>
    );
};

export default InnerContent;