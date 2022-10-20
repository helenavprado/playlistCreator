import React from "react";
import SearchBar from "../SearchBar/SearchBar";

import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import "./App.css";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: "gostava tanto de voce",
          artist: "tim maia",
          album: "voce",
          id: 6,
        },
      ],
      playListName: "New Playlist",
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renamePlaylist = this.renamePlaylist.bind(this);
    // this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(userInput) {
    Spotify.search(userInput).then((searchResults) => {
      this.setState({
        searchResults: searchResults,
      });
    });
  }

  addTrack(newTrack) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === newTrack.id)) {
      return;
    }

    tracks.push(newTrack);

    this.setState({
      playlistTracks: tracks,
    });
  }

  removeTrack(removedTrack) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((track) => {
      return track.id !== removedTrack.id;
    });

    this.setState({
      playlistTracks: tracks,
    });
  }

  renamePlaylist(newName) {
    this.setState({
      playListName: newName,
    });
  }

  // savePlaylist() {
  //   const trackURIs = this.state.playlistTracks.map((track) => {
  //     return track.uri;
  //   });
  // }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.searchResults}
            />
            <Playlist
              playListName={this.state.playListName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              renamePlaylist={this.renamePlaylist}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
