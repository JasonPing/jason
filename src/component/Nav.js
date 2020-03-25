import React, { useState, useEffect } from "react";

const getPagesNav = (titleArray, handlePageChange) => {
  const pagesNav = [];

  titleArray.forEach((title, index) => {
    pagesNav.push(
      <li key={title} onClick={() => handlePageChange(index)}>
        {title}
      </li>
    );
  });

  return [...pagesNav];
};

const Nav = props => {
  const [boxWidth, setBoxWidth] = useState(0);
  const [boxLeft, setBoxLeft] = useState(0);

  useEffect(() => {
    const width = document.querySelectorAll("nav li")[props.currentPage]
      .clientWidth;
    setBoxWidth(width);
    const currentPage = props.currentPage;
    let containerLeft = document.querySelector("nav ul").getBoundingClientRect()
      .left;
    let left = document
      .querySelectorAll("nav li")
      [currentPage].getBoundingClientRect().left;
    let relativeLeft = left - containerLeft;
    setBoxLeft(relativeLeft);
  });

  const pagesNav = getPagesNav(props.titleArray, props.handlePageChange);
  return (
    <nav>
      <ul>
        {pagesNav}
        <li
          style={{ width: `${boxWidth}px`, left: `${boxLeft}px` }}
          className="highlightBox"
        ></li>
      </ul>
    </nav>
  );
};

export { Nav };

// export default class Nav extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { boxHeight: 0, boxTop: 0 };
//   }

//   componentDidMount() {
//     const height = document.querySelector("nav li").clientHeight;
//     this.setState({ boxHeight: height });
//     const currentPage = this.props.currentPage;
//     console.log(currentPage);
//   }

//   componentDidUpdate() {
//     const currentPage = this.props.currentPage;
//     console.log(currentPage);
//   }

//   getPagesNav = titleArray => {
//     const pagesNav = [];

//     this.props.titleArray.forEach((title, index) => {
//       pagesNav.push(
//         <li key={title} onClick={() => this.props.handlePageChange(index)}>
//           {title}
//         </li>
//       );
//     });

//     return [...pagesNav];
//   };
//   render() {
//     const pagesNav = this.getPagesNav(this.props.titleArray);
//     return (
//       <nav>
//         <ul>
//           {pagesNav}
//           <li
//             style={{ height: this.state.boxHeight }}
//             className="highlightBox"
//           ></li>
//         </ul>
//       </nav>
//     );
//   }
// }
