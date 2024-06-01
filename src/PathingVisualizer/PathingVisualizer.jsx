import React, { Component } from "react";
import Node from "./Node/Node";
import "./PathingVisualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const END_NODE_ROW = 10;
const END_NODE_COL = 40;

export default class PathingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    const grid = createGrid();
    this.setState({ grid });
  }
  handleMouseDown(row, col) {
    const newGrid = getGridWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getGridWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
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
                mouseIsPressed={mouseIsPressed}
                onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
              ></Node>
            );
          })}
        </div>
      </div>
    );
  }
}
const createGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === END_NODE_ROW && col === END_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getGridWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
