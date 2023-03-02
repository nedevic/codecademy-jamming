import React from "react";

import "./PlayList.css";

import TrackList from "../tracklist/TrackList";

class PlayList extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <input defaultValue="New Playlist" />
        <TrackList isRemoval={true} />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default PlayList;
