import React from "react";
import { useEffect } from "react";
import { useSpotifyContext } from "../../hooks/spotify/useSpotify";

const SpotifyRedirect = () => {
  const { captureSpotifyTokenAtRedirect } = useSpotifyContext();

  useEffect(() => {
    captureSpotifyTokenAtRedirect();
  }, []);

  return <h1>Redirecting...</h1>
};

export default SpotifyRedirect;
