import Credentials from "./SpotifyCredentials";

const SpotifyHookUtils = {
  getLoginURL() {
    return "https://accounts.spotify.com/authorize?" + (
      new URLSearchParams({
        response_type: "token",
        client_id: Credentials.SPOTIFY_API_CLIENT_ID,
        redirect_uri: Credentials.SPOTIFY_API_REDIRECT_URI,
        scope: "playlist-modify-public",
        state: crypto.randomUUID()
      })
      .toString()
    );
  },

  extractTokenFromURL(window) {
    const searchParams = new URLSearchParams(window.location.hash.substring(1));

    try {
      const access_token = searchParams.get("access_token");
      const token_type = searchParams.get("token_type");
      const expires_in = parseInt(searchParams.get("expires_in"), 10);
      const token_validity = Math.floor(Date.now() / 1000) + expires_in;

      return {
        access_token,
        token_type,
        token_validity
      };
    
    } catch (err) {
      console.log(
        "The following error occured when attempting "
        + `to extract the authorization token from the URL: ${err}`
      );

      return null;
    }
  },
};

export default SpotifyHookUtils;
