import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const response = await axios.get('https://v3.football.api-sports.io', {
      headers: {
        'x-rapidapi-key': process.env.NEXT_SECRET_KEY_API,
        'x-rapidapi-host': 'api-football.com',
      },
    })

    const footballData = response.data

    return res.status(200).json({
      footballData,
    })
  } catch (error) {
    const { message } = error as Error
    return res.status(400).json({ message })
  }
}
