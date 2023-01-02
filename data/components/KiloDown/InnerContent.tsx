import type { NextPage } from 'next'
import { ReactNode } from 'react'

import style from "./components.module.scss"

interface InnerContentProp {
    children?: ReactNode
    dangerouslySetInnerHTML?: {
        __html: string;
      }
}

const InnerContent: NextPage<InnerContentProp> = (Prop) => {
    return (
        <span className={style.InnerContent} dangerouslySetInnerHTML={Prop.dangerouslySetInnerHTML}>
            {Prop.children}
        </span>
    );
};

export default InnerContent;