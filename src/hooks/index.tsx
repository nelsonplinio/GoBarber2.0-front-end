import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

/** Esté componente contem os providers globais */

const AppProvider: React.FC = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  );
};

export default AppProvider;
