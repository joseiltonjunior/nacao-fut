import { styled } from '@stitches/react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const Container = styled(Chart, {
  '.apexcharts-menu': {
    backgroundColor: '$gray300',
    color: '$gray900',
    border: 'none',
    padding: 0,
    margin: 0,
    borderRadius: 8,
    overflow: 'hidden',
  },

  '.apexcharts-menu-item': {
    paddingRight: 15,
  },
})
