import { Reducer } from 'redux'
import { userProps } from './action'

const INITIAL_STATE: userProps = { user: null }

const user: Reducer<userProps> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@user/SET_USER': {
      const { user } = action.payload

      return (state = user)
    }

    default: {
      return state
    }
  }
}

export default user
