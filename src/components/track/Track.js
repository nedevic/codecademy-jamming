import React from "react";

import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    const addAction = this.props.onAdd;
    addAction && addAction(this.props.track);
  }

  removeTrack() {
    const removeAction = this.props.onRemove;
    removeAction && removeAction(this.props.track);
  }

  renderTrackAction() {
    const buttonSymbol = this.props.isRemoval ? '-' : '+';
    const buttonAction = this.props.isRemoval ? this.removeTrack : this.addTrack;

    return (
      <button className="trackAction" onClick={buttonAction}>
        {buttonSymbol}
      </button>
    );
  }

  render() {
    return (
      <div className="track">
        <div className="trackInformation">
          <h3>{this.props.track.name}</h3>
          <p>{`${this.props.track.artist} | ${this.props.track.album}`}</p>
        </div>
        {this.renderTrackAction()}
      </div>
    );
  }
}

export default Track;
