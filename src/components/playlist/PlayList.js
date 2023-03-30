import React from "react";

import "./PlayList.css";
import songBoxStyles from "../../css_modules/songbox/songbox.module.css";
import positioningStyles from "../../css_modules/positioning/positioning.module.css";

import Button from "../button/Button";
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
      <div className={songBoxStyles.songBox}>
        <input 
          defaultValue="New Playlist"
          className={`${songBoxStyles.songBoxHeader} playListInput`}
          onChange={this.handleNameChange} />
        <TrackList
          isRemoval={true}
          tracks={this.props.playListTracks}
          onRemove={this.props.onRemove} />
        <div className={`${positioningStyles.bottomDisplay} ${positioningStyles.centerContainer}`}>
          <Button onClick={this.props.onSave} >
            SAVE TO SPOTIFY
          </Button>
        </div>
      </div>
    );
  }
}

export default PlayList;
