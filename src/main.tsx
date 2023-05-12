import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import App from "./App.tsx";

// router.routes.push({
//     path: '/hello',
//     // element: <Input/>
// })
// router.routes

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FluentProvider theme={teamsLightTheme}>
      {/*<RouterProvider router={router}></RouterProvider>*/}
      {/*<BrowserRouter>*/}
      <App />
      {/*</BrowserRouter>*/}
    </FluentProvider>
  </React.StrictMode>
);
