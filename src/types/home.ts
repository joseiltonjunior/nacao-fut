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

export interface teamStatisticsResponseProps {
  fixtures: {
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
  lineups: {
    formation: string
    played: number
  }[]
  goals: {
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
        '0-15': {
          total: number
          percentage: string
        }
        '16-30': {
          total: number
          percentage: string
        }
        '31-45': {
          total: number
          percentage: string
        }
        '46-60': {
          total: number
          percentage: string
        }
        '61-75': {
          total: number
          percentage: string
        }
        '76-90': {
          total: number
          percentage: string
        }
        '91-105': {
          total: number
          percentage: string
        }
        '106-120': {
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
        '0-15': {
          total: number
          percentage: string
        }
        '16-30': {
          total: number
          percentage: string
        }
        '31-45': {
          total: number
          percentage: string
        }
        '46-60': {
          total: number
          percentage: string
        }
        '61-75': {
          total: number
          percentage: string
        }
        '76-90': {
          total: number
          percentage: string
        }
        '91-105': {
          total: number
          percentage: string
        }
        '106-120': {
          total: number | null
          percentage: string | null
        }
      }
    }
  }
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
