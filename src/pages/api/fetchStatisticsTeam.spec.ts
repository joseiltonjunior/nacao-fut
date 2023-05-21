import axios from 'axios'
import dotenv from 'dotenv'

import { describe, it, expect } from 'vitest'
dotenv.config({ path: '.env.test' })

describe('Fetch statistics team (E2E)', () => {
  it('slould be able to get statistics team', async () => {
    const season = 2022
    const league = 72
    const team = 755
    const response = await axios.get(
      `https://v3.football.api-sports.io/teams/statistics?season=${season}&league=${league}&team=${team}`,
      {
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY_API,
          'x-rapidapi-host': 'api-football.com',
        },
      },
    )

    expect(response.status).toEqual(200)
    expect(response.data.response).toEqual(
      expect.objectContaining({
        league: expect.any(Object),
        team: expect.any(Object),
        form: expect.any(String),
        fixtures: expect.any(Object),
        goals: expect.any(Object),
        biggest: expect.any(Object),
        clean_sheet: expect.any(Object),
        failed_to_score: expect.any(Object),
        penalty: expect.any(Object),
        lineups: expect.any(Array),
        cards: expect.any(Object),
      }),
    )
  })
})
