import { Header } from '@/components/Header'
// import { reduxProps } from '@/storage'
import { userDataProps } from '@/storage/modules/user/action'

import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
// import { useEffect } from 'react'
// import { useSelector } from 'react-redux'

interface homeProps {
  user: userDataProps
  countries: any
}

export default function Home({ user, countries }: homeProps) {
  // const user = useSelector<reduxProps, userDataProps>((state) => state.user)

  const { isFallback } = useRouter()

  // useEffect(() => {
  //   if (!user || !user.secretkey) {
  //     push('/')
  //   }
  // }, [push, user])

  if (isFallback) {
    return <p>Loading...</p>
  }

  console.log(user)

  return (
    <>
      <Header />
      <div>Olá, {user?.account.firstname}</div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { key: string }> = async ({
  params,
}) => {
  if (!params?.key) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const userResponse = await axios.get(
    `https://v3.football.api-sports.io/status`,
    {
      headers: {
        'x-rapidapi-key': params?.key,
        'x-rapidapi-host': 'api-football.com',
      },
    },
  )

  const { errors } = userResponse.data

  if (errors.token && errors.token.includes('Error/Missing application key')) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const countriesResponse = await axios.get(
    `https://v3.football.api-sports.io/countries`,
    {
      headers: {
        'x-rapidapi-key': params?.key,
        'x-rapidapi-host': 'api-football.com',
      },
    },
  )

  const countries = countriesResponse.data.response
  const user = userResponse.data.response

  return {
    props: { user, countries },
    revalidate: 60 * 60 * 1, // 1 hours
  }
}
