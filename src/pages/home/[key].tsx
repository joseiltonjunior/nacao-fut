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
import {
  Container,
  Form,
  Content,
  Main,
  NoContent,
  BoxPlayerContent,
  ContentGridPlayer,
  ContentBox,
} from '@/styles/pages/home'
import { HomeSkeleton } from '@/components/HomeSkeleton'
import noContentIcon from '@/assets/no-content.png'
import Image from 'next/image'
import { handleTurn } from '@/utils/handleTurnDay'

interface teamResponseProps {
  team: {
    id: number
    name: string
    code: string
    country: string
    founded: number
    national: boolean
    logo: string
  }
}

export default function Home({ user, countries, seasons, apiKey }: homeProps) {
  const [country, setCountry] = useState('')
  const [season, setSeason] = useState('')
  const [league, setLeague] = useState<number | string>()
  const [leagues, setLeagues] = useState<selectProps[]>([
    { flag: '', name: '', value: 0 },
  ])
  const [teams, setTeams] = useState<selectProps[]>([
    { flag: '', name: '', value: 0 },
  ])

  const [teamSeleted, setTeamSelected] = useState<teamResponseProps>({
    team: {
      id: 755,
      name: 'Nautico Recife',
      code: 'NAU',
      country: 'Brazil',
      founded: 1901,
      national: false,
      logo: 'https://media-1.api-sports.io/football/teams/755.png',
    },
  })

  const [teamStatistics, setTeamStatistics] = useState({
    fixtures: {
      played: {
        home: 19,
        away: 19,
        total: 38,
      },
      wins: {
        home: 6,
        away: 2,
        total: 8,
      },
      draws: {
        home: 4,
        away: 2,
        total: 6,
      },
      loses: {
        home: 9,
        away: 15,
        total: 24,
      },
    },
    lineups: [
      {
        formation: '4-2-3-1',
        played: 16,
      },
      {
        formation: '3-5-2',
        played: 5,
      },
      {
        formation: '4-3-3',
        played: 5,
      },
      {
        formation: '4-4-2',
        played: 4,
      },
      {
        formation: '3-4-3',
        played: 2,
      },
      {
        formation: '3-4-2-1',
        played: 2,
      },
      {
        formation: '3-1-4-2',
        played: 1,
      },
      {
        formation: '4-3-1-2',
        played: 1,
      },
    ],
    goals: {
      for: {
        total: {
          home: 24,
          away: 8,
          total: 32,
        },
        average: {
          home: '1.3',
          away: '0.4',
          total: '0.8',
        },
        minute: {
          '0-15': {
            total: 4,
            percentage: '13.33%',
          },
          '16-30': {
            total: 2,
            percentage: '6.67%',
          },
          '31-45': {
            total: 9,
            percentage: '30.00%',
          },
          '46-60': {
            total: 1,
            percentage: '3.33%',
          },
          '61-75': {
            total: 5,
            percentage: '16.67%',
          },
          '76-90': {
            total: 7,
            percentage: '23.33%',
          },
          '91-105': {
            total: 2,
            percentage: '6.67%',
          },
          '106-120': {
            total: null,
            percentage: null,
          },
        },
      },
      against: {
        total: {
          home: 27,
          away: 38,
          total: 65,
        },
        average: {
          home: '1.4',
          away: '2.0',
          total: '1.7',
        },
        minute: {
          '0-15': {
            total: 2,
            percentage: '2.99%',
          },
          '16-30': {
            total: 12,
            percentage: '17.91%',
          },
          '31-45': {
            total: 13,
            percentage: '19.40%',
          },
          '46-60': {
            total: 9,
            percentage: '13.43%',
          },
          '61-75': {
            total: 13,
            percentage: '19.40%',
          },
          '76-90': {
            total: 13,
            percentage: '19.40%',
          },
          '91-105': {
            total: 5,
            percentage: '7.46%',
          },
          '106-120': {
            total: null,
            percentage: null,
          },
        },
      },
    },
  })

  const [players, setPlayers] = useState([
    {
      name: 'Bruno Leonardo da Silva',
      age: 21,
      nationality: 'Brazil',
    },
    {
      name: 'Felipe de Oliveira Simplício',
      age: 20,
      nationality: 'Brazil',
    },
    {
      name: 'Matheus Carvalho dos Santos',
      age: 26,
      nationality: 'Brazil',
    },
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

  async function handleGetTeam(teamId: number | string) {
    await axios
      .get(
        `https://v3.football.api-sports.io/teams?country=${country}&season=${season}&league=${league}&id=${teamId}`,
        {
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'api-football.com',
          },
        },
      )
      .then((result) => {
        const teamResponse = result.data.response
        setTeamSelected(teamResponse)
      })
      .catch((err) => console.log(err))
  }

  if (isFallback) {
    return <HomeSkeleton />
  }

  return (
    <>
      <Header title={`Hello ${user?.account.firstname}, ${handleTurn()}.`} />

      <Container>
        <h3>
          Track the statistics of your favorite team and the global football.
        </h3>
        <Form>
          <Select
            label="Select a country"
            disabled={countries.length === 0}
            itens={countries}
            onAction={(item) => {
              setCountry(item.name)
              setLeagues([])
              setTeams([])
              setSeason('')
            }}
          />

          <Select
            label="Select a season"
            disabled={countries.length === 0}
            defaultValue={season}
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
            label="Select a league"
            itens={leagues}
            onAction={(item) => {
              handleGetTeams(item.value)
              setLeague(item.value)
              setTeams([])
            }}
          />

          <Select
            disabled={teams.length <= 1}
            label="Select a team"
            itens={teams}
            onAction={(item) => handleGetTeam(item.value)}
          />
        </Form>

        <Main>
          {teamSeleted ? (
            <>
              <header>
                <Image
                  src={teamSeleted.team.logo}
                  alt="logo team"
                  width={80}
                  height={80}
                />
                <div>
                  <strong>
                    {teamSeleted.team.name} - {teamSeleted.team.code}
                  </strong>
                  <p>
                    {teamSeleted.team.country}, {teamSeleted.team.founded}
                  </p>
                </div>
              </header>

              <Content>
                <BoxPlayerContent>
                  <h4>Players</h4>

                  <ContentBox>
                    <ContentGridPlayer borderBottom grid>
                      <strong>Name</strong>
                      <strong>Age</strong>
                      <strong>Nationality</strong>
                    </ContentGridPlayer>

                    {players.map((player) => (
                      <ContentGridPlayer key={player.name} borderBottom grid>
                        <p>{player.name}</p>
                        <p>{player.age}</p>
                        <p>{player.nationality}</p>
                      </ContentGridPlayer>
                    ))}
                  </ContentBox>
                </BoxPlayerContent>

                <BoxPlayerContent>
                  <h4>Result games</h4>
                  <ContentBox>
                    <ContentGridPlayer flex borderBottom>
                      <strong>Total</strong>
                      <p>{teamStatistics.fixtures.played.total}</p>
                    </ContentGridPlayer>
                    <ContentGridPlayer flex borderBottom>
                      <strong>Wins</strong>
                      <p>{teamStatistics.fixtures.wins.total}</p>
                    </ContentGridPlayer>
                    <ContentGridPlayer flex borderBottom>
                      <strong>Draws</strong>
                      <p>{teamStatistics.fixtures.draws.total}</p>
                    </ContentGridPlayer>
                    <ContentGridPlayer flex borderBottom>
                      <strong>Loses</strong>
                      <p>{teamStatistics.fixtures.loses.total}</p>
                    </ContentGridPlayer>
                  </ContentBox>
                </BoxPlayerContent>

                <BoxPlayerContent>
                  <h4>Top used lineups</h4>
                  <ContentBox>
                    <ContentGridPlayer flex borderBottom>
                      <strong>Lineups</strong>
                      <strong>Total games</strong>
                    </ContentGridPlayer>

                    {teamStatistics.lineups
                      .filter((lineUp) => lineUp.played >= 5)
                      .map((lineUp) => (
                        <ContentGridPlayer
                          flex
                          key={lineUp.formation}
                          borderBottom
                        >
                          <p>{lineUp.formation}</p>
                          <p>{lineUp.played}</p>
                        </ContentGridPlayer>
                      ))}
                  </ContentBox>
                </BoxPlayerContent>
              </Content>
            </>
          ) : (
            <NoContent>
              <Image
                src={noContentIcon}
                alt="soccer player"
                width={300}
                height={300}
              />
              <h3>
                Conduct a search and stay informed about all the statistics of
                your team.
              </h3>
            </NoContent>
          )}
        </Main>
      </Container>
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
        'x-rapidapi-key': params.key,
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

  // const countriesResponse = await axios.get(
  //   `https://v3.football.api-sports.io/countries`,
  //   {
  //     headers: {
  //       'x-rapidapi-key': params.key,
  //       'x-rapidapi-host': 'api-football.com',
  //     },
  //   },
  // )

  // const seasonsResponse = await axios.get(
  //   `https://v3.football.api-sports.io/leagues/seasons`,
  //   {
  //     headers: {
  //       'x-rapidapi-key': params.key,
  //       'x-rapidapi-host': 'api-football.com',
  //     },
  //   },
  // )

  // const countries = countriesResponse.data.response.map(
  //   (country: { name: string; code: string; flag: string }) => {
  //     const formart = {
  //       name: country.name,
  //       item: country.code,
  //       flag: country.flag,
  //     }

  //     return formart
  //   },
  // )
  const user = userResponse.data.response
  // const seasons = seasonsResponse.data.response.map((season: string[]) => {
  //   const formart = {
  //     name: season,
  //     item: season,
  //   }

  //   return formart
  // })

  return {
    props: { user, countries: [], seasons: [], apiKey: params.key },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
