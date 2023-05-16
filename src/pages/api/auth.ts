import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { key } = req.query

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const response = await axios.get(
      'https://v3.football.api-sports.io/status',
      {
        headers: {
          'x-rapidapi-key': key,
          'x-rapidapi-host': 'api-football.com',
        },
      },
    )

    const userData = response.data.response

    if (!userData || userData.length === 0) {
      return res.status(400).json({ message: 'Invalid secret key' })
    }

    return res.status(200).json(userData)
  } catch (error) {
    const { message } = error as Error
    return res.status(400).json({ message })
  }
}
