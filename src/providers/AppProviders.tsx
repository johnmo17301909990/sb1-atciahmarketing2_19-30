import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../lib/apollo';
import { AnalyticsProvider } from '../context/AnalyticsContext';
import { ConfigProvider } from './ConfigProvider';
import { defaultConfig } from '../config';

interface Props {
  children: React.ReactNode;
}

export function AppProviders({ children }: Props) {
  return (
    <ConfigProvider config={defaultConfig}>
      <ApolloProvider client={apolloClient}>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </ApolloProvider>
    </ConfigProvider>
  );
}