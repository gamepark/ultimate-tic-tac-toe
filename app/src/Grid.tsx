/** @jsxImportSource @emotion/react */
import Mark from '@gamepark/ultimate-tic-tac-toe/Mark'
import Cell from './Cell'
import {css} from '@emotion/react'
import {HTMLAttributes} from 'react'

type Props = {
  grid: (Mark | null)[][]
  onCellClick: (rowIndex: number, columnIndex: number) => void
} & HTMLAttributes<HTMLDivElement>

export default function Grid({grid, onCellClick, ...props}: Props) {
  return (
    <div css={gridCss} {...props}>
      {grid.map((row, rowIndex) =>
        row.map((cell, columnIndex) =>
          <Cell key={[rowIndex, columnIndex].join('-')} cell={cell} onClick={() => onCellClick(rowIndex, columnIndex)}/>
        )
      )}
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