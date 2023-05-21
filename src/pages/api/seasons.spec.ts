import axios from 'axios'
import dotenv from 'dotenv'

import { describe, it, expect } from 'vitest'
dotenv.config({ path: '.env.test' })

describe('Fetch many seasons (E2E)', () => {
  it('slould be able to get seasons', async () => {
    const response = await axios.get(
      `https://v3.football.api-sports.io/leagues/seasons`,
      {
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY_API,
          'x-rapidapi-host': 'api-football.com',
        },
      },
    )
    expect(response.status).toEqual(200)
    expect(response.data.response).toEqual(
      expect.arrayContaining([expect.any(Number)]),
    )
  })
})
