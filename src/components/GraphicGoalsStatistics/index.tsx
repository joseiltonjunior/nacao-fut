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
        <header>
          <h4>Gols feitos</h4>
          <strong>{goals.for.total.total}</strong>
        </header>
        {goals.for.minute['0-15'].total !== null ? (
          <div style={{ padding: '1rem 1rem 0 0' }}>
            <ChartCustom minute={goals.for.minute} />
          </div>
        ) : (
          <DontHaveStatistics />
        )}
      </BoxContent>
      <BoxContent>
        <header>
          <h4>Gols sofridos</h4>
          <strong>{goals.against.total.total}</strong>
        </header>
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
