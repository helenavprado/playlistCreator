import React from "react";
import Track from "../Track/Track";
import "./TrackList.css";

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {console.log(this.props.tracks)}
        {this.props.tracks.map((track) => {
          return (
            <Track
              key={track.id}
              track={track}
              onAdd={this.props.onAdd}
            ></Track>
          );
        })}
      </div>
    );
  }
}

export default TrackList;
