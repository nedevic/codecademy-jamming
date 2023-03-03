import React from "react";

import "./PlayList.css";

import TrackList from "../tracklist/TrackList";

class PlayList extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    const newName = event.target.value;
    this.props.onNameChange(newName);
  }

  render() {
    return (
      <div className="Playlist">
        <input 
          defaultValue="New Playlist"
          onChange={this.handleNameChange} />
        <TrackList
          isRemoval={true}
          tracks={this.props.playListTracks}
          onRemove={this.props.onRemove} />
        <button
          className="Playlist-save"
          onClick={this.props.onSave} >
            SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}

export default PlayList;
