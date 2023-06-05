import axios from 'axios'

import { useToast } from '@/hooks/useToast'
import { Container, Main } from '@/styles/pages/auth'

import { Button } from '@/components/Button'
import { useState } from 'react'
import Image from 'next/image'

import bkgd from '@/assets/home-bkgd-removebg-preview.png'

import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'
import { setUser } from '@/storage/modules/user/action'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Auth() {
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

  async function handleStatusUser() {
    setIsLoading(true)
    await axios
      .get(`/api/status?key=${process.env.NEXT_PUBLIC_KEY_API}`)
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
        router.push(`/home/${process.env.NEXT_PUBLIC_KEY_API}`)
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
          <div>
            <h3>Nação apaixonadaa ⚽</h3>
            <span>
              Mergulhe no universo do futebol com Nação Fut - seu guia essencial
              para o mundo do futebol.
            </span>
            <Button
              type="submit"
              isLoading={isLoading}
              onClick={() => handleStatusUser()}
            >
              Acessar
            </Button>
          </div>
        </Main>
        <aside>
          <Image src={bkgd} alt="home background" width={500} height={500} />
        </aside>
      </Container>
      <Footer />
    </>
  )
}
