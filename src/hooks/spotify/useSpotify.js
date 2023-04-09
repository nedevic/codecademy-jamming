/**
 * CREDITS TO kenchandev:
 * https://github.com/newline-sandbox/spotify-custom-hook-demo
 */

import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import SpotifyHookUtils from "./SpotifyHookUtils";

const LS_KEYS = {  // Keys used for local storage
  ACCESS_TOKEN: "SPOTIFY_ACCESS_TOKEN",
  TOKEN_TYPE: "SPOTIFY_TOKEN_TYPE",
  TOKEN_EXPIRATION_TIME: "SPOTIFY_TOKEN_EXPIRATION_TIME",
};

const spotifyContext = createContext();
let spotifySessionTimeoutID = null;

export const useSpotifyContext = () => {
  return useContext(spotifyContext);
};

export const SpotifyProvider = ({ children }) => {
  const spotify = useSpotify();

  return (
    <spotifyContext.Provider value={spotify}>
      {children}
    </spotifyContext.Provider>
  );
};

const useSpotify = () => {
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [spotifyTokenType, setSpotifyTokenType] = useState(null);
  const [spotifyTokenExpirationTime, setSpotifyTokenExpirationTime] = useState(null);

  const history = useNavigate();

  const initiateSpotifyLogin = () => {
    // launch a popup window that can be used by the user to grant access
    const popup = window.open(SpotifyHookUtils.getLoginURL());
    
    window.spotifyAuthCallback = () => {
      popup.close();
      loadTokenInfoFromLocalStorage();
      setSpotifySessionTimeout();
    };
  };

  const captureSpotifyTokenAtRedirect = () => {
    const tokenData = SpotifyHookUtils.extractTokenFromURL(window);

    if (tokenData === null) {
      console.log("The authorization token data could not be fetched.");
      return;
    }

    // extract token data
    const { access_token, token_type, token_expiration_time } = tokenData;

    // save token data to localStorage
    window.localStorage.setItem(LS_KEYS.ACCESS_TOKEN, access_token);
    window.localStorage.setItem(LS_KEYS.TOKEN_TYPE, token_type);
    window.localStorage.setItem(LS_KEYS.TOKEN_EXPIRATION_TIME, token_expiration_time);

    // close the popup window
    window.opener.spotifyAuthCallback();
  };

  const hasRedirectedFromValidPopup = () => {
    if (window.opener === null) {
      return false;
    }

    const { hostname: openerHostname } = new URL(window.opener.location.href);
    const { hostname } = new URL(window.location.href);

    return (
      window.opener
      && window.opener !== window
      && window.opener.spotifyAuthCallback
      && openerHostname === hostname
      && history.length >= 2 // at least two entries: one for Spotify and one for redirect
    );
  };

  const loadTokenInfoFromLocalStorage = () => {
    setSpotifyToken(window.localStorage.getItem(LS_KEYS.ACCESS_TOKEN));
    setSpotifyTokenType(window.localStorage.getItem(LS_KEYS.TOKEN_TYPE));
    setSpotifyTokenExpirationTime(window.localStorage.getItem(LS_KEYS.TOKEN_EXPIRATION_TIME));
  };

  const clearTokenInfoFromLocalStorage = () => {
    Object.values(LS_KEYS).forEach((key) => {
      window.localStorage.removeItem(key);
    });
  };

  const getSpotifyTokenRemainingValidity = () => {
    const token = spotifyToken || window.localStorage.getItem(LS_KEYS.ACCESS_TOKEN);
    const tokenType = spotifyTokenType || window.localStorage.getItem(LS_KEYS.TOKEN_TYPE);
    const tokenExpirationTime = spotifyTokenExpirationTime || window.localStorage.getItem(LS_KEYS.TOKEN_EXPIRATION_TIME);

    if (
      !token ||
      !tokenType ||
      !tokenExpirationTime
    ) {
      return 0;
    }
    
    const now =  Math.floor(Date.now() / 1000);

    return Math.max(0, tokenExpirationTime - now);
  };

  const setSpotifySessionTimeout = () => {
    const tokenRemainingValidity = getSpotifyTokenRemainingValidity();

    if (tokenRemainingValidity > 0) {
      spotifySessionTimeoutID = setTimeout(() => {
        revokeToken();
        alert('Session expired! Please log in again to continue using the application.');
      }, tokenRemainingValidity * 1000);
    }
  };

  const clearSpotifySessionTimeout = () => {
    if (spotifySessionTimeoutID !== null) {
      clearTimeout(spotifySessionTimeoutID);
      spotifySessionTimeoutID = null;
    }
  };

  const isSpotifyTokenValid = () => {
    return getSpotifyTokenRemainingValidity() > 0;
  };

  const revokeToken = () => {
    clearTokenInfoFromLocalStorage();
    setSpotifyToken(null);
    setSpotifyTokenType(null);
    setSpotifyTokenExpirationTime(null);
  };

  return {
    initiateSpotifyLogin,
    captureSpotifyTokenAtRedirect,
    loadTokenInfoFromLocalStorage,
    setSpotifySessionTimeout,
    clearSpotifySessionTimeout,
    revokeToken,
    get hasRedirectedFromValidPopup() {
      return hasRedirectedFromValidPopup();
    },
    get isSpotifyTokenValid() {
      return isSpotifyTokenValid();
    },
  };
};
