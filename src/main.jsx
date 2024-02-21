import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <ModalsProvider>
      <Notifications position="top-right" zIndex={1000}/>
        <App />
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>,
)
