import React from "react";
import VisibilitySensor from "react-visibility-sensor";
import { hobbyJson } from "../data/hobby";

class HobbySpin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  render() {
    let style = { transform: `rotate(${this.props.rotate}deg)` };
    let reverseStyle = {
      transform: `rotate(${-this.props.rotate}deg)`
    };

    let res = hobbyJson.hobby.find(o => o.name === this.props.currentHobby);
    let indicateImg = res.img;

    let extraClass = this.state.visible ? "circle-expand" : "";
    let show = this.state.visible ? "show" : "hide";

    return (
      <div>
        <VisibilitySensor
          onChange={isVisible => {
            this.setState({ visible: isVisible });
          }}
        >
          <div className={`${extraClass} circle`} style={style}>
            <div className="inner-circle top-l" style={reverseStyle}>
              <img src="/asset/game.svg" alt="game" />
            </div>
            <div className="inner-circle top-r" style={reverseStyle}>
              <img src="/asset/music.svg" alt="music" />
            </div>
            <div className="inner-circle bot-l" style={reverseStyle}>
              <img src="/asset/food.svg" alt="food" />
            </div>
            <div className="inner-circle bot-r" style={reverseStyle}>
              <img src="/asset/basketball.svg" alt="basketball" />
            </div>
          </div>
        </VisibilitySensor>
        <img
          src={indicateImg}
          className={`indicate-circle ${show}`}
          alt="indicate"
        />
        <div className={`turn-section ${show}`}>
          <div className="turn" onClick={this.props.clockwiseTurn}>
            <img src="/asset/clockwise.png" alt="clockwise" />
          </div>
          <div className="turn" onClick={this.props.anticlockwiseTurn}>
            <img src="/asset/antiClock.png" alt="anticlockwise" />
          </div>
        </div>
      </div>
    );
  }
}

export { HobbySpin };
