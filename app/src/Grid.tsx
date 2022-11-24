/** @jsxImportSource @emotion/react */
import Mark from '@gamepark/ultimate-tic-tac-toe/Mark'
import Cell, {cellSize} from './Cell'
import {css} from '@emotion/react'
import {HTMLAttributes} from 'react'
import {getGridWinner} from '@gamepark/ultimate-tic-tac-toe/UltimateTicTacToeRules'

type Props = {
  grid: (Mark | null)[][]
  onCellClick: (row: number, column: number) => void
} & HTMLAttributes<HTMLDivElement>

export default function Grid({grid, onCellClick, ...props}: Props) {
  const winner = getGridWinner(grid)
  return (
    <div css={gridCss} {...props}>
      {grid.map((row, rowIndex) =>
        row.map((cell, columnIndex) =>
          <Cell key={[rowIndex, columnIndex].join('-')} cell={cell} onClick={() => cell === null && onCellClick(rowIndex, columnIndex)}/>
        )
      )}
      {winner && <span css={winnerMark}>{winner}</span>}
    </div>
  )
}

const gridCss = css`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0.2em;
  background-color: darkgray;
`

const winnerMark = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: ${3 * cellSize}em;
`
