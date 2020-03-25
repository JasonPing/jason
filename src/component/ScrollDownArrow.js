import React from "react";

class ScrollDownArrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidden: "hidden" };
  }
  componentDidMount() {
    let _this = this;
    setTimeout(function() {
      _this.setState({ hidden: "" });
    }, 2500);
  }
  render() {
    let hidden = this.state.hidden;
    return (
      <img
        className={`scroll-down ${hidden}`}
        src="/asset/scrolling.svg"
        alt="scrollDown"
      />
    );
  }
}

export { ScrollDownArrow };
