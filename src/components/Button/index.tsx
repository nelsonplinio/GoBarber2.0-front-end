import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
  loading,
  loadingText,
  children,
  ...rest
}) => {
  return (
    <Container
      type="button"
      disabled={loading}
      loading={Number(loading || 0)}
      {...rest}
    >
      {loading ? loadingText : children}
    </Container>
  );
};

export default Button;
