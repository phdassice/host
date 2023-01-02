import type { NextPage } from 'next';
import Head from 'next/head';
import HeadSettingProps from './type';

const HeadSetting: NextPage<HeadSettingProps> = (prop) => {
  return (
    <>
      <Head>
        <title>{prop.title || "KILO"}</title>
      </Head>
    </>
  )
}

export default HeadSetting