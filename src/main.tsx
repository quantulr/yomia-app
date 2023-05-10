import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {FluentProvider, teamsLightTheme} from '@fluentui/react-components';
import Login from "./pages/login.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <FluentProvider theme={teamsLightTheme}>
            {/*<App/>*/}
            <Login/>
        </FluentProvider>
    </React.StrictMode>,
)
