import React from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import { Container, Content, Background } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <form>
          <h1>Faça seu login</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </form>
        <a href="signUp">
          <FiLogIn />
          Criar conda
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
