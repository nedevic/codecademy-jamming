import React from "react";

import songBoxStyles from "../../css_modules/songbox/songbox.module.css";

import TrackList from "../tracklist/TrackList";

class SearchResults extends React.Component {
  render() {
    return (
      <div className={songBoxStyles.songBox}>
        <h2 className={songBoxStyles.songBoxHeader}>
          Results
        </h2>
        <TrackList
          isRemoval={false}
          tracks={this.props.searchResults}
          onAdd={this.props.onAdd} />
      </div>
    );
  }
}

export default SearchResults;
