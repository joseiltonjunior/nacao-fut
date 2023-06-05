import { ContentBox, ContentGrid } from '@/styles/pages/home'
import { BoxContent } from '../BoxContent'
import { DontHaveStatistics } from '../DontHaveStatistics'
import { lineupsProps } from '@/types/home'

interface statisticsLineups {
  lineups: lineupsProps[]
}

export function StatisticsLineups({ lineups }: statisticsLineups) {
  return (
    <BoxContent>
      <header>
        <h4>Escalações mais utilizadas</h4>
      </header>

      {lineups && lineups.length > 0 ? (
        <ContentBox>
          <ContentGrid flex borderBottom>
            <strong>Lineups</strong>
            <strong>Total games</strong>
          </ContentGrid>
          {lineups.map((lineUp) => (
            <ContentGrid flex key={lineUp.formation} borderBottom>
              <p>{lineUp.formation}</p>
              <p>{lineUp.played}</p>
            </ContentGrid>
          ))}
        </ContentBox>
      ) : (
        <DontHaveStatistics />
      )}
    </BoxContent>
  )
}
