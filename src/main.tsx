import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AnalyticsProvider>
        <App />
      </AnalyticsProvider>
    </ErrorBoundary>
  </React.StrictMode>
);