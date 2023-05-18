import { Header } from '@/components/Header'
import { Select } from '@/components/Select'
import {
  homeProps,
  leaguesResponseProps,
  selectProps,
  teamStatisticsResponseProps,
  teamsResponseProps,
  teamPlayerResponseProps,
  teamResponseProps,
  teamPlayerDataProps,
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
  BoxContent,
  ContentGrid,
  ContentBox,
  GraphicContent,
  StatisticsContent,
  ContentGridStatistics,
} from '@/styles/pages/home'
import { HomeSkeleton } from '@/components/HomeSkeleton'
import noContentIcon from '@/assets/no-content.png'
import Image from 'next/image'
import { handleTurn } from '@/utils/handleTurnDay'
import { ChartComponent } from '@/components/Graphic'
import { useToast } from '@/hooks/useToast'

import { StatisticsSkeleton } from '@/components/StatisticsSkeleton'

export default function Home({ user, countries, seasons, apiKey }: homeProps) {
  const [country, setCountry] = useState('')
  const [season, setSeason] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [league, setLeague] = useState<number | string>()
  const [leagues, setLeagues] = useState<selectProps[]>([
    { flag: '', name: '', value: 0 },
  ])
  const [teams, setTeams] = useState<selectProps[]>([
    { flag: '', name: '', value: 0 },
  ])

  const [teamSeleted, setTeamSelected] = useState<teamResponseProps>()

  const [teamStatistics, setTeamStatistics] =
    useState<teamStatisticsResponseProps>()

  const [players, setPlayers] = useState<teamPlayerDataProps[]>()

  const { isFallback } = useRouter()

  const { showToast } = useToast()

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
      .catch(() =>
        showToast('The data from the league could not be retrieved.', {
          type: 'error',
          theme: 'colored',
        }),
      )
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
      .catch(() =>
        showToast("The team's data could not be fetched.", {
          type: 'error',
          theme: 'colored',
        }),
      )
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
        const teamResponse = result.data.response[0]
        setTeamSelected(teamResponse.team)
      })
      .catch(() => {
        setIsLoading(false)
        showToast('The team data could not be fetched.', {
          type: 'error',
          theme: 'colored',
        })
      })
  }

  async function handleGetTeamPlayers(teamId: number | string) {
    await axios
      .get(
        `https://v3.football.api-sports.io/players?season=${season}&league=${league}&team=${teamId}`,
        {
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'api-football.com',
          },
        },
      )
      .then((result) => {
        const teamPlayersResponse = result.data.response.map(
          (item: teamPlayerResponseProps) => {
            const formatPlayer = {
              name: item.player.name,
              age: item.player.age,
              nationality: item.player.nationality,
            }

            return formatPlayer
          },
        )
        setPlayers(teamPlayersResponse)
      })
      .catch(() => {
        setIsLoading(false)
        showToast('The players data could not be fetched.', {
          type: 'error',
          theme: 'colored',
        })
      })
  }

  async function handleGetTeamStatistics(teamId: number | string) {
    setIsLoading(true)
    await axios
      .get(
        `https://v3.football.api-sports.io/teams/statistics?season=${season}&league=${league}&team=${teamId}`,
        {
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'api-football.com',
          },
        },
      )
      .then((result) => {
        const teamStatisticsResponse = result.data.response
        setTeamStatistics(teamStatisticsResponse)

        handleGetTeam(teamId)
        handleGetTeamPlayers(teamId)
      })
      .catch(() =>
        showToast('The statistics could not be fetched.', {
          type: 'error',
          theme: 'colored',
        }),
      )
      .finally(() => setIsLoading(false))
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
            onAction={(item) => {
              handleGetTeamStatistics(item.value)
            }}
          />
        </Form>

        <Main>
          {teamSeleted && teamStatistics && players ? (
            <>
              <header>
                <Image
                  src={teamSeleted.logo}
                  alt="logo team"
                  width={80}
                  height={80}
                />
                <div>
                  <strong>
                    {teamSeleted.name} - {teamSeleted.code}
                  </strong>
                  <p>
                    {teamSeleted.country}, {teamSeleted.founded}
                  </p>
                </div>
              </header>

              <Content>
                <StatisticsContent>
                  <BoxContent>
                    <h4>Players</h4>

                    <ContentBox>
                      <ContentGrid borderBottom grid>
                        <strong>Name</strong>
                        <strong>Age</strong>
                        <strong>Nationality</strong>
                      </ContentGrid>

                      {players.map((player) => (
                        <ContentGrid key={player.name} borderBottom grid>
                          <p>{player.name}</p>
                          <p>{player.age}</p>
                          <p>{player.nationality}</p>
                        </ContentGrid>
                      ))}
                    </ContentBox>
                  </BoxContent>

                  <ContentGridStatistics>
                    <BoxContent>
                      <h4>Top used lineups</h4>
                      <ContentBox>
                        <ContentGrid flex borderBottom>
                          <strong>Lineups</strong>
                          <strong>Total games</strong>
                        </ContentGrid>

                        {teamStatistics.lineups.map((lineUp) => (
                          <ContentGrid flex key={lineUp.formation} borderBottom>
                            <p>{lineUp.formation}</p>
                            <p>{lineUp.played}</p>
                          </ContentGrid>
                        ))}
                      </ContentBox>
                    </BoxContent>

                    <BoxContent>
                      <h4>Result games</h4>
                      <ContentBox>
                        <ContentGrid flex borderBottom>
                          <strong>Wins</strong>
                          <p>{teamStatistics.fixtures.wins.total}</p>
                        </ContentGrid>
                        <ContentGrid flex borderBottom>
                          <strong>Draws</strong>
                          <p>{teamStatistics.fixtures.draws.total}</p>
                        </ContentGrid>
                        <ContentGrid flex borderBottom>
                          <strong>Loses</strong>
                          <p>{teamStatistics.fixtures.loses.total}</p>
                        </ContentGrid>
                        <ContentGrid flex borderBottom>
                          <strong>Total</strong>
                          <p>{teamStatistics.fixtures.played.total}</p>
                        </ContentGrid>
                      </ContentBox>
                    </BoxContent>
                  </ContentGridStatistics>
                </StatisticsContent>

                <GraphicContent>
                  <BoxContent>
                    <h4>For goals</h4>
                    <div style={{ padding: '1rem 1rem 0 0' }}>
                      <ChartComponent
                        minute={teamStatistics.goals.for.minute}
                      />
                    </div>
                  </BoxContent>
                  <BoxContent>
                    <h4>Agaisnt goals</h4>
                    <div style={{ padding: '1rem 1rem 0 0' }}>
                      <ChartComponent
                        minute={teamStatistics.goals.against.minute}
                      />
                    </div>
                  </BoxContent>
                </GraphicContent>
              </Content>
            </>
          ) : isLoading ? (
            <StatisticsSkeleton />
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

  const countriesResponse = await axios.get(
    `https://v3.football.api-sports.io/countries`,
    {
      headers: {
        'x-rapidapi-key': params.key,
        'x-rapidapi-host': 'api-football.com',
      },
    },
  )

  const seasonsResponse = await axios.get(
    `https://v3.football.api-sports.io/leagues/seasons`,
    {
      headers: {
        'x-rapidapi-key': params.key,
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
