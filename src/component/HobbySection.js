import React from "react";
import { HobbySpin } from "./HobbySpin";

class HobbySection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHobbyIndex: 0,
      hobbyArray: ["basketball", "music", "game", "food"]
    };
    this.clockwiseTurn = this.clockwiseTurn.bind(this);
    this.anticlockwiseTurn = this.anticlockwiseTurn.bind(this);
  }
  clockwiseTurn() {
    let currentIndex = this.state.currentHobbyIndex;
    let nextIndex = currentIndex + 1;
    this.setState({ currentHobbyIndex: nextIndex });
  }

  anticlockwiseTurn() {
    let currentIndex = this.state.currentHobbyIndex;
    let nextIndex = currentIndex - 1;
    this.setState({ currentHobbyIndex: nextIndex });
  }

  render() {
    let index = this.state.currentHobbyIndex;
    let rotate = index * 90 + 45;
    let currentHobby = 0;

    if (index >= 0) {
      currentHobby = this.state.hobbyArray[
        index % this.state.hobbyArray.length
      ];
    } else {
      let temp =
        this.state.hobbyArray.length -
        (Math.abs(index) % this.state.hobbyArray.length);

      if (temp === this.state.hobbyArray.length) {
        currentHobby = this.state.hobbyArray[0];
      } else {
        currentHobby = this.state.hobbyArray[temp];
      }
    }

    let clockwiseTurn = this.clockwiseTurn;
    let anticlockwiseTurn = this.anticlockwiseTurn;
    return (
      <section className="section blue-bg grid">
        <HobbySpin
          currentHobby={currentHobby}
          rotate={rotate}
          clockwiseTurn={clockwiseTurn}
          anticlockwiseTurn={anticlockwiseTurn}
        />
      </section>
    );
  }
}

export { HobbySection };
