// src/hooks/useAuth.js
import { useAuth0 } from "@auth0/auth0-react";

export const useAuth = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return {
    user: isAuthenticated ? user : null,
    isAuthenticated,
    login: loginWithRedirect,
    logout: () => logout({ returnTo: window.location.origin })
  };
};