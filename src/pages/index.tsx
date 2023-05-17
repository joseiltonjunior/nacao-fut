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
// import { useDispatch } from 'react-redux'

// import { setUser } from '@/storage/modules/user/action'
import { useRouter } from 'next/router'

interface authProps {
  clientSecretKey: string
}

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
  // const dispatch = useDispatch()
  const router = useRouter()

  async function handleStatusUser({ clientSecretKey }: authProps) {
    setIsLoading(true)
    await axios
      .get(`/api/football?type=status&key=${clientSecretKey}`)
      .then((result) => {
        const { errors } = result.data

        if (
          errors.token &&
          errors.token.includes('Error/Missing application key')
        ) {
          showToast('Invalid application key', {
            type: 'warning',
            theme: 'colored',
          })

          return
        }

        // dispatch(setUser({ user: { ...response, secretkey: clientSecretKey } }))
        router.push(`/home/${clientSecretKey}`)
      })
      .catch(() => {
        showToast('Unavailable service', {
          type: 'error',
          theme: 'colored',
        })
      })
      .finally(() => setIsLoading(false))
  }

  return (
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
        </form>
      </Main>
      <aside>
        <Image src={bkgd} alt="home background" width={500} height={500} />
      </aside>
    </Container>
  )
}
