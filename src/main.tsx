import React from "react";
import ReactDOM from "react-dom/client";
import { TiptapEditorProvider } from "./context.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TiptapEditorProvider>
      <App />
    </TiptapEditorProvider>
  </React.StrictMode>
);
