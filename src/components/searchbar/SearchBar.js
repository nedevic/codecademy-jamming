import React from "react";

import "./SearchBar.css";
import positioningStyles from "../../css_modules/positioning/positioning.module.css";

import Button from "../button/Button";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(event) {
    const term = event.target.value;
    this.setState({ term });
  }

  search() {
    const term = this.state.term;
    term && this.props.onSearch(term);
  }

  render() {
    return (
      <div className="searchBar">
        <div className={positioningStyles.centerContainer}>
          <input
            placeholder="Enter A Song, Album, or Artist"
            onChange={this.handleChange} />
        </div>
        <Button onClick={this.search} >
          SEARCH
        </Button>
      </div>
    );
  }
}

export default SearchBar;
