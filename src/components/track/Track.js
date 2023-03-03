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

  renderAction() {
    const buttonSymbol = this.props.isRemoval ? '-' : '+';
    const buttonAction = this.props.isRemoval ? this.removeTrack : this.addTrack;

    return (
      <button className="Track-action" onClick={buttonAction}>
        {buttonSymbol}
      </button>
    );
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{`${this.props.track.artist} | ${this.props.track.album}`}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
