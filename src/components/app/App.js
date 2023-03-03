import React from "react";
import { useState } from "react";

import "./App.css";

import PlayList from "../playlist/PlayList";
import SearchBar from "../searchbar/SearchBar";
import SearchResults from "../searchresults/SearchResults";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playListName, setPlayListName] = useState(null);
  const [playListTracks, setPlayListTracks] = useState([]);

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

  const addTrack = (track) => {
    if (
      playListTracks.find(savedTrack => savedTrack.id === track.id)
      !== undefined
    ) {
      return;  // the track is already inside playListTracks
    }
    
    setPlayListTracks([...playListTracks, track]);
  };

  const removeTrack = (track) => {
    const trackIndex = playListTracks.findIndex(
      savedTrack => savedTrack.id === track.id
    );

    if (trackIndex === -1) {
      return;
    }
    
    setPlayListTracks(
      playListTracks.filter((_, i) => i != trackIndex)
    );
  };

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
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
    </div>
  );
}

export default App;
