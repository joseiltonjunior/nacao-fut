import axios from 'axios'
import dotenv from 'dotenv'

import { describe, it, expect } from 'vitest'
dotenv.config({ path: '.env.local' })

describe('Execeeded limit day. (E2E)', () => {
  it('verify to daily limit exceeded', async () => {
    const response = await axios.get(
      `https://v3.football.api-sports.io/status`,
      {
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY_API,
          'x-rapidapi-host': 'api-football.com',
        },
      },
    )

    expect(response.status).toEqual(200)
    expect(response.data.response.account).toEqual({
      firstname: expect.any(String),
      lastname: expect.any(String),
      email: expect.any(String),
    })
    expect(response.data.response.requests.current).toBeGreaterThan(
      response.data.response.requests.limit_day,
    )
  })
})
