import React, { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { AxiosError } from 'axios'
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import { useAuth } from '../../context/auth'
import { useToast } from '../../context/toast'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { AnimationContainer, Background, Container, Content } from './styles'

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

  const { signIn } = useAuth()

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async ({ email, password }: SignInFormData): Promise<void> => {
      formRef.current?.setErrors({})

      try {
        await schema.validate({ email, password }, { abortEarly: false })
      } catch (error) {
        formRef.current?.setErrors(getValidationErrors(error))
        addToast({
          type: 'error',
          title: 'Falha na validação',
          description: 'Verifique os dados do formulário',
        })
        return
      }

      try {
        await signIn({ email, password })
      } catch (error) {
        if (error.message === 'Network Error') {
          addToast({
            type: 'error',
            title: 'Falha na requisição',
            description: 'Verifique sua conexão com a internet',
          })
        } else {
          const { response } = error as AxiosError<SignInError>
          addToast({
            type: 'error',
            title: 'Falha na autenticação',
            description: response?.data.message,
          })
        }
      }
    },
    [addToast, signIn]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
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

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  )
}

export default SignIn
