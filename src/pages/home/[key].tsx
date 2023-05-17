import { Header } from '@/components/Header'
import { Select } from '@/components/Select'
import {
  homeProps,
  leaguesResponseProps,
  selectProps,
  teamsResponseProps,
} from '@/types/home'

import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home({ user, countries, seasons, apiKey }: homeProps) {
  const [country, setCountry] = useState<string>('')
  const [season, setSeason] = useState<string>('')
  const [leagues, setLeagues] = useState<selectProps[]>([
    { flag: '', name: '', value: 0 },
  ])
  const [teams, setTeams] = useState<selectProps[]>([
    { flag: '', name: '', value: 0 },
  ])

  const { isFallback } = useRouter()

  async function handleGetLeagues(season: string) {
    await axios
      .get(
        `https://v3.football.api-sports.io/leagues?country=${country}&season=${season}`,
        {
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'api-football.com',
          },
        },
      )
      .then((result) => {
        const leaguesResult = result.data.response.map(
          (item: leaguesResponseProps) => {
            const formart = {
              value: item.league.id,
              flag: item.league.logo,
              name: item.league.name,
            }
            return formart
          },
        )
        setLeagues(leaguesResult)
      })
      .catch((err) => console.log(err))
  }

  async function handleGetTeams(league: number | string) {
    await axios
      .get(
        `https://v3.football.api-sports.io/teams?country=${country}&season=${season}&league=${league}`,
        {
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'api-football.com',
          },
        },
      )
      .then((result) => {
        const teamsResult = result.data.response.map(
          (item: teamsResponseProps) => {
            const formart = {
              value: item.team.id,
              flag: item.team.logo,
              name: item.team.name,
            }
            return formart
          },
        )
        setTeams(teamsResult)
      })
      .catch((err) => console.log(err))
  }

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Header />

      <div>
        <p>
          Olá, {user?.account.firstname} {user?.account.lastname}
        </p>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Select
            label="Select a country"
            // defaultValue=""
            disabled={countries.length === 0}
            itens={countries}
            onAction={(item) => {
              setCountry(item.name)
              setLeagues([])
              setTeams([])
            }}
          />

          <Select
            label="Select a season"
            disabled={countries.length === 0}
            // defaultValue={season}
            itens={seasons}
            onAction={(item) => {
              handleGetLeagues(item.name)
              setSeason(item.name)
              setLeagues([])
              setTeams([])
            }}
          />

          <Select
            disabled={leagues.length <= 1}
            // defaultValue=""
            label="Select a league"
            itens={leagues}
            onAction={(item) => {
              handleGetTeams(item.value)
              setTeams([])
            }}
          />

          <Select
            disabled={teams.length <= 1}
            // defaultValue=""
            label="Select a team"
            itens={teams}
            onAction={(item) => console.log(item)}
          />
        </div>
      </div>
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

  const seasonsResponse = await axios.get(
    `https://v3.football.api-sports.io/leagues/seasons`,
    {
      headers: {
        'x-rapidapi-key': params?.key,
        'x-rapidapi-host': 'api-football.com',
      },
    },
  )

  const countries = countriesResponse.data.response.map(
    (country: { name: string; code: string; flag: string }) => {
      const formart = {
        name: country.name,
        item: country.code,
        flag: country.flag,
      }

      return formart
    },
  )
  const user = userResponse.data.response
  const seasons = seasonsResponse.data.response.map((season: string[]) => {
    const formart = {
      name: season,
      item: season,
    }

    return formart
  })

  return {
    props: { user, countries, seasons, apiKey: params.key },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
