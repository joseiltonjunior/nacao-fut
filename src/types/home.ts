export interface userDataProps {
  account: {
    email: string
    firstname: string
    lastname: string
  }
  requests: {
    current: number
    limit_day: number
  }
  subscription: {
    active: boolean
    end: string
    plan: string
  }
}
export interface selectProps {
  name: string
  flag: string
  value: string | number
}

export interface seasonsProps {
  name: string
  value: string
}
export interface homeProps {
  apiKey: string
  user: userDataProps
  countries: selectProps[]
  seasons: seasonsProps[]
}

export interface leaguesResponseProps {
  league: {
    id: number
    logo: string
    name: string
    type: string
  }
}

export interface teamsResponseProps {
  team: {
    name: string
    logo: string
    id: number
  }
}

export interface fixturesProps {
  played: {
    home: number
    away: number
    total: number
  }
  wins: {
    home: number
    away: number
    total: number
  }
  draws: {
    home: number
    away: number
    total: number
  }
  loses: {
    home: number
    away: number
    total: number
  }
}

export interface goalsProps {
  for: {
    total: {
      home: number
      away: number
      total: number
    }
    average: {
      home: string
      away: string
      total: string
    }
    minute: {
      [key: string]: {
        total: number | null
        percentage: string | null
      }
    }
  }
  against: {
    total: {
      home: number
      away: number
      total: number
    }
    average: {
      home: string
      away: string
      total: string
    }
    minute: {
      [key: string]: {
        total: number | null
        percentage: string | null
      }
    }
  }
}

export interface lineupsProps {
  formation: string
  played: number
}

export interface teamStatisticsResponseProps {
  fixtures: fixturesProps
  lineups: lineupsProps[]
  goals: goalsProps
}

export interface teamPlayerDataProps {
  name: string
  age: number
  nationality: string
}

export interface teamPlayerResponseProps {
  player: {
    name: string
    age: number
    nationality: string
  }
}

export interface teamResponseProps {
  id: number
  name: string
  code: string
  country: string
  founded: number
  national: boolean
  logo: string
}
