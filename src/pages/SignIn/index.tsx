import React, { useCallback, useRef } from 'react'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { Background, Container, Content } from './styles'

import getValidationErrors from '../../utils/getValidationErrors'

const schema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().required('Senha obrigatória'),
})

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async (data: object): Promise<void> => {
    formRef.current?.setErrors({})

    try {
      await schema.validate(data, { abortEarly: false })
    } catch (error) {
      formRef.current?.setErrors(getValidationErrors(error))
    }
  }, [])

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
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
        </Form>

        <a href="/signup">
          <FiLogIn />
          Criar conta
        </a>
      </Content>

      <Background />
    </Container>
  )
}

export default SignIn
