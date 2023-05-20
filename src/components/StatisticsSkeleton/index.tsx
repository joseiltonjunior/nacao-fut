import { Content, StatisticsContent } from '@/styles/pages/home'
import Skeleton from 'react-loading-skeleton'
import { GraphicContent } from '../GraphicGoalsStatistics/styles'

export function StatisticsSkeleton() {
  return (
    <>
      <header>
        <Skeleton width={80} height={80} />
        <div style={{ width: '100%', maxWidth: 300 }}>
          <Skeleton width={'100%'} height={16} />

          <Skeleton width={'100%'} height={16} />
        </div>
      </header>

      <Content>
        <StatisticsContent>
          <Skeleton width={'100%'} height={300} />

          <Skeleton width={'100%'} height={'100%'} />

          <Skeleton width={'100%'} height={'100%'} />
        </StatisticsContent>

        <GraphicContent>
          <Skeleton width={'100%'} height={300} />

          <Skeleton width={'100%'} height={'100%'} />
        </GraphicContent>
      </Content>
    </>
  )
}
