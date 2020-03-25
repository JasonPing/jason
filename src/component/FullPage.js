import React from "react";

import ReactPageScroller from "react-page-scroller";

import { Nav } from "./Nav";
import { MainSection } from "./MainSection";
import { HobbySection } from "./HobbySection";
import { ContactSection } from "./ContactSection";

export class FullPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 0 };
  }

  handlePageChange = number => {
    this.setState({ currentPage: number }); // set currentPage number, to reset it from the previous selected.
  };

  render() {
    const titleArray = ["Home", "Hobby", "Contact"];
    return (
      <main>
        <Nav
          titleArray={titleArray}
          currentPage={this.state.currentPage}
          handlePageChange={this.handlePageChange}
        />
        <ReactPageScroller
          pageOnChange={this.handlePageChange}
          customPageNumber={this.state.currentPage}
        >
          <MainSection />
          <HobbySection />
          <ContactSection />
          {/* <PlaygroundSection /> */}
        </ReactPageScroller>
      </main>
    );
  }
}
