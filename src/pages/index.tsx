import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/useToast'
import { Container, Main } from '@/styles/pages/auth'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { useState } from 'react'
import Image from 'next/image'

import bkgd from '@/assets/home-bkgd-removebg-preview.png'

import { useRouter } from 'next/router'
import Link from 'next/link'
import { authProps } from '@/types/auth'
import { useDispatch } from 'react-redux'
import { setUser } from '@/storage/modules/user/action'
import { Header } from '@/components/Header'

const schema = z.object({
  clientSecretKey: z.string().min(25, { message: 'minimum of 25 characters' }),
})

export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<authProps>({
    resolver: zodResolver(schema),
  })

  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToast()
  const dispatch = useDispatch()

  const router = useRouter()

  function handleError(type: 'key' | 'limit' | 'generic') {
    let messageError = ''

    switch (type) {
      case 'key':
        messageError = 'Invalid application key'
        break

      case 'limit':
        messageError = 'Daily limit exceeded, upgrade your account'
        break

      default:
        messageError = 'Unavailable service'
        break
    }

    showToast(messageError, {
      type: 'error',
      theme: 'colored',
    })

    setIsLoading(false)
  }

  async function handleStatusUser({ clientSecretKey }: authProps) {
    setIsLoading(true)
    await axios
      .get(`/api/status?key=${clientSecretKey}`)
      .then((result) => {
        const { errors, response } = result.data

        if (
          errors.token &&
          errors.token.includes('Error/Missing application key')
        ) {
          handleError('key')
          return
        }

        if (response.requests.current >= response.requests.limit_day) {
          handleError('limit')
          return
        }

        dispatch(setUser({ user: response }))
        router.push(`/home/${clientSecretKey}`)
      })
      .catch(() => {
        handleError('generic')
      })
  }

  return (
    <>
      <Header isAuth />
      <Container>
        <Main>
          <h3>Hello, welcome to I 🧡 Football</h3>
          <form onSubmit={handleSubmit(handleStatusUser)}>
            <Input
              label="Enter your login key"
              name="clientSecretKey"
              register={register}
              error={errors.clientSecretKey}
            />
            <Button type="submit" isLoading={isLoading}>
              Enter
            </Button>

            <Link
              href={'https://dashboard.api-football.com/login'}
              target="_blank"
            >
              Create new account
            </Link>
          </form>
        </Main>
        <aside>
          <Image src={bkgd} alt="home background" width={500} height={500} />
        </aside>
      </Container>
    </>
  )
}
