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
  StatisticsContent,
  ContentGridStatistics,
} from '@/styles/pages/home'
import { HomeSkeleton } from '@/components/HomeSkeleton'
import { StatisticsSkeleton } from '@/components/StatisticsSkeleton'

import { useToast } from '@/hooks/useToast'
import { useSelector } from 'react-redux'
import { reduxProps } from '@/storage'

import { DontHaveContent } from '@/components/DontHaveContent'
import { GraphicGoalsStatistics } from '@/components/GraphicGoalsStatistics'
import { StatisticsPlayers } from '@/components/StatisticsPlayers'
import { StatisticsLineups } from '@/components/StatisticsLineups'
import { StatisticsGames } from '@/components/StatisticsGames'

import { StatisticsTeam } from '@/components/StatisticsTeam'

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
      <Header />

      <Container>
        <h3>
          Hey {user.account.firstname}, track the statistics of your favorite
          team.
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
              <StatisticsTeam team={teamSeleted} />
              <Content>
                <StatisticsContent>
                  <StatisticsPlayers players={players} />
                  <ContentGridStatistics>
                    <StatisticsLineups lineups={teamStatistics.lineups} />
                    <StatisticsGames fixtures={teamStatistics.fixtures} />
                  </ContentGridStatistics>
                </StatisticsContent>
                <GraphicGoalsStatistics goals={teamStatistics.goals} />
              </Content>
            </>
          ) : isLoading ? (
            <StatisticsSkeleton />
          ) : (
            <DontHaveContent restrictions={countries.length === 0} />
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
