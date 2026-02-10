import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./graphql/apolloClient.ts";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
      <ToastContainer
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        position="top-right"
      />
    </ApolloProvider>
  </StrictMode>,
);
