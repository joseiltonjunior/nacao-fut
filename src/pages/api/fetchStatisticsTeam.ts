import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { key, seasonId, leagueId, teamId } = req.query

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/teams/statistics?season=${seasonId}&league=${leagueId}&team=${teamId}`,
      {
        headers: {
          'x-rapidapi-key': key,
          'x-rapidapi-host': 'api-football.com',
        },
      },
    )

    return res.status(200).json(response.data)
  } catch (error) {
    const { message } = error as Error
    return res.status(400).json({ message })
  }
}
