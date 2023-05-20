import { Container, MoreInfo, ExpansiveButton, ButtonMoveTop } from './styles'

import { AiFillCaretUp } from 'react-icons/ai'
import { useState } from 'react'
import { Apresetation } from './Apresentation'

import { Contact } from './Contact'
import { ProviderData } from './ProviderData'

export function Footer() {
  const [expand, setExpand] = useState(false)

  return (
    <Container>
      <ExpansiveButton
        onClick={() => {
          setExpand(!expand)
        }}
      >
        {expand ? 'Menos informação' : 'Mais informação'}
      </ExpansiveButton>
      <MoreInfo expand={expand}>
        {expand && (
          <>
            <Apresetation />

            <Contact />

            <ProviderData />
          </>
        )}
      </MoreInfo>
      <main>
        <div>
          <p>{`I Love Football`} 2023</p>
          <p>Todos os direitos reservados</p>
        </div>

        <ButtonMoveTop
          title="Go to top"
          onClick={() => {
            document.body.scrollTop = document.documentElement.scrollTop = 0
          }}
        >
          <AiFillCaretUp />
        </ButtonMoveTop>
      </main>
    </Container>
  )
}
