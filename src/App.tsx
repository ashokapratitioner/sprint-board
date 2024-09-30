import { Auth0Provider } from "@auth0/auth0-react";
import "./App.css";
import RouterProviderExtended from "./router/RouteProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getConfig } from "./config";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const queryClient = new QueryClient();

const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
};

function App() {
  return (
    <Auth0Provider {...providerConfig}>
      <QueryClientProvider client={queryClient}>
        <RouterProviderExtended />
      </QueryClientProvider>
    </Auth0Provider>
  );
}

export default App;
