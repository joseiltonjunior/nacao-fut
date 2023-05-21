import axios from 'axios'
import dotenv from 'dotenv'

import { describe, it, expect } from 'vitest'
dotenv.config({ path: '.env.local' })

describe('Fetch many countries (E2E)', () => {
  it('slould be able to get countries', async () => {
    const response = await axios.get(
      `https://v3.football.api-sports.io/countries`,
      {
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY_API,
          'x-rapidapi-host': 'api-football.com',
        },
      },
    )
    expect(response.status).toEqual(200)
    expect(response.data.response[0]).toEqual({
      code: expect.any(String) || null,
      name: expect.any(String) || null,
      flag: expect.any(String) || null,
    })
  })
})
