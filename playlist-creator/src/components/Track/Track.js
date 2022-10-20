import React from "react";
import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.onClickAddTrack = this.onClickAddTrack.bind(this);
    this.onClickRemoveTrack = this.onClickRemoveTrack.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return (
        <button className="Track-action" onClick={this.onClickRemoveTrack}>
          -
        </button>
      );
    } else {
      return (
        <button className="Track-action" onClick={this.onClickAddTrack}>
          +
        </button>
      );
    }
  }

  onClickAddTrack() {
    this.props.onAdd(this.props.track);
  }

  onClickRemoveTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
