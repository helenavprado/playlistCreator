import React from "react";
import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.onClickAddTrack = this.onClickAddTrack.bind(this);
  }

  renderAction() {
    let isRemoval = "";
    if (isRemoval) {
      return <button className="Track-action">-</button>;
    } else {
      return (
        <button className="Track-action" onClick={this.onClickAddTrack}>
          +
        </button>
      );
    }
  }

  onClickAddTrack() {
    console.log(this.props.track);
    this.props.onAdd(this.props.track);
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
