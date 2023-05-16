import { reduxProps } from '@/storage'
import { userDataProps } from '@/storage/modules/user/action'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  const user = useSelector<reduxProps, userDataProps>((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (!user || !user.secretkey) {
      router.push('/')
    }
  }, [router, user])

  return <div>Olá, {user.account.firstname}</div>
}
