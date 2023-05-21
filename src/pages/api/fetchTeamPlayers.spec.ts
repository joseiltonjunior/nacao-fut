import axios from 'axios'
import dotenv from 'dotenv'

import { describe, it, expect } from 'vitest'
dotenv.config({ path: '.env.local' })

describe('Fetch players team (E2E)', () => {
  it('slould be able to get players team', async () => {
    const season = 2022
    const league = 72
    const team = 755
    const response = await axios.get(
      `https://v3.football.api-sports.io/players?season=${season}&league=${league}&team=${team}`,
      {
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY_API,
          'x-rapidapi-host': 'api-football.com',
        },
      },
    )
    expect(response.status).toEqual(200)
    expect(response.data.response[0]).toEqual(
      expect.objectContaining({
        player: expect.any(Object),
        statistics: expect.any(Object),
      }),
    )
  })
})
