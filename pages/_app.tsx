import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import HoverTips from "../data/components/HoverTips"

function MyApp({ Component, pageProps }: AppProps) {
  return (<>
    <Component {...pageProps} />
    <HoverTips></HoverTips>
  </>
  )
}

export default MyApp
