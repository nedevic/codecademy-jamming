import React from "react";

import "./App.css";

import PlayList from "../playlist/PlayList";
import SearchBar from "../searchbar/SearchBar";
import SearchResults from "../searchresults/SearchResults";

function App() {
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults />
          <PlayList />
        </div>
      </div>
    </div>
  );
}

export default App;
