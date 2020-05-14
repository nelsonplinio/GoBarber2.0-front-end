import React, { useEffect, useMemo } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [removeToast, message.id]);

  const icons = useMemo(
    () => ({
      info: <FiInfo size={24} />,
      error: <FiAlertCircle size={24} />,
      success: <FiCheckCircle size={24} />,
    }),
    [],
  );

  return (
    <Container hasDescription={!!message.description} type={message.type}>
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={16} />
      </button>
    </Container>
  );
};

export default Toast;
