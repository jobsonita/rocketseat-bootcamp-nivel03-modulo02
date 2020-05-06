import React, { useCallback, useContext, useRef } from 'react'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { AxiosError } from 'axios'
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import AuthContext from '../../context/AuthContext'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { Background, Container, Content } from './styles'

import getValidationErrors from '../../utils/getValidationErrors'

interface SignInFormData {
  email: string
  password: string
}

interface SignInError {
  message: string
}

const schema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().required('Senha obrigatória'),
})

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { signIn } = useContext(AuthContext)

  const handleSubmit = useCallback(
    async ({ email, password }: SignInFormData): Promise<void> => {
      formRef.current?.setErrors({})

      try {
        await schema.validate({ email, password }, { abortEarly: false })
      } catch (error) {
        formRef.current?.setErrors(getValidationErrors(error))
        return
      }

      try {
        await signIn({ email, password })
      } catch (error) {
        if (error.message === 'Network Error') {
          console.error('Falha na requisição')
        } else {
          const { response } = error as AxiosError<SignInError>
          console.error(response?.status, response?.data)
        }
      }
    },
    [signIn]
  )

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
