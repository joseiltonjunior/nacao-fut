import axios from 'axios'
import dotenv from 'dotenv'

import { describe, it, expect } from 'vitest'
dotenv.config({ path: '.env.local' })

describe('Fetch many leagues (E2E)', () => {
  it('slould be able to get leagues', async () => {
    const country = 'Brazil'
    const season = 2022
    const response = await axios.get(
      `https://v3.football.api-sports.io/leagues?country=${country}&season=${season}`,
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
        league: expect.any(Object),
        country: expect.any(Object),
        seasons: expect.any(Array),
      }),
    )
  })
})
