import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import { SkeletonTheme } from 'react-loading-skeleton'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'
import Head from 'next/head'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Welcome to my site" />
        <meta name="image" content="https://i.ibb.co/DKXXQN3/screen-home.png" />
        <meta name="author" content="@dvlp.code" />
        <link rel="icon" href="/favicon.ico" />

        <title>I Love Football</title>
      </Head>

      <SkeletonTheme baseColor={'#202024'} highlightColor={'#121214'}>
        <ToastContainer />
        <Component {...pageProps} />
      </SkeletonTheme>
    </>
  )
}
