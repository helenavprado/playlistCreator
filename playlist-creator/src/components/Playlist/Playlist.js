import React from "react";
import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

class Playlist extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <input
          onChange={(e) => this.props.renamePlaylist(e.target.value)}
          defaultValue={"New Playlist"}
        />
        <TrackList
          onRemove={this.props.onRemove}
          tracks={this.props.playlistTracks}
          isRemoval={true}
        ></TrackList>
        <button onClick={this.props.onSave} className="Playlist-save">
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}

export default Playlist;
