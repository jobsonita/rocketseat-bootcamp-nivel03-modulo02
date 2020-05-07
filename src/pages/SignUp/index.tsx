import React, { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { AnimationContainer, Background, Container, Content } from './styles'

import getValidationErrors from '../../utils/getValidationErrors'

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().min(6, 'No mínimo 6 caracteres'),
})

const SignUp: React.FC = () => {
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
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
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

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp
