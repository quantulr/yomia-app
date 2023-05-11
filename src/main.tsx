import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {FluentProvider, teamsLightTheme} from '@fluentui/react-components';
import {RouterProvider} from "react-router-dom";
import router from "./router";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <FluentProvider theme={teamsLightTheme}>
            <RouterProvider router={router}></RouterProvider>
        </FluentProvider>
    </React.StrictMode>,
)
