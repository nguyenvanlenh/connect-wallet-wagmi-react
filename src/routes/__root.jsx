import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import "../index.css"
import { metadata, networks, projectId, wagmiAdapter } from '../config'
import { createAppKit } from '@reown/appkit/react'

const generalConfig = {
    projectId,
    networks,
    metadata,
    themMode: 'dark',
    themeVariables: {
        '--w3m-accent': '#000000',
        "--wcm-font-family": "Roboto, sans-serif",
        "--wcm-accent-color": "#F5841F",
    }
}

createAppKit({
    adapters: [wagmiAdapter],
    ...generalConfig,
    features: {
        analytics: true
    }
})
export const Route = createRootRoute({
    component: () => (
        <div style={{ padding: "20px" }}>
            <header style={{
                display: "flex",
                gap: "15px",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                padding: "20px"
            }}>
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>{' '}
                <Link to="/component-authoried" className="[&.active]:font-bold">
                    Component
                </Link>
                <Link to="/page1" className="[&.active]:font-bold">
                    Page1
                </Link>
                <Link to="/page2" className="[&.active]:font-bold">
                    Page2
                </Link>
            </header>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
            }}>
                <Outlet />
            </div>
            <TanStackRouterDevtools />
        </div>
    ),
})