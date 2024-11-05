import React, { createContext, useContext } from 'react';
import { defaultConfig } from '../config';

const ConfigContext = createContext(defaultConfig);

interface Props {
  children: React.ReactNode;
  config?: typeof defaultConfig;
}

export function ConfigProvider({ children, config = defaultConfig }: Props) {
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}