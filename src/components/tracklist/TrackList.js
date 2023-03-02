import React from "react";

import "./TrackList.css";

import Track from '../track/Track';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {/* <!-- You will add a map method that renders a set of Track components  --> */}
        <Track name="Auberge" artist="Chris Rea" album="Auberge" isRemoval={this.props.isRemoval} />
        <Track name="Heaven" artist="Chris Rea" album="Auberge" isRemoval={this.props.isRemoval} />
        <Track name="Looking for the Summer" artist="Chris Rea" album="Auberge" isRemoval={this.props.isRemoval} />
      </div>
    );
  }
}

export default TrackList;
