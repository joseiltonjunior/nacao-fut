import Skeleton from 'react-loading-skeleton'
import { Container, Main, Form } from '@/styles/pages/home'

export function HomeSkeleton() {
  return (
    <>
      <Skeleton width={'100%'} height={'4rem'} />
      <Container>
        <Skeleton width={'40%'} height={'1rem'} />
        <Form>
          <Skeleton width={'100%'} height={40} />
          <Skeleton width={'100%'} height={40} />
          <Skeleton width={'100%'} height={40} />
          <Skeleton width={'100%'} height={40} />
        </Form>
        <Main>
          <Skeleton width={'100%'} height={'calc(100vh - 17rem)'} />
        </Main>
      </Container>
      <Skeleton width={'100%'} height={'4rem'} />
    </>
  )
}
