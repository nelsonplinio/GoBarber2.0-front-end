import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiLock, FiUser, FiMail, FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import getvalidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/logo.svg';

import { Container, Content, AnimatedContainer, Background } from './styles';

interface SignUpData {
  name: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('O nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().min(6, 'No Mínio 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, password } = data;

        await api.post('/users', { name, email, password });

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no sistema.',
        });

        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getvalidationErrors(error);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Deu um erro ao realizar o cadastro, tente novamente.',
        });
      }
    },
    [history, addToast],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimatedContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </AnimatedContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
