import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: "dont show up",
          artist: "dua lipa",
          album: "dont start now",
          id: 1,
        },
        {
          name: "detalhes",
          artist: "roberto carlos",
          album: "o rei",
          id: 2,
        },
        {
          name: "sal",
          artist: "marisa monte",
          album: "portas",
          id: 3,
        },
      ],

      playListName: "The Ultimate Playlist",
      playlistTracks: [
        {
          name: "ovelha negra",
          artist: "rita lee",
          album: "amor e sexo",
          id: 4,
        },
        {
          name: "descobridor dos 7 mares",
          artist: "lulu santos",
          album: "areia",
          id: 5,
        },
        {
          name: "gostava tanto de voce",
          artist: "tim maia",
          album: "voce",
          id: 6,
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
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

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.searchResults}
            />
            <Playlist
              playListName={this.state.playListName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
