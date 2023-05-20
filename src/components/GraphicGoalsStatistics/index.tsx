import { goalsProps } from '@/types/home'
import { BoxContent } from '../BoxContent'
import { ChartCustom } from '../ChartCustom'
import { DontHaveStatistics } from '../DontHaveStatistics'
import { GraphicContent } from './styles'

interface graphicGolsProps {
  goals: goalsProps
}

export function GraphicGoalsStatistics({ goals }: graphicGolsProps) {
  console.log(goals)
  return (
    <GraphicContent>
      <BoxContent>
        <h4>For goals</h4>
        {goals.for.minute['0-15'].total !== null ? (
          <div style={{ padding: '1rem 1rem 0 0' }}>
            <ChartCustom minute={goals.for.minute} />
          </div>
        ) : (
          <DontHaveStatistics />
        )}
      </BoxContent>
      <BoxContent>
        <h4>Agaisnt goals</h4>
        {goals.against.minute['0-15'].total !== null ? (
          <div style={{ padding: '1rem 1rem 0 0' }}>
            <ChartCustom minute={goals.against.minute} />
          </div>
        ) : (
          <DontHaveStatistics />
        )}
      </BoxContent>
    </GraphicContent>
  )
}
