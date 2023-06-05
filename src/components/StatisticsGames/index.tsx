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
      <header>
        <h4>Resultados dos jogos</h4>
      </header>
      {fixtures && fixtures.played.total > 0 ? (
        <ContentBox>
          <ContentGrid flex borderBottom>
            <strong>Ganhou</strong>
            <p>{fixtures.wins.total}</p>
          </ContentGrid>
          <ContentGrid flex borderBottom>
            <strong>Empatou</strong>
            <p>{fixtures.draws.total}</p>
          </ContentGrid>
          <ContentGrid flex borderBottom>
            <strong>Perdeu</strong>
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
