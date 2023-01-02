import type { NextPage } from 'next';
import Link from 'next/link';
import { CSSProperties, ReactNode } from 'react';
import style from './style.module.scss';
import ReactMarkdown from 'react-markdown';
import KiloDown from '../KiloDown';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';

export const MDOptions: ReactMarkdownOptions = {
  components: {
    h1: ({ node, ...props }) => <KiloDown.Title {...props} id={props.children as string} />,
    h2: ({ node, ...props }) => <KiloDown.Subtitle {...props} />,
    a: ({ node, ...props }) => <a {...{ "target": "_blank", ...props }} kilo-style="" hover-tips={props.href} />,
    code: ({ node, ...props }) => <KiloDown.CodeText {...props} />,
    blockquote: ({ node, ...props }) => <KiloDown.InnerContent {...props} />,
    hr: ({ node, ...props }) => <KiloDown.ClipLineLarge {...props} />,
  },
  children: ""
}

interface TitleType {
  text: string
  hoverTips: string
}

interface ButtonType {
  hoverTips: string
  href: string
  type: "link" | "a"
}

interface FrameProps {
  children: ReactNode
  type: "div" | "md"
  button: ButtonType
  title: TitleType
  style?: CSSProperties
}

const Frame: NextPage<FrameProps> = (props: FrameProps) => {
  return (
    <>
      <div className={style.bar}>
        <div>
          {(() => {
            if (props.button.type == "link") {
              return <Link href={props.button.href}>
                <div className={style.link} hover-tips={props.button.hoverTips}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill='#fff' height="40" width="40"><path d="m22.375 29-8.083-8.042q-.209-.25-.292-.479-.083-.229-.083-.521 0-.25.083-.5t.292-.458l8.083-8.083q.417-.417 1-.417t1 .417q.375.416.375 1 0 .583-.417 1l-7.041 7.041 7.083 7.084q.375.416.375.979 0 .562-.375.979-.417.417-1.021.417-.604 0-.979-.417Z" /></svg>
                </div>
              </Link>
            } else {
              return <a href={props.button.href} className={style.link} hover-tips={props.button.hoverTips}>
                <svg xmlns="http://www.w3.org/2000/svg" fill='#fff' height="40" width="40"><path d="m22.375 29-8.083-8.042q-.209-.25-.292-.479-.083-.229-.083-.521 0-.25.083-.5t.292-.458l8.083-8.083q.417-.417 1-.417t1 .417q.375.416.375 1 0 .583-.417 1l-7.041 7.041 7.083 7.084q.375.416.375.979 0 .562-.375.979-.417.417-1.021.417-.604 0-.979-.417Z" /></svg>
              </a>
            }
          })()}


          <div className={style.title}>
            <div hover-tips={props.title.hoverTips}>{props.title.text}</div>
          </div>
        </div>
      </div>
      {(() => {
        const defuletProps = {
          className:style.main
        }
        if (props.type == "div") {
          return <div {...defuletProps} style={props.style}>
            {props.children}
          </div>
        } else {
          return <ReactMarkdown {...defuletProps}  {...MDOptions}>
            {props.children as string}
          </ReactMarkdown>
        }
      })()}
    </>
  );
}

export default Frame;