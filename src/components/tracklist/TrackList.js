import React from "react";

import "./TrackList.css";

import Track from "../track/Track";

class TrackList extends React.Component {
  render() {
    return (
      <div className="trackList">
        {
          this.props.tracks.map((track) => (
            <div key={track.id}>
              <Track
                track={track}
                isRemoval={this.props.isRemoval}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove} />
            </div>
          ))
        }
      </div>
    );
  }
}

export default TrackList;
