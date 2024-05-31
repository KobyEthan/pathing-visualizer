import React, { Component } from "react";
import Node from "./Node/Node";
import "./PathingVisualizer.css";

export default class PathingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    const grid = this.createGrid();
    this.setState({ grid });
  }

  createGrid() {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push({
          row,
          col,
          isStart: row === 10 && col === 5,
          isEnd: row === 10 && col === 45,
          isWall: false,
        });
      }
      grid.push(currentRow);
    }
    return grid;
  }

  render() {
    const { grid } = this.state;
    return (
      <div className="grid-container">
        <div className="grid">
          {grid.flat().map((node, idx) => {
            const { row, col, isStart, isEnd, isWall } = node;
            return (
              <Node
                key={idx}
                row={row}
                col={col}
                isStart={isStart}
                isEnd={isEnd}
                isWall={isWall}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
