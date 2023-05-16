export interface userDataProps {
  secretkey: string
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

export interface userProps {
  user: userDataProps | null
}

export function setUser({ user }: userProps) {
  return {
    type: '@user/SET_USER',
    payload: {
      user,
    },
  }
}
