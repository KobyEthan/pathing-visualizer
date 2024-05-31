import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  render() {
    const { row, col, isStart, isEnd, isWall } = this.props;
    const extraClassName = isStart
      ? "node-start"
      : isEnd
      ? "node-end"
      : isWall
      ? "node-wall"
      : "";

    return (
      <div id={`node-${row}-${col}`} className={`node ${extraClassName}`}></div>
    );
  }
}
