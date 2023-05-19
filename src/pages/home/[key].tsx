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
  userDataProps,
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
import badIcon from '@/assets/bad.png'
import Image from 'next/image'
import { handleTurn } from '@/utils/handleTurnDay'
import { ChartComponent } from '@/components/Graphic'
import { useToast } from '@/hooks/useToast'

import { StatisticsSkeleton } from '@/components/StatisticsSkeleton'
import { DontHaveContent } from '@/components/DontHaveContent'
import { useSelector } from 'react-redux'
import { reduxProps } from '@/storage'
import Link from 'next/link'

export default function Home({ countries, seasons, apiKey }: homeProps) {
  const [country, setCountry] = useState('')
  const [season, setSeason] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingLeagues, setIsLoadingLeagues] = useState(false)
  const [isLoadingTeams, setIsLoadingTeams] = useState(false)
  const [league, setLeague] = useState<number | string>()
  const [leagues, setLeagues] = useState<selectProps[]>([
    { flag: '', name: '', value: 0 },
  ])
  const [teams, setTeams] = useState<selectProps[]>([
    { flag: '', name: '', value: 0 },
  ])

  const [teamSeleted, setTeamSelected] = useState<teamResponseProps>()

  const [teamStatistics, setTeamStatistics] =
    useState<teamStatisticsResponseProps | null>()

  const [players, setPlayers] = useState<teamPlayerDataProps[]>()

  const user = useSelector<reduxProps, userDataProps>((state) => state.user)

  const { isFallback } = useRouter()

  const { showToast } = useToast()

  async function handleGetLeagues(season: string) {
    setIsLoadingLeagues(true)
    await axios
      .get(
        `/api/fetchManyLeagues?country=${country}&season=${season}&key=${apiKey}`,
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
      .finally(() => setIsLoadingLeagues(false))
  }

  async function handleGetTeams(league: number | string) {
    setIsLoadingTeams(true)
    await axios
      .get(
        `/api/fetchManyTeams?country=${country}&seasonId=${season}&leagueId=${league}&key=${apiKey}`,
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
      .finally(() => setIsLoadingTeams(false))
  }

  async function handleGetTeam(teamId: number | string) {
    await axios
      .get(
        `/api/fetchTeam?country=${country}&seasonId=${season}&leagueId=${league}&teamId=${teamId}&key=${apiKey}`,
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
        `/api/fetchTeamPlayers?seasonId=${season}&leagueId=${league}&teamId=${teamId}&key=${apiKey}`,
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
    setTeamStatistics(null)
    await axios
      .get(
        `/api/fetchStatisticsTeam?seasonId=${season}&leagueId=${league}&teamId=${teamId}&key=${apiKey}`,
      )
      .then((result) => {
        const teamStatisticsResponse = result.data.response
        setTeamStatistics(teamStatisticsResponse)
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
      <Header title={`Hello ${user.account.firstname}, ${handleTurn()}.`} />

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
            isLoading={isLoadingLeagues}
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
            isLoading={isLoadingTeams}
            disabled={teams.length <= 1}
            label="Select a team"
            itens={teams}
            onAction={(item) => {
              handleGetTeamStatistics(item.value)
              handleGetTeam(item.value)
              handleGetTeamPlayers(item.value)
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

                    {players && players.length > 0 ? (
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
                    ) : (
                      <DontHaveContent style={{ height: '100%' }} />
                    )}
                  </BoxContent>

                  <ContentGridStatistics>
                    <BoxContent>
                      <h4>Top used lineups</h4>

                      {teamStatistics.lineups &&
                      teamStatistics.lineups.length > 0 ? (
                        <ContentBox>
                          <ContentGrid flex borderBottom>
                            <strong>Lineups</strong>
                            <strong>Total games</strong>
                          </ContentGrid>
                          {teamStatistics.lineups.map((lineUp) => (
                            <ContentGrid
                              flex
                              key={lineUp.formation}
                              borderBottom
                            >
                              <p>{lineUp.formation}</p>
                              <p>{lineUp.played}</p>
                            </ContentGrid>
                          ))}
                        </ContentBox>
                      ) : (
                        <DontHaveContent />
                      )}
                    </BoxContent>

                    <BoxContent>
                      <h4>Result games</h4>
                      {teamStatistics.fixtures ? (
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
                      ) : (
                        <DontHaveContent />
                      )}
                    </BoxContent>
                  </ContentGridStatistics>
                </StatisticsContent>

                <GraphicContent>
                  <BoxContent>
                    <h4>For goals</h4>
                    {teamStatistics.goals &&
                    teamStatistics.goals.for.total.total > 0 ? (
                      <div style={{ padding: '1rem 1rem 0 0' }}>
                        <ChartComponent
                          minute={teamStatistics.goals.for.minute}
                        />
                      </div>
                    ) : (
                      <DontHaveContent />
                    )}
                  </BoxContent>
                  <BoxContent>
                    <h4>Agaisnt goals</h4>
                    {teamStatistics.goals &&
                    teamStatistics.goals.for.total.total ? (
                      <div style={{ padding: '1rem 1rem 0 0' }}>
                        <ChartComponent
                          minute={teamStatistics.goals.against.minute}
                        />
                      </div>
                    ) : (
                      <DontHaveContent />
                    )}
                  </BoxContent>
                </GraphicContent>
              </Content>
            </>
          ) : isLoading ? (
            <StatisticsSkeleton />
          ) : (
            <NoContent>
              {countries.length === 0 ? (
                <Image
                  src={badIcon}
                  alt="bad icon"
                  width={150}
                  height={150}
                  style={{ marginBottom: '1rem' }}
                />
              ) : (
                <Image
                  src={noContentIcon}
                  alt="soccer player"
                  width={300}
                  height={300}
                />
              )}
              <h3>
                {countries.length === 0
                  ? 'Check the restrictions of your account regarding the API key, as they may be causing issues.'
                  : 'Conduct a search and stay informed about all the statistics of your team.'}
              </h3>
              <Link
                href={'https://dashboard.api-football.com/'}
                target="_blank"
              >
                API Sports
              </Link>
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

  const seasons = seasonsResponse.data.response.map((season: string[]) => {
    const formart = {
      name: season,
      item: season,
    }

    return formart
  })

  return {
    props: { countries, seasons, apiKey: params.key },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
