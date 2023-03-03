import React from "react";

import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: null
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
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleChange} />
        <button
          className="SearchButton"
          onClick={this.search} >
            SEARCH
        </button>
      </div>
    );
  }
}

export default SearchBar;
