import { ContentBox, ContentGrid } from '@/styles/pages/home'
import { BoxContent } from '../BoxContent'
import { DontHaveStatistics } from '../DontHaveStatistics'
import { fixturesProps } from '@/types/home'

interface statisticsGamesProps {
  fixtures: fixturesProps
}

export function StatisticsGames({ fixtures }: statisticsGamesProps) {
  return (
    <BoxContent>
      <h4>Result games</h4>
      {fixtures && fixtures.played.total > 0 ? (
        <ContentBox>
          <ContentGrid flex borderBottom>
            <strong>Wins</strong>
            <p>{fixtures.wins.total}</p>
          </ContentGrid>
          <ContentGrid flex borderBottom>
            <strong>Draws</strong>
            <p>{fixtures.draws.total}</p>
          </ContentGrid>
          <ContentGrid flex borderBottom>
            <strong>Loses</strong>
            <p>{fixtures.loses.total}</p>
          </ContentGrid>
          <ContentGrid flex borderBottom>
            <strong>Total</strong>
            <p>{fixtures.played.total}</p>
          </ContentGrid>
        </ContentBox>
      ) : (
        <DontHaveStatistics />
      )}
    </BoxContent>
  )
}
