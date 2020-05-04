import React from 'react'

import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { Background, Container, Content } from './styles'

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Faça seu logon</h1>

        <Input name="email" placeholder="E-mail" Icon={FiMail} />

        <Input
          name="password"
          type="password"
          placeholder="Senha"
          autoComplete="current-password"
          Icon={FiLock}
        />

        <Button type="submit">Entrar</Button>

        <a href="forgot">Esqueci minha senha</a>
      </form>

      <a href="signup">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
)

export default SignIn
