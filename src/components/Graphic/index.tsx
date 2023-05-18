import { ChartCustom } from './styles'

interface chartDataProps {
  minute: {
    [key: string]: {
      total: number | null
      percentage: string | null
    }
  }
}

export function ChartComponent({ minute }: chartDataProps) {
  const formattedData = Object.entries(minute).map(([label, values]) => ({
    x: label,
    y: values.total,
    percentage: values.percentage,
  }))

  const options = {
    tooltip: {
      enabled: false,
    },
    colors: ['#FFBA00'],
  }

  const series = [
    {
      data: formattedData,
    },
  ]

  return (
    <ChartCustom options={options} series={series} type="bar" height={350} />
  )
}
