import './App.css'

import { metadata, networks, projectId, wagmiAdapter } from './config'
import { createAppKit } from '@reown/appkit/react'
import { AppRoutes } from './AppRoutes'
import { RouterProvider } from 'react-router-dom'

const generalConfig = {
  projectId,
  networks,
  metadata,
  themMode: 'light',
  themeVariables: {
    '--w3m-accent': '#000000',
  }
}

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  ...generalConfig,
  features: {
    analytics: true
  }
})

function App() {


  return (
    <RouterProvider router={AppRoutes} fallbackElement="Loading..." />
  )
}

export default App
