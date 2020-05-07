import React from 'react'

import { Container } from './styles'
import Toast from './Toast'

import { ToastFormat } from '../../context/toast'

interface ToastContainerProps {
  toasts: ToastFormat[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <Container>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </Container>
  )
}

export default ToastContainer
