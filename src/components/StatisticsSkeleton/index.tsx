import { Content, GraphicContent, StatisticsContent } from '@/styles/pages/home'
import Skeleton from 'react-loading-skeleton'

export function StatisticsSkeleton() {
  return (
    <>
      <header>
        <Skeleton width={80} height={80} />
        <div>
          <Skeleton width={300} height={16} />

          <Skeleton width={300} height={16} />
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
