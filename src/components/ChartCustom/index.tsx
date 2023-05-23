import { Container } from './styles'

interface chartDataProps {
  minute: {
    [key: string]: {
      total: number | null
      percentage: string | null
    }
  }
}

export function ChartCustom({ minute }: chartDataProps) {
  const formattedData = Object.entries(minute).map(([label, values]) => ({
    x: label,
    y: values.total,
    percentage: values.percentage,
  }))

  const options = {
    tooltip: {
      enabled: false,
    },
    colors: ['#00b37e'],
    yaxis: {
      labels: {
        style: {
          colors: '#e1e1e6',
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: '#e1e1e6',
        },
      },
    },
  }

  const series = [
    {
      data: formattedData,
    },
  ]

  return <Container options={options} series={series} type="bar" height={350} />
}
