import { userDataProps } from '@/types/home'

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
