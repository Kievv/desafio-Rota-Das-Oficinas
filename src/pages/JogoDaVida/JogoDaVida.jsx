import { useState, useEffect } from 'react';
import './JogoDaVida.css';

const JogoDaVida = () => {
  const numRows = 10;
  const numCols = 10;

  const [board, setBoard] = useState(() => {
    const initialBoard = Array(numRows)
      .fill()
      .map(() => Array(numCols).fill(false));
    return initialBoard;
  });

  const [generation, setGeneration] = useState(0);

  const toggleCell = (row, col) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((rowArray, rowIndex) => {
        if (rowIndex === row) {
          return rowArray.map((cell, colIndex) => {
            if (colIndex === col) {
              return !cell;
            }
            return cell;
          });
        }
        return rowArray;
      });
      return newBoard;
    });
  };

  const updateBoard = () => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((rowArray, rowIndex) => {
        return rowArray.map((cell, colIndex) => {
          const numNeighbors = countNeighbors(rowIndex, colIndex);

          if (!cell && numNeighbors === 3) {
            return true;
          } else if (cell && (numNeighbors < 2 || numNeighbors > 3)) {
            return false;
          }
          return cell;
        });
      });

      return newBoard;
    });

    setGeneration((prevGeneration) => prevGeneration + 1);
  };

  const countNeighbors = (row, col) => {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;

        const newRow = row + i;
        const newCol = col + j;

        if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
          if (board[newRow][newCol]) count++;
        }
      }
    }

    return count;
  };

  const handleNextGeneration = () => {
    updateBoard();
  };

  return (
    <div className="jogo-da-vida">
      <div>Generation: {generation}</div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${cell ? 'alive' : ''}`}
              onClick={() => toggleCell(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
      <button onClick={handleNextGeneration}>Next Generation</button>
    </div>
  );
};

export default JogoDaVida;
