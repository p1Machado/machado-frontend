import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

export function AppSecurity({ children }) {
  const history = useHistory();
  const onRedirectCallback = useCallback(
    (appState) => {
      // Use the router's history module to replace the url
      history.replace(appState?.returnTo || window.location.pathname);
    },
    [history],
  );
  return (
    <Auth0Provider
      domain="machado.auth0.com"
      clientId="jR2B192rsxdv3hpmxq1Xp6kpruz8grwF"
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <SecurityHandler>{children}</SecurityHandler>
    </Auth0Provider>
  );
}

function SecurityHandler({ children }) {
  const { getAccessTokenSilently, loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();

  useEffect(() => {
    const getAccessToken = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: "https://machado.herokuapp.com/",
        scope: "read:projetos",
      });
      localStorage.setItem("access_token", accessToken);
    };
    if (isAuthenticated) {
      getAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div>...</div>;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return false;
  }

  return children;
}
