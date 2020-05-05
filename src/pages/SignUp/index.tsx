import React, { useCallback } from 'react'

import { Form } from '@unform/web'
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { Background, Container, Content } from './styles'

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().min(6, 'No mínimo 6 caracteres'),
})

const SignUp: React.FC = () => {
  const handleSubmit = useCallback(async (data: object): Promise<void> => {
    try {
      await schema.validate(data, { abortEarly: false })
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form onSubmit={handleSubmit}>
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
        </Form>

        <a href="/">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  )
}

export default SignUp
