import React from "react";
import ReactDOM from "react-dom/client";
import { TiptapEditorProvider } from "./context.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TiptapEditorProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </TiptapEditorProvider>
  </React.StrictMode>
);
