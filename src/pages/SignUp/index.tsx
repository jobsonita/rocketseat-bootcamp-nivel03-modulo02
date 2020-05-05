import React from 'react'

import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { Background, Container, Content } from './styles'

const SignUp: React.FC = () => (
  <Container>
    <Background />

    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Faça seu cadastro</h1>

        <Input name="name" placeholder="Nome" Icon={FiUser} />
        <Input name="email" placeholder="E-mail" Icon={FiMail} />

        <Input
          name="password"
          type="password"
          placeholder="Senha"
          autoComplete="new-password"
          Icon={FiLock}
        />

        <Button type="submit">Cadastrar</Button>
      </form>

      <a href="/">
        <FiArrowLeft />
        Voltar para logon
      </a>
    </Content>
  </Container>
)

export default SignUp
