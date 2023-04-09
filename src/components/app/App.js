import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import positioningStyles from "../../css_modules/positioning/positioning.module.css";

import Button from "../button/Button";
import PlayList from "../playlist/PlayList";
import SearchBar from "../searchbar/SearchBar";
import SearchResults from "../searchresults/SearchResults";
import SpotifyRedirect from "../spotify/SpotifyRedirect";

import { useSpotifyContext } from "../../hooks/spotify/useSpotify";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playListName, setPlayListName] = useState(null);
  const [playListTracks, setPlayListTracks] = useState([]);
  const {
    initiateSpotifyLogin,
    hasRedirectedFromValidPopup,
    loadTokenInfoFromLocalStorage,
    setSpotifySessionTimeout,
    clearSpotifySessionTimeout,
    revokeToken,
    isSpotifyTokenValid,
  } = useSpotifyContext();

  useEffect(() => {
    /**
     * attempt to use any local storage Spotify token
     * when the page is loaded for the first time
     */
    clearSpotifySessionTimeout();
    loadTokenInfoFromLocalStorage();
    setSpotifySessionTimeout();
  }, []);

  const search = (term) => {
    // TODO: query Spotify's API; replace the code below
    console.log(term);

    const dummyAPIData = [
      {
        id: 1,
        uri: 1,
        name: "Auberge",
        album: "Auberge",
        artist: "Chris Rea"
      },
      {
        id: 2,
        uri: 2,
        name: "Heaven",
        album: "Auberge",
        artist: "Chris Rea"
      },
      {
        id: 3,
        uri: 3,
        name: "Looking for the summer",
        album: "Auberge",
        artist: "Chris Rea"
      }
    ];

    const dummyResults = [dummyAPIData[
      Math.floor(Math.random() * dummyAPIData.length)
    ]];

    setSearchResults(dummyResults);
  };

  const savePlayList = () => {
    // TODO: save the playList to Spotify; replace the code below
    console.log(`Playlist ${playListName} saved`);
    const trackURIs = playListTracks.map(track => track.uri);
  };

  const findTrackIndex = (track) => {
    return playListTracks.findIndex(
      savedTrack => savedTrack.id === track.id
    );
  }

  const addTrack = (track) => {
    if (findTrackIndex(track) === -1) {
      setPlayListTracks([...playListTracks, track]);
    }
  };

  const removeTrack = (track) => {
    const trackIndex = findTrackIndex(track);
    if (trackIndex !== -1) {
      setPlayListTracks(
        playListTracks.filter((_, i) => i !== trackIndex)
      );
    }
  };

  const homeRouteElement = (
    <>
      <h1 className="appTitle">Ja<span className="highlight">mmm</span>ing</h1>
      <div className="background">
      {
        isSpotifyTokenValid
        ? (
          <>
            <div className="appBody">
              <SearchBar onSearch={search} />
              <div className="trackContent">
                <SearchResults
                  searchResults={searchResults}
                  onAdd={addTrack} />
                <PlayList
                  onNameChange={setPlayListName}
                  onSave={savePlayList}
                  playListTracks={playListTracks}
                  onRemove={removeTrack} />
              </div>
            </div>
              <div className={`logoutButtonContainer ${positioningStyles.centerContainer}`}>
              <Button onClick={() => {
                clearSpotifySessionTimeout();
                revokeToken();
              }} >
                LOGOUT
              </Button>
            </div>
          </>
        )
        : (
          <div className={`loginButtonContainer ${positioningStyles.centerContainer}`}>
            <Button onClick={initiateSpotifyLogin} >
              LINK YOUR SPOTIFY ACCOUNT
            </Button>
          </div>
        )
      }
      </div>
    </>
  );

  const callbackRouteElement = (
    isSpotifyTokenValid
    ? <Navigate to="/" />
    : (
      hasRedirectedFromValidPopup
      ? <SpotifyRedirect />
      : <Navigate to="/" />
    )
  );

  return (
    <>
      <Routes>
        <Route exact path="/" element={homeRouteElement} />
        <Route path="/callback" element={callbackRouteElement} />
      </Routes>
    </>
  );
}

export default App;
