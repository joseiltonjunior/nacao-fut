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
